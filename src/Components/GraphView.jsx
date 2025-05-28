import { useSelector } from "react-redux"
import { Graph as D3Graph } from "react-d3-graph"
import { convertirAGrafoD3 } from "../Structures/Graph"
import { seleccionarNombresCiudades } from "../Redux/selectors/graphSelectors"
import styles from "../Styles/graphView.module.scss"

const GraphView = () => {
  const grafoState = useSelector((state) => state.grafo.grafo)
  const ciudades = useSelector(seleccionarNombresCiudades)

  if (!grafoState || !grafoState.nodes || grafoState.nodes.length === 0) {
    return (
      <div className={styles.grafoContainer}>
        <h3>Visualización del Grafo</h3>
        <div>
          <p>No hay ciudades para mostrar en el grafo.</p>
          <p>Agrega algunas ciudades primero.</p>
        </div>
      </div>
    )
  }

  const grafoTemp = {
    nodes: grafoState.nodes,
    adjList: grafoState.adjList || {},
  }

  const data = convertirAGrafoD3(grafoTemp)
  const conexiones = Object.values(grafoState.adjList || {}).reduce((total, lista) => total + lista.length, 0) / 2

  const centerX = 400
  const centerY = 250
  const numNodes = data.nodes.length

  const baseRadius = Math.max(120, Math.min(200, numNodes * 25))

  data.nodes = data.nodes.map((node, index) => {
    let radius, angle

    if (numNodes <= 6) {
      radius = baseRadius
      angle = (index * 2 * Math.PI) / numNodes
    } else {
      const nodesPerCircle = 6
      const circleIndex = Math.floor(index / nodesPerCircle)
      const nodeInCircle = index % nodesPerCircle

      radius = baseRadius + circleIndex * 80 
      angle = (nodeInCircle * 2 * Math.PI) / Math.min(nodesPerCircle, numNodes - circleIndex * nodesPerCircle)
    }

    return {
      ...node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })

  const config = {
    height: 500,
    width: 800,
    node: {
      color: "#4CAF50",
      size: 200, 
      fontSize: 11,
      labelProperty: "id",
      highlightFontSize: 13,
      highlightStrokeColor: "#0077cc",
    },
    link: {
      color: "#999",
      strokeWidth: 1.5,
    },
    directed: false,
    panAndZoom: false,
    staticGraph: false,
    d3: {
      gravity: -500, 
      linkLength: 180,
      linkStrength: 0.3, 
      alphaTarget: 0.05, 
      disableLinkForce: false,
    },
    automaticRearrangeAfterDropNode: false,
    initialBoundingBox: {
      x0: 50,
      y0: 50,
      x1: 750,
      y1: 450,
    },
  }

  return (
    <div className={styles.grafoContainer}>
      <h3>Visualización del Grafo</h3>
      <div>
        <p>Ciudades: {ciudades.length}</p>
        <p>Conexiones: {conexiones}</p>
      </div>
      <div
        style={{
          border: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          overflow: "hidden",
        }}
      >
        {data.nodes.length > 0 ? (
          <D3Graph
            id="grafo-ciudades"
            data={data}
            config={config}
            key={`graph-${ciudades.length}`} 
          />
        ) : (
          <p>No hay datos para mostrar en el grafo</p>
        )}
      </div>
    </div>
  )
}

export default GraphView
