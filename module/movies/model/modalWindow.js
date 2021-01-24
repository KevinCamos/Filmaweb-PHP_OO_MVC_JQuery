$(document).ready(function () {
    readMovie();
    deleterMovie();

})


function OpenMovie() {
    $(".movieRead").click(function () {
        var id = this.getAttribute('id');
        // console.log(id);//Debugeo para comprobar que entra a la función

        $.ajax({
            url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + id,
            dataType: "JSON",
            //  type : tipo de la petición, GET o POST (GET por defecto).
            //  url : dirección a la que se envía la petición.
            //  data : datos a enviar al servidor.
            //  dataType : tipo de datos que esperas obtener del servidor (si no se especifica, jQuery intenta averiguar de qué tipo se trata).
            //  success : función que se ejecuta cuando se obtiene una respuesta con éxito.
            //  error : función que se llama si la petición no tiene éxito.

        }).done(function (movie) {
            // console.log(movie.movie);
            var chair = "";
            for (var clave in movie) {
                if (movie.hasOwnProperty(clave)) {
                    chair += "<b class=readWindow>" + clave + ": </b>" + movie[clave] + "<br>";//Guarda una cadena de cada clau i text, més un salt de línea
                }
            }
            $("#list_modal").html(chair);
            $("#list_modal").show();
            $("#list_modal").dialog({
                width: 600, //<!-- ------------- ancho de la ventana -->
                height: 400, //<!--  ------------- altura de la ventana -->
                // show: 22, //<!-- ----------- animación de la ventana al aparecer -->
                hide: 22, //<!-- ----------- animación al cerrar la ventana -->
                resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
                // position: "center",//<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
                modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
                buttons: {
                    "De Acuerdo": function () {
                        $(this).dialog("close");
                    }
                },
                show: {
                    effect: "drop",
                    duration: 1000
                },
                hide: {
                    effect: "puff",
                    duration: 1300
                }
            });
        })
    });


}


function deleterMovie() {
    $(".movieDelete").click(function () {
        var id = this.getAttribute('id');

        $.ajax({
            url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + id,
            dataType: "JSON",


        }).done(function (movie) {
            var chair = "Seguro que desea eliminar la siguiente película? <br>";
            for (var clave in movie) {
                if (movie.hasOwnProperty(clave) && (clave === "reference" || clave === "movie" || clave === "director" || clave === "anyo")) {

                    chair += "<b class=readWindow>" + clave + ": </b>" + movie[clave] + "<br>";//Guarda una cadena de cada clau i text, més un salt de línea
                }
            }
            $("#list_modal").html(chair);
            $("#list_modal").show();
            $("#list_modal").dialog({
                width: 600, //<!-- ------------- ancho de la ventana -->
                height: 400, //<!--  ------------- altura de la ventana -->
                // show: 22, //<!-- ----------- animación de la ventana al aparecer -->
                hide: 22, //<!-- ----------- animación al cerrar la ventana -->
                resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
                // position: "center",//<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
                modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
                // buttons: {
                //     "De Acuerdo": function () {
                //         $(this).dialog("close");

                //     }
                buttons: {
                    Cancel: function () {
                        $(this).dialog("close");
                    },
                    Delete: function () {
                        $(this).dialog("close");
                        // window.location.href = 'module/movies/controller/controller_movies.php?op=delete_modal&modal=' + id;
                        $.ajax({
                            url:'module/movies/controller/controller_movies.php?op=delete_modal&modal=' + id
                            
                            
                        }).done(function () {
                            location.reload();
                        })

                    }

                },
                show: {
                    effect: "drop",
                    duration: 1000
                },
                hide: {
                    effect: "clip",
                    duration: 1300
                }
            });
        })

      
    });
//     setInterval( function(){
//         // $path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte\module\movies\\view\list_movies.php';

//         $('#feedback-bg-info').load('module\movies\\view\list_movies.php');

// });

}