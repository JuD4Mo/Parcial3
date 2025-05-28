import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  grafo: {
    nodes: [],
    adjList: {},
  },
}

export const grafoSlice = createSlice({
  name: "grafo",
  initialState,
  reducers: {
    agregarCiudad: (state, action) => {
      const { ciudad } = action.payload

      const existe = state.grafo.nodes.find((nodo) =>
        typeof nodo === "object" ? nodo.valor === ciudad.valor : nodo === ciudad.valor,
      )

      if (!existe) {
        state.grafo.nodes.push(ciudad)

        state.grafo.adjList[ciudad.valor] = []

        console.log("Ciudad agregada. Nodos actuales:", state.grafo.nodes)
        console.log("Estado actual después de agregarCiudad:", state)
      } else {
        console.log("La ciudad ya existe:", ciudad.valor)
      }
    },

    eliminarCiudad: (state, action) => {
      const nombre = action.payload.nombre
      state.grafo.nodes = state.grafo.nodes.filter((nodo) => {
        const valor = typeof nodo === "object" ? nodo.valor : nodo
        return valor !== nombre
      })

      Object.keys(state.grafo.adjList).forEach((key) => {
        if (key === nombre) {
          delete state.grafo.adjList[key]
        } else {
          state.grafo.adjList[key] = state.grafo.adjList[key].filter((vecino) => vecino !== nombre)
        }
      })
    },

    conectarCiudades: (state, action) => {
      const { ciudad1, ciudad2 } = action.payload

      const nodo1 = state.grafo.nodes.find((nodo) =>
        typeof nodo === "object" ? nodo.valor === ciudad1 : nodo === ciudad1,
      )
      const nodo2 = state.grafo.nodes.find((nodo) =>
        typeof nodo === "object" ? nodo.valor === ciudad2 : nodo === ciudad2,
      )

      if (nodo1 && nodo2) {
        if (!state.grafo.adjList[ciudad1]) {
          state.grafo.adjList[ciudad1] = []
        }
        if (!state.grafo.adjList[ciudad2]) {
          state.grafo.adjList[ciudad2] = []
        }

        if (!state.grafo.adjList[ciudad1].includes(ciudad2)) {
          state.grafo.adjList[ciudad1].push(ciudad2)
        }
        if (!state.grafo.adjList[ciudad2].includes(ciudad1)) {
          state.grafo.adjList[ciudad2].push(ciudad1)
        }
        //Si la conexión ya existe no sucede nada, tampoco se suman la cantidad de adyacencias :D
        console.log("Ciudades conectadas. AdjList:", state.grafo.adjList)
        console.log("Estado actual después de conectarCiudades:", state)
      } else {
        console.log("Error: Una o ambas ciudades no existen", { nodo1, nodo2 })
      }
    },
  },
})

export const { agregarCiudad, eliminarCiudad, conectarCiudades } = grafoSlice.actions
export default grafoSlice.reducer
