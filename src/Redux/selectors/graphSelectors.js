import { createSelector } from "@reduxjs/toolkit"

export const seleccionarNombresCiudades = createSelector([(state) => state.grafo?.grafo?.nodes], (nodes) => {
  if (!nodes || !Array.isArray(nodes)) {
    return []
  }
  return nodes.map((nodo) => (typeof nodo === "object" ? nodo.valor : nodo))
})
