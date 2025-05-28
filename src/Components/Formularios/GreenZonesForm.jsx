"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { agregarZona, editarZona } from "../../Redux/slices/treeSlice"
import { seleccionarNombresCiudades } from "../../Redux/selectors/graphSelectors"
import styles from "../../Styles/greenZonesForm.module.scss"

const GreenZonesForm = () => {
  const [ciudad, setCiudad] = useState("")
  const [padre, setPadre] = useState("")
  const [nuevaZona, setNuevaZona] = useState("")

  const [modoEdicion, setModoEdicion] = useState(false)
  const [zonaAEditar, setZonaAEditar] = useState("")
  const [nuevoNombre, setNuevoNombre] = useState("")

  const dispatch = useDispatch()
  const ciudades = useSelector(seleccionarNombresCiudades)
  const arboles = useSelector((state) => state.arboles.arboles)


  const obtenerTodasLasZonas = (nodo, zonas = []) => {
    if (!nodo) return zonas

    zonas.push(nodo.valor)

    if (nodo.hijos && nodo.hijos.length > 0) {
      nodo.hijos.forEach((hijo) => obtenerTodasLasZonas(hijo, zonas))
    }

    return zonas
  }

  const zonasDisponibles = ciudad && arboles[ciudad] ? obtenerTodasLasZonas(arboles[ciudad]) : []

  console.log("Zonas disponibles para", ciudad, ":", zonasDisponibles)

  useEffect(() => {
    setPadre("")
    setModoEdicion(false)
    setZonaAEditar("")
    setNuevoNombre("")
  }, [ciudad])

  const handleAgregarZona = () => {
    if (!ciudad || !nuevaZona.trim()) {
      alert("Selecciona una ciudad e ingresa el nombre de la zona")
      return
    }

    if (zonasDisponibles.includes(nuevaZona.trim())) {
      alert("Esta zona ya existe en la ciudad")
      return
    }

    console.log("Agregando zona:", {
      ciudad,
      padre: padre || "", 
      nuevaZona: nuevaZona.trim(),
    })

    dispatch(
      agregarZona({
        ciudad,
        padre: padre || "", 
        nuevaZona: nuevaZona.trim(),
      }),
    )

    setPadre("")
    setNuevaZona("")
  }

  const handleEditarZona = () => {
    if (!ciudad || !zonaAEditar || !nuevoNombre.trim()) {
      alert("Selecciona una ciudad, una zona a editar e ingresa el nuevo nombre")
      return
    }

    if (zonaAEditar === ciudad) {
      alert("No puedes editar el nombre de la ciudad desde aquí")
      return
    }

    if (zonasDisponibles.includes(nuevoNombre.trim()) && nuevoNombre.trim() !== zonaAEditar) {
      alert("Ya existe una zona con ese nombre")
      return
    }

    console.log("Editando zona:", {
      ciudad,
      zonaAntigua: zonaAEditar,
      nuevoNombre: nuevoNombre.trim(),
    })

    dispatch(
      editarZona({
        ciudad,
        zonaAntigua: zonaAEditar,
        nuevoNombre: nuevoNombre.trim(),
      }),
    )

    setZonaAEditar("")
    setNuevoNombre("")
    setModoEdicion(false)
  }

  return (
    <div className={styles.contenedor}>
      <h3>Gestionar Zonas Verdes</h3>

      <div style={{ marginBottom: "10px" }}>
        <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
          <option value="">Selecciona ciudad</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {ciudad && (
        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={() => setModoEdicion(false)}
            style={{
              marginRight: "10px",
              backgroundColor: !modoEdicion ? "#0077cc" : "#ccc",
            }}
          >
            Agregar Zona
          </button>
          <button
            onClick={() => setModoEdicion(true)}
            style={{
              backgroundColor: modoEdicion ? "#0077cc" : "#ccc",
            }}
          >
            Editar Zona
          </button>
        </div>
      )}

      {!modoEdicion && ciudad && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <select value={padre} onChange={(e) => setPadre(e.target.value)}>
              <option value="">Zona raíz (directamente en la ciudad)</option>
              {zonasDisponibles
                .filter((zona) => zona !== ciudad)
                .map((zona) => (
                  <option key={zona} value={zona}>
                    {zona}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Nueva zona verde"
              value={nuevaZona}
              onChange={(e) => setNuevaZona(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAgregarZona()}
            />
          </div>

          <button onClick={handleAgregarZona}>Agregar Zona</button>
        </>
      )}

      {modoEdicion && ciudad && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <select value={zonaAEditar} onChange={(e) => setZonaAEditar(e.target.value)}>
              <option value="">Selecciona zona a editar</option>
              {zonasDisponibles
                .filter((zona) => zona !== ciudad) 
                .map((zona) => (
                  <option key={zona} value={zona}>
                    {zona}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Nuevo nombre para la zona"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEditarZona()}
            />
          </div>

          <button onClick={handleEditarZona}>Editar Zona</button>
        </>
      )}

      {ciudad && (
        <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
          <p>
            <strong>Zonas actuales en {ciudad}:</strong>
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {zonasDisponibles.map((zona, index) => (
              <li key={index}>{zona}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GreenZonesForm
