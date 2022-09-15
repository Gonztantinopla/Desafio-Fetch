const cotizaciones = []
const testimoniosData = "testimonios.json"
const testimoniosSection = document.getElementById("reviewsTestomonials")
let recargado = false

class Cotizacion {
    constructor(item, valorContado, cuotas, valorCuota, precioFinal) {
        this.item = document.getElementById("item").value
        this.valorContado = document.getElementById("valorContado").value
        this.cuotas = document.getElementById("cuotas").value
        this.valorCuota = valorCuota
        this.precioFinal = precioFinal
    }
}


function userNuevo(){
    Swal.fire({
    title:'¡Bienvenido!',
    text:'porfavor ingresa tu nombre a continuación',
    input: 'text',
    inputAutoTrim: true,
    }).then((result) => {
        if(result.value) {
            localStorage.setItem('usuario',result.value)
            result.value = usuario
        }
    }) .finally((result) => {
        if (!result) {
        localStorage.removeItem("cotizaciones")
        location.reload()
        }
    }) ;
}



const usuario = localStorage.getItem('usuario') || userNuevo()


function miUser(){
    Swal.fire({
        title: 'Hola ' + usuario,
        text: "Bienvenido a Cuotix",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No soy ' + usuario,
    }).then((result) => {
        if (result.isConfirmed) {
        userNuevo()
        }
    })
    
}

const botonUser = document.getElementById("btn-user")
botonUser.addEventListener('click', miUser)

const botonCalcular = document.getElementById("botonCalcular")
botonCalcular.addEventListener("click", calcular)

function calcular() {
    let item = document.getElementById("item").value
    let valorContado = document.getElementById("valorContado").value
    if (valorContado == 0 ){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            text:"Debe ingresar un importe",
            })
    }
else{
    let cuotas = document.getElementById("cuotas").value
    precioFinal = parseInt(calculoFinal(valorContado, cuotas))
    valorCuota = parseInt(calculoCuotas(valorContado, cuotas))
    console.log("Debera abonar", cuotas, "cuotas de", "$", Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))))
    Swal.fire({
        position: 'center',
        icon: 'success',
        text: "Debera abonar\n" + cuotas + " de $" + Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))),
        showConfirmButton: true,
    })
    cotizaciones.push(new Cotizacion(item, valorContado, cuotas, valorCuota, Math.trunc(precioFinal)))
    limpiarlista()
    printCotizaciones()
    mostrarCotizaciones()
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones))
}
}

function calculoFinal(num1, cuotas) {
    switch (cuotas) {
        case "1 cuota":
            return num1
        case "2 cuotas":
            return (num1 * 1.12)
        case "3 cuotas":
            return (num1 * 1.18)
        case "4 cuotas":
            return (num1 * 1.24)
        case "5 cuotas":
            return (num1 * 1.31)
        case "6 cuotas":
            return (num1 * 1.39)
        default:
            return "elegir entre 1 y 6 cuotas"
    }
}

function calculoCuotas(num1, cuotas) {
    switch (cuotas) {
        case "1 cuota":
            return num1
        case "2 cuotas":
            return (num1 * 1.12) / 2
        case "3 cuotas":
            return (num1 * 1.18) / 3
        case "4 cuotas":
            return (num1 * 1.24) / 4
        case "5 cuotas":
            return (num1 * 1.31) / 5
        case "6 cuotas":
            return (num1 * 1.39) / 6
        default:
            return "elegir entre 1 y 6 cuotas"
    }
}


function sumarPreciosFinales() {
    let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.precioFinal, 0)
    console.log("Total a pagar: $", total)
}

function sumarValoresCuotas() {
    let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.valorCuota, 0)
    console.log("Monto a pagar mensualmente: $", total)
}


function limpiarlista(){
    let listaLimpia = document.getElementById("cuerpo")
    listaLimpia.innerHTML = ""

}

function printCotizaciones() {
    const cuerpo = document.getElementById("cuerpo")
    cotizaciones.forEach(cotizacion => {
        cuerpo.innerHTML += `<tr>
        <td>•${cotizacion.item}</td>
        <td>${cotizacion.valorContado}</td>
        <td>${cotizacion.cuotas}</td>
        <td>${cotizacion.valorCuota}</td>
        <td>${cotizacion.precioFinal}</td>
    </tr>`
    })
    
}

function mostrarCotizaciones(){
    let mostrar = document.getElementById("cotizacionesAnteriores")
        mostrar.className = "container calculador CotizacionesAnterioresShow animate__animated animate__fadeIn animete__delay-3s"
}



const BtonLoadStorage = document.getElementById("botonLoadStorage")
BtonLoadStorage.addEventListener("click", recuperarCotizaciones)

function recuperarCotizaciones (){
    if (recargado == false) {
    if (localStorage.cotizaciones){
        const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones"))
            cotizacionesGuardadas.forEach(e =>{
                cotizaciones.push(e)
            })
            printCotizaciones()
            mostrarCotizaciones()
    recargado = true
    }}

}

// function limpiarCotizacionesStorage(){
//     localStorage.cotizaciones
// }


const printTestimonios = (review)=> {
    const {avatar, nombre, reseña} = review
    return `<div class="col-md-4 mb-0 d-flex align-items-stretch">
    <div class="card testimonial-card">
        <div class="card-up" style="background-color: #6d5b98;"></div>
        <div class="avatar mx-auto bg-white">
            <img src="${avatar}"
                class="rounded-circle img-fluid" />
        </div>
        <div class="card-body">
            <h4 class="mb-4">${nombre}</h4>
            <hr />
            <p class="dark-grey-text mt-4">
                <i class="fas fa-quote-left pe-2"></i>${reseña}
            </p>
        </div>
    </div>
</div>
`
}

const printErrorTestomonios = () =>{
    return `<div class="card-body">
    <h4 class="mb-4">Proximamente vas a ver todo lo que nuestros clientes tienen para contarte!</h4>
    </div>`
}

const fetchTestimonios = async ()=> {
    const response = await fetch(testimoniosData)
    const data = await response.json()
        return data
}

const cargarTestimonios = async ()=> {
    let domTestimonials = ""
        try {
            data = await fetchTestimonios()
            data.forEach(review => {
                domTestimonials += printTestimonios(review)
            })
            testimoniosSection.innerHTML = domTestimonials
        } catch (error) {
            testimoniosSection.innerHTML = printErrorTestomonios()
        }
}
cargarTestimonios()