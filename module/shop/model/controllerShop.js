importarScript("assets/api_kay.js");
importarScript("module/shop/model/geolocalizacion.js");
importarScript("module/shop/model/filter.js");
importarScript("assets/maps.js");
// function importarScript(nombre) {
//   var scriptImport = document.createElement("script");
//   scriptImport.src = nombre;
//   document.querySelector("head").appendChild(scriptImport);
// }

// function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: sUrl,
//       type: sType,
//       dataType: sTData,
//       data: sData,
//     })
//       .done((data) => {
//         resolve(data);
//       })
//       .fail((jqXHR, textStatus, errorThrow) => {
//         reject(errorThrow);
//       });
//   });
// }

/////FUNCIONES PARA CARGAR LOCALSTORAGE DE LOS FORMATOS
function clickerItems(itemString, id) {
  if (
    sessionStorage.getItem(itemString) == null ||
    sessionStorage.getItem(itemString) == "null"
  ) {
    sessionStorage.setItem(itemString, id);
  } else {
    sessionStorage.removeItem(itemString);
  }
  console.log(sessionStorage.getItem(itemString));
}
function storageFormats() {
  $("#VHS").click(function () {
    clickerItems("VHS", this.getAttribute("id"));
  });
  $("#DVD").click(function () {
    clickerItems("DVD", this.getAttribute("id"));
  });
  $("#Blu-Ray").click(function () {
    clickerItems("Blu-Ray", this.getAttribute("id"));
  });
  $("#4K").click(function () {
    clickerItems("4K", this.getAttribute("id"));
  });
  $("#Digital").click(function () {
    clickerItems("Digital", this.getAttribute("id"));
  });
  $("#Otro").click(function () {
    clickerItems("Otro", this.getAttribute("id"));
  });
}
///// FIN DE LAS FUNCIONES PARA CARGAR LOCALSTORAGE DE LOS FORMATOS

//---------------DIVS DE TOTS ELS PRODUCTES O D'UN PRODUCTE-------------//
//CARREGA ELS DIVS GENÈRICS, ES CARGA EN LA FUNCIÓ "loadHomeProducts"
function loadDivsProducts() {
  let section = $("<section></section>")
    .attr({ id: "port-sec" })
    .appendTo("#listShop");
  let divContainer = $("<div></div>")
    .attr({ class: "container" })
    .appendTo(section);
  return $("<ul></ul>")
    .attr({ class: "portfolio-items col-3" })
    .appendTo(divContainer);
}
//ELS DIVS GENÈRICS DELS PRODUCTES
function divsProduct(urls, id) {
  ajaxPromise(urls + id, "GET", "JSON")
    .then(function (category) {
      //// .hide PER A OCULTAR EL FORMULARI QUE REOBRIREM AL EIXIR
      $("#formularioFiltro").hide();
      $("#listShop").empty(); //Borrar lo de dins
      let count = 0;
      for (var clave in category) {
        // console.log(clave);
        let id = "" + category["id"];
        let name = category["name"];
        let img = "" + category["img"];

        var table = $("<p></p>")
          .attr({ id: "p" + id })
          .appendTo("#listShop");

        if (clave == "img") {
          $("<img>")
            .attr({
              id: "listShopIMG" + id,
              class: name,
              src: "module\\movies\\img\\" + img,
              align: "left",
              style: "margin-top: -275px;       margin-left: 25px;",
            })
            .appendTo(table);
        } else if (count == 0) {
          $("<ul>")
            .attr({
              id: "item-shop",
              style: "margin-top:20px;",
            })
            .appendTo(table);
          $("<li></li>")
            .attr({
              id: "attribute-item",
              style: "margin-left: 500px;",
            })
            .append(document.createTextNode(clave + ": " + category[clave]))
            .appendTo("#item-shop");
        } else {
          $("<li></li>")
            .attr({
              id: "attribute-item",
            })
            .append(document.createTextNode(clave + ": " + category[clave]))
            .appendTo("#item-shop");
        }
      }
      $("<img>")
        .attr({
          id: "return",
          class: name,
          src: "module\\shop\\img\\return.png",
          align: "left",
          style:
            "margin-left: 25px; margin-top: -330px; width: 50px; height: 50px;",
        })
        .appendTo(table);

      // PRUEBA

      // $("<div>").attr({id:"map"}).appendTo(table);
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
//-------FIN-----DIVS DE TOTS ELS PRODUCTES O D'UN PRODUCTE-------------//

//---------------CARGA ELS PRODUCTES O UN PRODUCTE-------------//

//CARREGA TOTS ELS PRODUCTES
function loadHomeProducts() {
  let homeID = sessionStorage.getItem("id");
  // console.log(sessionStorage.getItem("id"))
  ///typeof(nomDeLaVariableOFUNCIÓ)
  if (homeID == "null" || homeID == null) {
    // console.log(sessionStorage.getItem("id"))
    let filterCategory = sessionStorage.getItem("filterCategory");
    switch (filterCategory) {
      case "decade":
        console.log("decade 80 <3");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=decade"
        );
        break;

      case "formate":
        console.log("fomato VHS");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=formate"
        );
        break;

      case "genere":
        console.log("género fantasía ⚔");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=genere"
        );
        break;

      default:
        // console.log("default");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=listShop"
        );
        break;
    }
  } else {
    divsProduct(
      "module/shop/controller/controllerShopPage.php?op=openProduct&product=",
      homeID
    );
    console.log(sessionStorage.getItem("id"));

    console.log("abriremos este producto!");
    // sessionStorage.setItem("id", null);
  }

  clickShopMenu();
  // console.log("vale");
  // console.log(sessionStorage.getItem("filterCategory"));
}

