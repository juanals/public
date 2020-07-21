//const SERVER='https://apiesamweb.esamcca.com/graphql';
const SERVER = 'https://cors-anywhere.herokuapp.com/http://cybercorp.herokuapp.com/graphql/';
document.addEventListener('DOMContentLoaded', function () {
    app = new Vue({
        el: '#app',
        data: {
            idproducto: -1,
            productoseleccionado:{},
            categorias:[],
        },
        methods: {

            getproductos: function (id) {
                console.log("edithqqq", id)
                var sql = `query{
						producto(id:`+ id + `){id nombre descripcion imagenUrl categoria{
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




        },
        getcotizacion: function(){
            axios.post(SERVER,{
                query: `mutation{
                    createCotizacion(input:{
                      sede
                      nombre
                      telefono
                      correo
                       detalle:[
                        {
                          producto:1
                          cantidad:1
                        }
                      ]
                    }){
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
                  
            }).then((res)=>{
                lista = res.data.data.categorias;
                
                this.categorias = lista;
            
            }).catch((error)=>{
                console.error(error);
            })

        },
        mounted() {

            
            
            this.idproducto = localStorage.getItem('idproducto');
                console.log("erer", this.idproducto);
                this.getproductos(this.idproducto);
                this.getcategorias();
            /*this.getsubcategorias();*/
            /*$('.gallery a').simpleLightbox({});*/
        }
    });
});
