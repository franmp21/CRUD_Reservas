export const anadeReserva = async(data) => await axios.post('http://localhost:3000/reservas', data)
export const obtenReservas = async() => await axios.get('http://localhost:3000/reservas')
export const modificaReserva = async(id, data) => await axios.patch(`http://localhost:3000/reservas/${id}`, data)
export const eliminaReserva = async(id) => await axios.delete(`http://localhost:3000/reservas/${id}`)
