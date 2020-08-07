//const SERVER='https://apiesamweb.esamcca.com/graphql';
const SERVER = 'https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function () {
    app = new Vue({
        el: '#app',
        data: {
        
            carrito:[],
            sedes:[],
            sede:{},
            nombrec:"",
            celular:"",
            correo:"",
            categoriaseleccionada:{},
            categoriasById: {},
            categorias: [],

            
        },
        methods: {
            


            getcotizacion: function(){
                var productos=[];
                this.carrito.forEach(element => {
                    productos.push({producto: parseInt(element.idproducto), cantidad: parseInt(element.cantidad)})
                    
                });
                var input= {sede: parseInt(this.sede.id), nombre: this.nombrec, telefono: this.celular, correo: this.correo, detalle: productos}
               var sql= `mutation{
                createCotizacion(input:${stringifyObject(input)}){
                  cotizacion{
                    id 
                    sede{nombre}
                    telefono 
                    correo 
                    fecha 
                    precioTotal 
                    idcliente 
                    detalle{
                      id 
                      producto{
                        id 
                        nombre
                        categoria{
                          nombre
                        }
                      }
                    }
                  }
                }
            }`
            console.log("jeje",sql)
                axios.post(SERVER,{
                    query: sql
                      
                }).then((res)=>{
                    lista = res.data.data;
                    
                    console.log(lista);
                
                }).catch((error)=>{
                    console.error(error);
                })
    
            },
            

            getsedes: function(){
                axios.post(SERVER,{
                    query: `query{
                        sedes{
                          id
                          nombre
                        } 					 						
                        
                      }`
                }).then((res)=>{
                    lista = res.data.data.sedes;
                    
                    this.sedes = lista;
                
                }).catch((error)=>{
                    console.error(error);
                })

            },
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
                    
                    this.categoriasById = lista;
    
                    
                
                }).catch((error)=>{
                    console.error(error);
                })
    
            },
            getcat: function(id){
                window.localStorage.setItem('idcat',id );
    
            },
          
            
    
            getcategoriasx: function () {
                axios.post(SERVER, {
                    query: `query{
                        categorias{
                          id
                          nombre
                          subcategorias{
                            nombre
                            articuloss{
                              nombre
                            }
                          }							 						
                        }
                      }`
                }).then((res) => {
                    lista = res.data.data.categorias;
    
                    this.categorias = lista;
    
                }).catch((error) => {
                    console.error(error);
                })
    
            },

        },
       



       

        mounted() {

          this.categoriaseleccionada=JSON.parse(localStorage.getItem('categoriaseleccionada'));
            

         this.getcategoriasx();
            
            console.log("hiii");
            this.carrito= getcarritox();
            console.log(this.carrito);
            this.getsedes();
            
        }
    });
});
