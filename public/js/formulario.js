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


        },


       

        mounted() {

            
            console.log("hiii");
            this.carrito= getcarritox();
            console.log(this.carrito);
            this.getsedes();

            
        }
    });
});
