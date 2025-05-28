import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  arboles: {},
}

export const arbolesSlice = createSlice({
  name: "arboles",
  initialState,
  reducers: {
    crearArbol: (state, action) => {
      const { ciudad } = action.payload
      if (!state.arboles[ciudad]) {
        state.arboles[ciudad] = {
          valor: ciudad,
          hijos: [],
        }
      }
    },

    agregarZona: (state, action) => {
      const { ciudad, padre, nuevaZona } = action.payload
      const raiz = state.arboles[ciudad]
      if (!raiz) return

      const insertar = (nodo) => {
        if (nodo.valor === padre || padre === "") {
          nodo.hijos.push({
            valor: nuevaZona,
            hijos: [],
          })
          return true
        }
        for (const hijo of nodo.hijos) {
          if (insertar(hijo)) return true
        }
        return false
      }

      insertar(raiz)
    },

    editarZona: (state, action) => {
      const { ciudad, zonaAntigua, nuevoNombre } = action.payload
      const raiz = state.arboles[ciudad]
      if (!raiz) return

      const editar = (nodo) => {
        if (nodo.valor === zonaAntigua) {
          nodo.valor = nuevoNombre
          return true
        }
        for (const hijo of nodo.hijos) {
          if (editar(hijo)) return true
        }
        return false
      }

      editar(raiz)
    },

    eliminarArbol: (state, action) => {
      delete state.arboles[action.payload.ciudad]
    },
  },
})

export const { crearArbol, agregarZona, editarZona, eliminarArbol } = arbolesSlice.actions
export default arbolesSlice.reducer
