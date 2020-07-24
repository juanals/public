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
						{foto:'e12.jpg',descripcion:'Maestría en Ingeniería Vial'}],
				currentSlide: 0,
				isPreviousSlide: false,
				isFirstLoad: true,
				slides: [
				  {
					headlineFirstLine: "MISIÓN",
					headlineSecondLine: "Satisfacer las necesidades de nuestros clientes con calidad responsabilidad, competitividad, disponibilidad y soporte a futuro en todos nuestros servicios",
					sublineFirstLine: "Nihil sub sole",
					sublineSecondLine: "novum",
					bgImg: "img/camaras/cam2.jpg",
					rectImg: "img/mision.jpeg"
				  },
				  {
					headlineFirstLine: "VISIÓN",
					headlineSecondLine: "Ser una entidad reconocida por la calidad de sus productos y servicios, a través de una red de operaciones a nivel nacional, impulsando el bienestar y innovación tecnológica en el país.",
					sublineFirstLine: "Il n'y a rien de neuf sous",
					sublineSecondLine: "le soleil",
					bgImg: "img/camaras/cam3.jpg",
					rectImg: "img/cerco.jpg"
				  },
				  {
					headlineFirstLine: "VALORES",
					headlineSecondLine: "-Dedicación al cliente -Innovación -Calidad -Respeto",
					headlineTLine: "-Colaboración -Cooperación -Liderazgo -Responsabilidad ",
					headlineFLine: "-Excelencia -Ética -Creatividad -Identidad ",
					sublineFirstLine: "Τίποτα καινούργιο κάτω από",
					sublineSecondLine: "τον ήλιο",
					bgImg: "img/valores.jpg",
					rectImg: "https://i.postimg.cc/3JFLGMRF/slide-rect2.jpg"
				  }
				],
				sedes: [
					{ id: 1, nombre: "Tarija", direccion: 'Calle Suipacha #667 entre Ingavi y La Madrid.', correo: 'cybercorp.tarija100719@gmail.com', tel: "67370323" },
					{ id: 2, nombre: "Sucre", direccion: 'Calle San Alberto #66 zona central', correo: 'cybercorpcentral@gmail.com', tel: "72853579" },
					{ id: 3, nombre: "Potosi", direccion: 'Calle Bolívar esquina lidiustares #1246', correo: 'cybercorpotosi321@gmail.com', tel: "67370321" },
				  ],
				  sede: {},
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
				updateSlide(index) {
					index < this.currentSlide ? this.isPreviousSlide = true : this.isPreviousSlide = false;
					this.currentSlide = index;
					this.isFirstLoad = false;
				  },
				  sel: function (id) {
					this.sedes.forEach(function (e) { e.class = ''; });
					this.sede = this.sedes.find(x => x.id == id);
					this.sede.class = 'active';
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
				var productRotatorSlide = document.getElementById("cyber");
				var startX = 0;
				var endX = 0;
		
				productRotatorSlide.addEventListener("touchstart", (event) => startX = event.touches[0].pageX);
		
				productRotatorSlide.addEventListener("touchmove", (event) => endX = event.touches[0].pageX);
		
				productRotatorSlide.addEventListener("touchend", function (event) {
				  var threshold = startX - endX;
		
				  if (threshold < 150 && 0 < this.currentSlide) {
					this.currentSlide--;
				  }
				  if (threshold > -150 && this.currentSlide < this.slides.length - 1) {
					this.currentSlide++;
				  }
				}.bind(this));
				this.sede = this.sedes[0];
				this.sede.class = 'active';
	    	}
	    });
	  });
  
