import { anadeReserva, eliminaReserva, modificaReserva, obtenReservas } from './crud.js'

let listadoReservas = []
let id=""
let editar = false
const formulario = document.getElementById('formulario')


window.addEventListener('DOMContentLoaded', ()=>{
    obtenReservas()
    .then(res =>{
        listadoReservas = res.data
        console.log(listadoReservas)
        muestraReservas()
    })
})

const muestraReservas = () => {
    const lista = document.getElementById('listado')
    let html = "" 
    listadoReservas.forEach(el => {
        const {id, reserva, profesor, horas} = el
        html += `
            <li>
                <h1>${reserva}</h1>
                <h1>${profesor}</h1>
                <h1>${horas}</h1>
                <button class='btn_editar' data-id="${id}">Editar</button>
                <button class='btn_cancelar' style="display:none">Cancelar</button>
            </li>
        `
    })
    lista.innerHTML = html

    const botones_editar = document.querySelectorAll('.btn_editar')
    botones_editar.forEach(btn_editar => {
        btn_editar.addEventListener('click', (event) => {
            editar = true
            console.log('editando')
            id = event.target.dataset.id
            const li = event.target.parentNode
            const btn_cancelar = li.querySelector('.btn_cancelar')
            btn_cancelar.style.display = 'inline-block'
        })
    })
    const botones_cancelar = document.querySelectorAll('.btn_cancelar')
    botones_cancelar.forEach(btn_cancelar => {
        btn_cancelar.addEventListener('click', (event) => {
            editar = false
            console.log('editar cancelado')
            const id = event.target.dataset.id
            const li = event.target.parentNode
            const btn_editar = li.querySelector('.btn_editar')
            btn_cancelar.style.display = 'none'
            btn_editar.style.display = 'inline-block'
        })
    }) 
}

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
            modificaReserva(id, nuevaReserva)       
            listadoReservas.map((el, idx) =>{
                if(el.id === id){
                    listadoReservas[idx] = nuevaReserva
                }
            })
            muestraReservas()
            console.log('editado')
        }else{
            anadeReserva(nuevaReserva)
            listadoReservas.push(nuevaReserva)
            muestraReservas()
            console.log('añadido')
        }
    }
})


