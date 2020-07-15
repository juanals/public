//const SERVER='https://apiesamweb.esamcca.com/graphql';
const SERVER='https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function() {
	 app=new Vue({
	    	el:'#app',
	    	data:{
	    		sedes:[{nombre:'',direccion:'',telefono_fijo:'',telefono1:'',telefono2:''}],
	    		s:0,
	    		programas:[],
	    		programas_menu:[],
	    		programas_sede:[],
	    		areas:[],
				categorias:[],
				categoriaseleccionada:{},
				categoriasById:{},
				productoById:{},
				productoseleccionado:{},
				subcategorias:[],
				nombrecategoria:'',
				c: 1,
				estilo1:'position: absolute; left: 0px; top: 0px;',
				estilo2:'position: absolute; left: 177px; top: 0px;',
				estilo3:'style="position: absolute; left: 355px; top: 0px;',
				estilo4:'style="position: absolute; left: 532px; top: 0px;',
				estilo5:'style="position: absolute; left: 710px; top: 0px;',
	    		idarea:1,
	    		nuevos:true,
	    		galeria:[{foto:'e1.jpg',descripcion:'Diplomado en emergencias médicas'},
	    				{foto:'e2.jpg',descripcion:'Maestría en recursos humanos'},
	    				{foto:'e4.jpg',descripcion:'Diplomado en ciencias forenses'},
	    				{foto:'e5.jpg',descripcion:''},
	    				{foto:'e6.jpg',descripcion:''},
	    				{foto:'e7.jpg',descripcion:''},
	    				{foto:'e9.jpg',descripcion:'Maestria en instrumentación Quirúrgica'},
	    				{foto:'e10.jpg',descripcion:'Maestría en Derecho Notarial'},
	    				{foto:'e11.jpg',descripcion:'Maestría en Derecho Procesal Penal'},
	    				{foto:'e12.jpg',descripcion:'Maestría en Ingeniería Vial'}]
	    	},
	    	methods:{
	    		getsedes: function(){
	    			//global.commit('cargar',true);
	    			axios.post(SERVER,{
	    				query: `query{sedes(estado:true){id,nombre,direccion,telefono_fijo,telefono1,telefono2,latitud,longitud}}`
	    			}).then((res)=>{
	    				lista = res.data.data.sedes;
	    				this.sedes = lista;
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(()=> {
	    	    		this.getprogramasmenu();
	    	    		this.initMaps();
	    			});
				},
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
				/**/
				getsubcategorias: function(id){
					console.log("edithqqq",id)
					var sql= `query{
						categoriaById(id:`+id+`){
						  id
						  nombre
						  subcategorias{
							id 
							nombre
							articuloss {id nombre imagenUrl}
						  }
						  
						}
						
					  }`;
					  console.log("ee",sql)
					axios.post(SERVER,{
						query: sql
					}).then((res)=>{
						lista = res.data.data.categoriaById;
						console.log("hola edith",lista);
						this.categoriaseleccionada=lista;
						this.productoseleccionado=lista;
						this.categoriasById = lista;

						
	    			
					}).catch((error)=>{
						console.error(error);
					})

				},
				getproductos: function(id){
					window.localStorage.setItem('idproducto',id );

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
	    				this.programas_menu=datos;
	    			}).catch((error)=>{
	    				//n_error(error);
	    			});
	    		},
	    		getareas: function(){
	    			//global.commit('cargar',true);
	    			axios.post(SERVER,{
	    				query: `query{areas{id,nombre}}`
	    			}).then((res)=>{
	    				todos={id:0,nombre:"Todos"};
	    				lista = res.data.data.areas;
	    				lista.unshift(todos);
	    				this.areas = lista;
	    				this.idarea=lista[0].id;
	    				this.cargar();
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(function () {
	    				//global.commit('cargar',false);
	    			});
	    		},
	    		/*getcategorias: function(){
	    			//global.commit('cargar',true);
	    			axios.post(SERVER,{
	    				query: `query{categorias{id,nombre}}`
	    			})/*.then((res)=>{
	    				todos={id:0,nombre:"Todos"};
						lista = res.data.data.categorias;
						this.categorias = lista;
						console.log();
	    				lista.unshift(todos);
	    				this.categorias = lista;
	    				this.idcategoria=lista[0].id;
	    			}).catch((error)=>{
	    				//n_error(error);
	    			}).finally(()=> {
	    				//this.getareas();
	    				//global.commit('cargar',false);
					})
					.then((res) => {
						console.log('--------------------- RESPUESTA DEL SERVIDOR --------------------------')
						lista = res.data.data.categorias;
						this.categorias=lista;
						console.log(lista)
						console.log( stringifyObject(lista) )
					  })
					  .catch((error) => {
						console.error(error)
					  });
	    		},*/
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
	    		initMaps:function(){
	    				map=new google.maps.Map(document.getElementById('map'), {
	        		        center: {lat: this.sedes[this.s].latitud, lng: this.sedes[this.s].longitud},
	        		        zoom: 16
		        		});
		    		    var marker = new google.maps.Marker({
		    		          position: {lat: this.sedes[this.s].latitud, lng: this.sedes[this.s].longitud},
		    		          map: map,
		    		          title: 'ESAM'
		    		    });
	    		},
	    		format:function(date){
	    			return moment(parseInt(date)).format('DD/MM/YYYY');
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
	    		
	    	
				this.getcategorias();
				this.productoseleccionado=JSON.parse(localStorage.getItem('productoseleccionado')),
				console.log("erer",this.productoseleccionado)
				/*this.getsubcategorias();*/
	    		/*$('.gallery a').simpleLightbox({});*/
	    	}
	    });
	  });
  