//const SERVER='https://apiesamweb.esamcca.com/graphql';
const SERVER = 'https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function () {
    app = new Vue({
        el: '#app',
        data: {
        
            idproducto: -1,
            productoseleccionado: {},
            categoriaseleccionada:{},
            categorias: [],
            cantidad: 0,
            detalle: [],
            cats: {},
            categoriasById: {},
        },
        methods: {

            getproductos: function (id) {
                console.log("edithqqq", id)
                var sql = `query{
						producto(id:`+ id + `){id nombre descripcion imagenUrl categoria{
                            id
                            nombre
                          } }
						
					  }`;
                console.log("ee", sql)
                axios.post(SERVER, {
                    query: sql
                }).then((res) => {
                    lista = res.data.data.producto;
                    console.log("hola edith", lista);
                    this.productoseleccionado = lista;
                    window.localStorage.setItem('productoseleccionado', JSON.stringify(lista));




                }).catch((error) => {
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
          
            

            getcategorias: function () {
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

            getcotizacion: function (id, cantidad,nombre) {
                console.log("diegoooo", id, cantidad)
                agregar(id,cantidad,nombre);
            }

        },


        mounted() {



            this.idproducto = localStorage.getItem('idproducto');
            console.log("erer", this.idproducto);
            this.getproductos(this.idproducto);

            
            this.categoriaseleccionada=JSON.parse(localStorage.getItem('categoriaseleccionada')),
            console.log("Mandar id de categoria",this.categoriaseleccionada)

            this.getcategorias();
            /*this.getsubcategorias();*/
            /*$('.gallery a').simpleLightbox({});*/
        }
    });
});

