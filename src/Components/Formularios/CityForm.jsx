"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { agregarCiudad, eliminarCiudad } from "../../Redux/slices/graphSlice"
import { crearArbol, eliminarArbol } from "../../Redux/slices/treeSlice"
import { seleccionarNombresCiudades } from "../../Redux/selectors/graphSelectors"
import styles from "../../Styles/cityForm.module.scss"

const CityForm = () => {
  const [nombre, setNombre] = useState("")
  const dispatch = useDispatch()
  const ciudades = useSelector(seleccionarNombresCiudades)

  const handleAgregar = () => {
    if (!nombre.trim()) {
      alert("Por favor ingresa un nombre de ciudad")
      return
    }

    if (ciudades.includes(nombre.trim())) {
      alert("Esta ciudad ya existe")
      return
    }

    const nodoCiudad = { valor: nombre.trim() }
    console.log("Agregando ciudad:", nodoCiudad)

    dispatch(agregarCiudad({ ciudad: nodoCiudad }))
    dispatch(crearArbol({ ciudad: nombre.trim() }))
    setNombre("")
  }

  const handleEliminar = () => {
    if (!nombre.trim()) {
      alert("Por favor ingresa el nombre de la ciudad a eliminar")
      return
    }

    if (!ciudades.includes(nombre.trim())) {
      alert("La ciudad no existe")
      return
    }

    console.log("Eliminando ciudad:", nombre.trim())
    dispatch(eliminarCiudad({ nombre: nombre.trim() }))
    dispatch(eliminarArbol({ ciudad: nombre.trim() }))
    setNombre("")
  }

  return (
    <div className={styles.contenedor}>
      <h3>Gestión de Ciudades</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nombre ciudad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAgregar()}
        />
      </div>
      <div style={{ gap: "10px", display: "flex" }}>
        <button onClick={handleAgregar}>Agregar Ciudad</button>
        <button onClick={handleEliminar}>Eliminar Ciudad</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>
          <strong>Ciudades actuales ({ciudades.length}):</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {ciudades.map((ciudad, index) => (
            <li key={index}>{ciudad}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CityForm
