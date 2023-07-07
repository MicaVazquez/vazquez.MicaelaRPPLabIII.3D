const superheroes =JSON.parse(localStorage.getItem("superheroes")) || [];
const $seccionCards = document.getElementById("seccion-cards");


if(superheroes.length)
{
    const $fragment = document.createDocumentFragment();
    superheroes.forEach(element => {
        const card = crearCard(element); 
        $fragment.appendChild(card);
    });
    $seccionCards.appendChild($fragment);
}


function crearCard(element)
{
    const articulo = document.createElement("article");
    articulo.classList.add("card");

    Object.keys(element).forEach((key) => 
    {
        if (key !== "id") 
        {
            //h3
            let clave = document.createElement("h3");
            clave.textContent = key + " : ";
            articulo.appendChild(clave);
            //h3>img
            let img = document.createElement("img");
            setImage(key,img);
            img.classList.add("iconosSmall");
            clave.appendChild(img);
            //p
            let contenido = document.createElement("p");
            contenido.textContent = element[key];
            articulo.appendChild(contenido);
        }
    });
    return articulo;
}


function setImage(key,img)
{
    switch(key)
    {
        case "alias":
        img.setAttribute("src","../img/antifaz.png");
        break;

        case "editorial":
        img.setAttribute("src","../img/editorial.png");
        break;

        case "arma":
        img.setAttribute("src","../img/arma.png");
        break;

        case "fuerza":
        img.setAttribute("src","../img/fuerza.png");
        break;

        case "nombre":
        img.setAttribute("src","../img/nombre.png");
        break;
    }
}


