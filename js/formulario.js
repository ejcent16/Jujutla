//console.log("funsionando yes");

$("#formulario").submit(function(event){
    event.preventDefault(); //almacena los datos sin refrascar el sitio
    enviar();
});

function enviar(){
    //console.log("ejecutando");
    var datos = $("#formulario").serialize();
    //console.log(datos);
    $.ajax({
        type: "post",
        url: "formulario.php",
        data: datos,
        success: function(texto){
            if(texto=="exito"){
                correcto();
            }else{
                phperror();
            }
        }
    })
}

//Mostar mensaje alert si el msj se envio
function correcto(){
    $("#mensajeExito").removeClass("d-none");
 
}

//sino mostrar error

function phperror(){
    $("#mensajeError").removeClass("d-none");

}