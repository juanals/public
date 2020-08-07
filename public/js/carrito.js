function agregar(idproducto,cantidad,nombre){
    console.log("holaaaa");
    var carrito=localStorage.getItem("carrito"); // se guarda cualquier objeto en session storage en el navegador
    //carrito = [produto1, producto2,producto3]
    // producto1={idproducto,cantidad}
    if(carrito == null) carrito=[];
    else carrito=JSON.parse(carrito);

    console.log("jaajja",carrito);
   
   for(var i = carrito.length - 1; i >= 0; i--) {
    if(carrito[i].idproducto === idproducto) {
        carrito.splice(i, 1); //Eliminar
    }
}

   carrito.push({idproducto:idproducto,cantidad:cantidad,nombre:nombre})  //para agregar un prodcuto a carrito
   localStorage.setItem("carrito",JSON.stringify(carrito))
   listar();

}

function eliminar(idproducto){
    var carrito=localStorage.getItem("carrito");
    //carrito = [produto1, producto2,producto3]
    // producto1={idproducto,cantidad}
   if(carrito == null) carrito=[];
   carrito=JSON.parse(carrito);

  // carrito.push({idproducto:idproducto})

}

function listar(){
    var carrito=localStorage.getItem("carrito");
    //carrito = [produto1, producto2,producto3]
    // producto1={idproducto,cantidad}
   if(carrito == null) carrito=[];
   carrito=JSON.parse(carrito);
   carrito.forEach(element => {
       console.log(element)
       
   });
}
function getcarritox(){
    var carrito=localStorage.getItem("carrito");
    var carrito2=[];
    console.log("jujuj",carrito);
    //carrito = [produto1, producto2,producto3]
    // producto1={idproducto,cantidad}
    if(carrito == null) carrito=[];
    else carrito=JSON.parse(carrito);

    //carrito=JSON.parse(carrito);
    carrito.forEach(element => {
        carrito2.push(element)
        console.log(element)
        
    });
   return carrito2;
   

}