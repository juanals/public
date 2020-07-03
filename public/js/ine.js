const SERVER='https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function() {
	 app=new Vue({
	    	el:'#app',
	    	data:{
	    		
				categorias:[],
				nombrecategoria:'',
	    		
	    	},
	    	methods:{
	    		
				getcategorias: function(){
					axios.post(SERVER,{
						query: `query{
							categorias{
							  id
							  nombre
							  subcategorias{
							   nombre 
							  }
							
							}
						  }`
					}).then((res)=>{
						lista = res.data.data.categorias;
						this.categorias = lista;
	    				
					}).catch((error)=>{
						console.error(error);
					})

				},
	    		getultimosprogramas: function(){
	    			//global.commit('cargar',true);
	    			axios.post(SERVER,{
	    				query: `query{programas(latest:true,por_fecha:true){id,version,grupo,fecha_inicio,arte,portada,
	    						postgrado{nombre,categoria{nombre}},sede{nombre},universidad{nombre}}}`
	    			}).then((res)=>{
	    				lista = res.data.data.programas;
	    				lista.pop();
	    				this.programas = lista;
	    				repararImg();
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(function () {
	    				//global.commit('cargar',false);
	    			});
	    		},
	    		getprogramasmenu:function(){
	    			axios.post(SERVER, {
	    				query:`query{
								  programas(por_fecha:false,idsede:`+this.sedes[this.s].id+`){
								    id,postgrado{nombre,categoria{nombre}},version,grupo}
								}`
	    			}).then((res)=> {
	    				datos=res.data.data.programas;
	    				this.programas_menu=datos;
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(()=> {
	    				//global.commit('cargar',false);
	    				this.activo=true;
	    			});
				},
				getproductosmenu:function(){
	    			axios.post(SERVER, {
	    				query:`query{
							categoriaById(id:1){
							  subcategorias{
								id
								nombre
								articuloss{
								  id
								  nombre
								  imagenUrl
								}
							  }
							}
						  }`
	    			}).then((res)=> {
						datos=res.data.data.productos;
						datos.pop();
	    				this.productos=datos;
	    			}).catch((error)=>{
	    				//n_error(error);
	    			});
	    		},
	    		
	    	
	    		cargar:function(){
	    			axios.post(SERVER, {
	    				query:`query{
								  programas(latest:`+this.nuevos+`,por_fecha:false,idsede:`+this.sedes[this.s].id+`,categoria:`+this.idcategoria+`,area:`+this.idarea+`){
								    id,postgrado{nombre,categoria{nombre}},version,grupo,fecha_inicio,arte,portada,sede{nombre}
								  }
								}`
	    			}).then((res)=> {
	    				datos=res.data.data.programas;
	    				this.programas_sede=datos;
	    				repararImg();
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(()=> {
	    				//global.commit('cargar',false);
	    				this.activo=true;
	    			});
	    		},
	    		cambiarcategoria:function(id){
	    			this.idcategoria=id;
	    			this.cargar();
	    		},
	    		cambiararea:function(id){
	    			this.idarea=id;
	    			this.cargar();
	    		},
	    		cambiarsede:function(idx){
	    			this.s=idx;
	    			this.cargar();
	    			this.initMaps();
	    		},
	    		
	    		repararImg:function(event){
	    			event.target.src ='webdata/portadas/postgrado_default.png';
	    		},
	    		splitnombre:function(name){
	    			array=name.splitnombre(' ');
	    			array.shift();
	    			return array.join(' ');
	    		}
	    	},
	    	mounted(){
	    		
	    		this.getsedes();
	    		this.getultimosprogramas();
	    		this.getareas();
				this.getcategorias();
				this.getproductosmenu();
	    		/*$('.gallery a').simpleLightbox({});*/
	    	}
	    });
	  });
  