//CLICK PRODUCTE
function clickProduct() {
  $("body").on("click", "img", function () {
    var clase = this.getAttribute("class");
    var idReturn = this.getAttribute("id");
    var id = this.id;

    if (clase === "touch") {
      id = id.split("-"); ///Dividir imgShop de l'ID. Les ID están juntes a imgShop per a evitar interferències.
      id = id[1];
      divsProduct(
        "module/shop/controller/controllerShopPage.php?op=openProduct&product=",
        id
      );
      // console.log(API_KAY);
      console.log("la ID es " + id);
      openMaps(id);
    } else if (idReturn === "return") {
      $("#formularioFiltro").show();

      $("#map").empty();
      sessionStorage.setItem("id", null);
      loadHomeProducts(); ///Vuelve al catálogo
    }
  });
}
//-------FIN-----CARGA ELS PRODUCTES O UN PRODUCTE-------------//

//BORRA ELS SESSIONSTORAGE
function clickShopMenu() {
  $("#Tienda").click(function () {
    // if (sessionStorage.getItem("filterCategory") != null) {
    //   var stop = false;
    sessionStorage.removeItem("filterCategory");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("VHS");
    sessionStorage.removeItem("DVD");
    sessionStorage.removeItem("Blue-Ray");
    sessionStorage.removeItem("4K");
    sessionStorage.removeItem("Otros");

    // }
  });
}

function searchAjaxProducts(dirUrl, sData = undefined, boolTrue = undefined) {
  ajaxPromise(dirUrl, "GET", "JSON", sData)
    .then(function (category) {
      $("#listShop").empty();
      if (boolTrue === false) {
        setTimeout(
          $("<h1></h1>")
            .append(
              document.createTextNode(
                "No se han encontrado resultados con esta búsqueda"
              )
            )
            .appendTo("#listShop"),
          3000
        );
      }
      loadDivsProducts();

      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id"];
        let name = category[i]["name"];
        let img = "";
        img = "" + category[i]["img"];

        let li = $("<li></li>")
          .attr({ id: "li" + i + "-" + id, class: "portfolio-item" })
          .appendTo(".portfolio-items");
        let div1 = $("<div></div>")
          .attr({ id: "div1" + i + "-" + id, class: "item-main" })
          .appendTo(li);
        let div2 = $("<div></div>")
          .attr({ id: "div2" + i + "-" + id, class: "portfolio-image" })
          .appendTo(div1);
        $("<img>")
          .attr({
            id: "imgShop-" + id,
            class: "touch",
            src: "module\\movies\\img\\" + img,
          })
          .appendTo(div2);

        $("<h5></h5>")
          .append(document.createTextNode(category[i]["movie"]))
          .appendTo(div2);
        $("<h2></h2>")
          .append(document.createTextNode(category[i]["price"] + "€"))
          .appendTo(div2);
      }
    })
    .catch(function () {
      searchAjaxProducts(
        "module/shop/controller/controllerShopPage.php?op=listShop",
        (cData = undefined),
        false
      );
    });
}

