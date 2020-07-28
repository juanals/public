//const SERVER='https://apiesamweb.esamcca.com/graphql';
const SERVER='https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function() {
	 app=new Vue({
	    	el:'#app',
	    	data:{
	    		idcat: -1,
				
	    		
	    		
				categorias:[],
				categoriaseleccionada:{},
				categoriasById:{},
				productoById:{},
				productoseleccionado:{},
				subcategorias:[],
				nombrecategoria:'',
				c: 1,
			
	    		
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
							  imagenUrl
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
				getsubcategoriasindex: function(id){
				
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
					
						this.categoriasById = lista;

						
	    			
					}).catch((error)=>{
						console.error(error);
					})

				},
				
				getproductos: function(id){
					window.localStorage.setItem('idproducto',id );

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
	    		
				this.idcat = localStorage.getItem('idcat');
           
				this.getsubcategoriasindex(this.idcat);
				this.getcategorias();
				
				this.productoseleccionado=JSON.parse(localStorage.getItem('productoseleccionado')),

				console.log("erer",this.productoseleccionado)
				/*this.getsubcategorias();*/
				/*$('.gallery a').simpleLightbox({});*/
				
	    	}
	    });
	  });
  
