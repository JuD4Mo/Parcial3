"use client"

import React, { useState } from "react"
import { useSelector } from "react-redux"
import { calcularAltura, contarZonas } from "../Structures/TreeNode"
import styles from "../Styles/treeView.module.scss"

const TreeView = () => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("")
  const arboles = useSelector((state) => state.arboles.arboles)
  const ciudades = Object.keys(arboles)

  const renderArbol = (nodo) => {
    if (!nodo) return null

    return (
      <li key={nodo.valor}>
        {nodo.valor}
        {nodo.hijos && nodo.hijos.length > 0 && (
          <ul>
            {nodo.hijos.map((hijo, i) => (
              <React.Fragment key={`${hijo.valor}-${i}`}>{renderArbol(hijo)}</React.Fragment>
            ))}
          </ul>
        )}
      </li>
    )
  }

  const arbolActual = arboles[ciudadSeleccionada]

  const crearTreeNodeTemp = (nodoData) => {
    if (!nodoData) return null

    const nodo = {
      valor: nodoData.valor,
      hijos: nodoData.hijos ? nodoData.hijos.map(crearTreeNodeTemp) : [],
    }
    return nodo
  }

  const nodoTemp = arbolActual ? crearTreeNodeTemp(arbolActual) : null
  const altura = nodoTemp ? calcularAltura(nodoTemp) : 0
  const total = nodoTemp ? contarZonas(nodoTemp) : 0

  return (
    <div className={styles.treeContainer}>
      <h3>Visualización del Árbol de Zonas Verdes</h3>
      <select value={ciudadSeleccionada} onChange={(e) => setCiudadSeleccionada(e.target.value)}>
        <option value="">Selecciona ciudad</option>
        {ciudades.map((nombre) => (
          <option key={nombre} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>

      {ciudadSeleccionada && arbolActual ? (
        <>
          <h4>Árbol de zonas de {ciudadSeleccionada}</h4>
          <ul>{renderArbol(arbolActual)}</ul>
          <p>
            <strong>Altura máxima:</strong> {altura}
          </p>
          <p>
            <strong>Total de zonas:</strong> {total}
          </p>
        </>
      ) : (
        <p style={{ marginTop: "20px" }}>Selecciona una ciudad para ver su árbol.</p>
      )}
    </div>
  )
}

export default TreeView
