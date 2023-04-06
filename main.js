import { anadeReserva, eliminaReserva, modificaReserva, obtenReservas } from './crud.js'
let listadoReservas = []
let btn_enviar = document.getElementById('btn_enviar')
const lista = document.getElementById('listado')
const formulario = document.getElementById('formulario')
window.addEventListener('DOMContentLoaded', ()=>{
    obtenReservas()
    .then(res =>{
        listadoReservas = res.data
        muestraReservas()
    })
})
let id=""
let editar = false
formulario.addEventListener('submit', (event)=>{
    event.preventDefault()
    const reserva = document.getElementById('in_reserva').value
    const profesor = document.getElementById('in_profesor').value
    const horas = document.getElementById('in_horas').value
    if(reserva!="" && profesor!="" && horas!=""){
        const nuevaReserva = {
            reserva,
            profesor,
            horas
        }
        if(editar){
            modificaReserva(id, nuevaReserva).then(()=>{
                muestraReservas()
                console.log('editado')
            })
        }else{
            anadeReserva(nuevaReserva).then(()=>{
                listadoReservas.push(nuevaReserva)
                muestraReservas()
                console.log('añadido')
            })
        }
    }
})
const muestraReservas = ()=>{
    const documento = document.createDocumentFragment()
    listadoReservas.map(el =>{
        const elemento = document.createElement('li')
        const reserva = document.createElement('h1')
        reserva.textContent = el.reserva
        elemento.appendChild(reserva)
        const profesor = document.createElement('h2')
        profesor.textContent = el.profesor
        elemento.appendChild(profesor)
        const horas = document.createElement('h3')
        horas.textContent = el.horas
        elemento.appendChild(horas)
        const boton_editar = document.createElement('button')
        boton_editar.setAttribute('id', 'btn_editar')
        boton_editar.textContent = 'Editar'
        elemento.appendChild(boton_editar)
        documento.appendChild(elemento)
        //Escucho al boton editar
        boton_editar.addEventListener('click', (event)=>{
            event.preventDefault()
            editar=true
            id = el.id
            const boton_cancelar = document.createElement('button')
            boton_cancelar.setAttribute('id', 'btn_cancelar')
            boton_cancelar.textContent = 'Cancelar'
            elemento.appendChild(boton_cancelar)
            boton_cancelar.addEventListener('click', (event)=>{
                event.preventDefault()
                editar=false
                id=""
                elemento.removeChild(boton_cancelar)
            })

        })
        
    })
    lista.appendChild(documento)
    
}

