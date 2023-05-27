
const BodegasDelSurCollection = firebase.firestore().collection("BodegasDelSur")
// llama a la coleccion que creamos en firebase database
let dataVinos = []
let BodegasDelSur = []
let vinosTintos = []
let vinosBlancos = []
let vinosRosados = []
let vinosOrganicosYveganos = []
let arrayAfiltrar = []
let form = document.getElementById("form")
let card = document.getElementById("cartas")
let searchDiv = document.getElementById("search")


async function getDB() {

    await BodegasDelSurCollection.get()
        .then((results) => {
            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            BodegasDelSur.push(...data)

        })
    navegacion("inicio")
};

getDB()


var botonNav = document.getElementsByClassName("button")

for (var i = 0; i < botonNav.length; i++) {
    const elementos = botonNav[i];
    console.log(elementos)
    elementos.addEventListener("click", function (e) {
        navegacion(e.target.id);
    })
}

function navegacion(id) {
    switch (id) {
        case "vinosTintos":
            arrayAfiltrar = BodegasDelSur.filter(vino => vino.category === "Tinto");
            card.style.display = "flex";
            searchDiv.style.display = "flex";
            form.style.display = "none";
            document.getElementById("carouselExampleFade").style.display = "none";
            document.getElementById("mapau").style.display = "none";
            break;
        case "vinosBlancos":
            arrayAfiltrar = BodegasDelSur.filter(vino => vino.category === "Blanco");
            form.style.display = "none";
            card.style.display = "flex";
            searchDiv.style.display = "flex";
            document.getElementById("carouselExampleFade").style.display = "none";
            document.getElementById("mapau").style.display = "none";
            break;
        case "vinosRosados":
            arrayAfiltrar = BodegasDelSur.filter(vino => vino.category === "Rosado");
            form.style.display = "none";
            card.style.display = "flex";
            searchDiv.style.display = "flex";
            document.getElementById("carouselExampleFade").style.display = "none";
            document.getElementById("mapau").style.display = "none";
            break;
        case "vinosOrganicosYveganos":
            arrayAfiltrar = BodegasDelSur.filter(vino => vino.category === "Organicos y Veganos");
            form.style.display = "none";
            card.style.display = "flex";
            searchDiv.style.display = "flex";
            document.getElementById("carouselExampleFade").style.display = "none";
            document.getElementById("mapau").style.display = "none";
            break;
        case "Contact":
            form.style.display = "flex";
            card.style.display = "none";
            searchDiv.style.display = "none";
            imprimirForm();
            document.getElementById("carouselExampleFade").style.display = "none";
            document.getElementById("mapau").style.display = "block";
            break;
        default:
            card.style.display = "flex";
            form.style.display = "none";
            searchDiv.style.display = "flex";
            arrayAfiltrar = BodegasDelSur;
            document.getElementById("carouselExampleFade").style.display = "block";
            document.getElementById("mapau").style.display = "none";
            break;
    }
    display(arrayAfiltrar);
}

function imprimirForm() {
    document.getElementById("form").innerHTML = `
    
        
                <form action="" name="contac">
                <h1>Contactanos</h1>
                    <label for="nombre"><i class="fa-solid fa-user"></i></label>
                    <input type="text" name="nombre" placeholder="Your Name "><br>
                    
                    <label for="email"><i class="fa-solid fa-envelope"></i></label>
                    <input type="email" name="email" placeholder="Your Email"><br>

                    <label for="date"><i class="fa-solid fa-calendar"></i></label>
                    <input type="date" name="date"><br>

                    
                    <label for="type"><i class="fa-solid fa-qrcode"></i></label>
                    <select id="type" name="type">
                        <option value="Varios"selected>Varios</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                        <option value="Felicitaciones">Felicitaciones</option>
                    </select><br>
                    

                    <label for="mensaje"><i class="fa-solid fa-inbox"></i></label>
                    <input type="textarea" name="mensaje" placeholder="Your Message"><br>

                    <input type="submit" class="button_contact" value="Submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <p>No te pierdas todas las ofertas y novedades de Bodegas del Sur que tenemos para vos.</p>
                
                   <h2><i class="fa-solid fa-phone"></i> 652 188 9190</h2>   
                   <h2><i class="fa-solid fa-location-dot"></i>  Argentina. </h2>  
                </form>
           
          
    `
   let form = document.querySelector("form")
}

function display(array) {

    console.log(array)
    var html = "";

    array.map(vino => {
        html += `
        <div class="card h-150">
        <img src="${vino.image}" class="card-img-top" alt=${vino.name}>
        <div class="card-body">
          <h5 class="card-title">${vino.name}</h5>
          <p class="card-price ms-2"><small>$${vino.price}</small></p>
          <p class="card-text">${vino.category}</p>
          <div class="card-footer">
          <a href="" class="btn btn-outline-info">Compre ahora</a>
        </div>
        </div>
      </div>
        `

    })

    document.getElementById("cartas").innerHTML = html;
}