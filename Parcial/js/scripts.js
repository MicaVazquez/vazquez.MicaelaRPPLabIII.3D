
import { Superheroe} from "./Superheroe.js";
import { actualizarTabla} from "./tabla.js";

 const $seccionTabla = document.getElementById("tabla");

 //superheroes
const superheroes =JSON.parse(localStorage.getItem("superheroes")) || [];

//id global
let id = null;
//armas
const listArmas = ["Armadura", "Espada", "Martillo", "Escudo","Arma de Fuego","Flechas"];
localStorage.setItem("armas", JSON.stringify(listArmas)); 
const armas = JSON.parse(localStorage.getItem("armas")) || [];
const $selectArmas = document.getElementById("Arma");
$selectArmas.appendChild(cargarSelect(armas));

const $formulario = document.forms[0];
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const $spinner = document.getElementById("spinner");

if(superheroes.length) actualizarTabla($seccionTabla,superheroes);

//alta persona
$formulario.addEventListener("submit",(e)=>{
   e.preventDefault();
   
   const {txtId,txtNombre,txtAlias,txtFuerza,rdoEditorial,cmbArma} = $formulario;
   //validaciones

   if(verificarFormulario())
   {
      if(txtId.value == "")
      {
        const newSuper = new Superheroe(Date.now(),txtNombre.value,parseInt(txtFuerza.value),txtAlias.value,rdoEditorial.value,cmbArma.value);
        handlerCreate(newSuper);
      }
      else
      {
         const updatedSuper = new Superheroe(parseInt(txtId.value),txtNombre.value,parseInt(txtFuerza.value),txtAlias.value,rdoEditorial.value,cmbArma.value);
         handlerUpdate(updatedSuper);
      }
   }
   limpiarFormulario();
})


function cargarSelect(lista)
{
 const $fragment = document.createDocumentFragment();
 for(const item of lista)
 {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    $fragment.appendChild(option)
 }
  return $fragment;
}



window.addEventListener("click", (e)=>{
   if(e.target.matches("td"))// si el emisor es un td
   {
       id = e.target.parentElement.dataset.id;
       const selectedSuper = superheroes.find((heroe)=> heroe.id == id);
       cargarFormSuper($formulario,selectedSuper);
       mostrarBotones();
   }
   else if(e.target.matches("input[value = 'Eliminar']"))
   { 
     handlerDelete(id);
     ocultarBotones();
   }
   else if(e.target.matches("input[value = 'Cancelar']"))
   {
     limpiarFormulario();
     ocultarBotones();
   }

})


function handlerCreate(newObj)
{
   superheroes.push(newObj);
   mostrarSpinner();
   actualizarStorage("superheroes",superheroes);
   actualizarTabla($seccionTabla,superheroes);
   limpiarFormulario();
   mostrarAlertaCustom("alta");
}

function handlerUpdate(editSuper)
{
   mostrarSpinner();
   let indice = superheroes.findIndex((supeer)=> supeer.id == editSuper.id);
   superheroes.splice(indice,1,editSuper);
   actualizarStorage("superheroes",superheroes);
   actualizarTabla($seccionTabla,superheroes);
   limpiarFormulario();
   mostrarAlertaCustom("modificación");
}

function handlerDelete(id)
{
   mostrarSpinner();
   let indice = superheroes.findIndex((supeer)=> supeer.id == id);
   superheroes.splice(indice,1);
   actualizarStorage("superheroes",superheroes);
   actualizarTabla($seccionTabla,superheroes);
   limpiarFormulario();
   mostrarAlertaCustom("baja");
}

function actualizarStorage(clave,data)
{
    localStorage.setItem(clave,JSON.stringify(data));
}

function cargarFormSuper(formulario,superheroe)
{
    formulario.txtId.value = superheroe.id
    formulario.txtNombre.value = superheroe.nombre;
    formulario.txtAlias.value = superheroe.alias;
    formulario.txtFuerza.value = superheroe.fuerza;
    formulario.rdoEditorial.value = superheroe.editorial;
    formulario.cmbArma.value = superheroe.arma;
}

function ocultarBotones()
{
  $btnCancelar.classList.add("oculto");
  $btnEliminar.classList.add("oculto");
}  

function mostrarBotones()
{
  $btnCancelar.classList.remove("oculto");
  $btnEliminar.classList.remove("oculto");
  $btnCancelar.classList.add("color");
  $btnEliminar.classList.add("color");
}  

function mostrarSpinner() 
{
   $spinner.classList.remove("oculto"); // Muestra el spinner
   $seccionTabla.classList.add("oculto");
   setTimeout(function() 
   {
     $seccionTabla.classList.remove("oculto"); // Después de 3 segundos, actualiza la tabla
     $spinner.classList.add("oculto"); // Oculta el spinner después de actualizar el Local Storage
   }, 3000);
}
 
function limpiarFormulario()
{
   $formulario.reset();
   $formulario.txtId.value="";
   id = null;
}


function verificarFormulario()
{
   let rtn = false;
   const {txtNombre,txtAlias,txtFuerza,rdoEditorial,cmbArma} = $formulario;

   if(txtNombre.value != "" && txtAlias.value != "" && txtFuerza.value != "" && rdoEditorial.value != "" && cmbArma.value != "")
   {
      rtn = true;
   }
  return rtn;
}


function mostrarAlertaCustom(accion) {

   const customAlert = document.getElementById("custom-alert");

   let mensaje = "";

   if (accion === "alta")
   {
      mensaje = "Se ha realizado una alta.";
   } else if (accion === "baja") 
   {
      mensaje = "Se ha realizado una baja.";
   } 
   else if (accion === "modificacion") 
   {
      mensaje = "Se ha realizado una modificación.";
   }

   customAlert.innerHTML = mensaje;
   customAlert.className = "custom-alert";

   setTimeout(function() {
      customAlert.innerHTML = ""; 
      customAlert.className = ""; 
   }, 3000); 
}