function spanFilter(textSpan) {
  $("<br>").appendTo("#filters");
  $("<span>").append(document.createTextNode(textSpan)).appendTo("#filters");
  $("<br>").appendTo("#filters");
}

function genereFilter() {
  ajaxPromise(
    "module/shop/controller/controllerShopPage.php?op=genereFilter",
    "GET",
    "JSON"
  )
    .then(function (data) {
      // console.log(data);
      spanFilter("Género");
      $("<select>")
        .attr({ id: "genere", style: "color: black" })
        .appendTo("#filters");

      $("<option>")
        .attr({ value: "default" })
        .append(document.createTextNode("Todos los géneros"))
        .appendTo("#genere");
      for (var clave in data) {
        let valueGenere = data[clave]["genere"];

        $("<option>")
          .attr({ value: valueGenere })
          .append(document.createTextNode(valueGenere))
          .appendTo("#genere");
      }
    })
    .catch(function () {});
}
function countryFilter() {
  ajaxPromise(
    "module/shop/controller/controllerShopPage.php?op=countryFilter",
    "GET",
    "JSON"
  )
    .then(function (data) {
      // console.log(data);
      spanFilter("País");

      $("<select>")
        .attr({ id: "country", style: "color: black" })
        .appendTo("#filters");

      $("<option>")
        .attr({ value: "default" })
        .append(document.createTextNode("Todo el mundo"))
        .appendTo("#country");
      for (var clave in data) {
        let valueCountry = data[clave]["country"];

        $("<option>")
          .attr({ value: valueCountry })
          .append(document.createTextNode(valueCountry))
          .appendTo("#country");
      }
    })
    .catch(function () {});
}
function formatsFilter() {
  var formatsMatrix = ["VHS", "DVD", "Blu-Ray", "4K", "Digital", "Otro"];
  spanFilter("Formato");

  for (let i = 0; i < formatsMatrix.length; i++) {
    // console.log(sessionStorage.getItem(formatsMatrix[i]));
    // console.log(typeof sessionStorage.getItem(formatsMatrix[i]));
    if (sessionStorage.getItem(formatsMatrix[i]) == formatsMatrix[i]) {
      $("<input>")
        .attr({
          type: "checkbox",
          value: formatsMatrix[i],
          id: formatsMatrix[i],
          checked: "true",
        })
        .appendTo("#filters");
    } else {
      $("<input>")
        .attr({
          type: "checkbox",
          value: formatsMatrix[i],
          id: formatsMatrix[i],
        })
        .appendTo("#filters");
    }
    $("<label>")
      .append(document.createTextNode(formatsMatrix[i]))
      .appendTo("#filters");
    $("<br>").appendTo("#filters");
  }
}
function filtersInput() {
  $("#filters").empty(); //Borrar lo de dins
  genereFilter();
  formatsFilter();
  countryFilter();
}
//   <!-- <script src="module\shop\model\filter.js"></script> -->
// <!-- <script src="module\shop\model\geolocalizacion.js"></script> -->

$(document).ready(function () {
  // script_maps();
  loadHomeProducts();
  clickProduct();
  filtersInput();
  storageFormats();
});
