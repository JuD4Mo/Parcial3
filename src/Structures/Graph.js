export class Graph {
  constructor() {
    this.nodes = [];   
    this.adjList = {};   
  }

  addNode(node) {
    const key = node.valor;
    if (!this.searchNode(key)) {
      this.nodes.push(node);
      this.adjList[key] = [];
    }
  }

  removeNode(nombre) {
    if (!this.searchNode(nombre)) return;

    for (let vecino of this.adjList[nombre]) {
      this.adjList[vecino] = this.adjList[vecino].filter(n => n !== nombre);
    }

    delete this.adjList[nombre];

    this.nodes = this.nodes.filter(n => (typeof n === 'object' ? n.valor !== nombre : n !== nombre));
  }

  addEdge(n1, n2) {
    const c1 = typeof n1 === 'object' ? n1.valor : n1;
    const c2 = typeof n2 === 'object' ? n2.valor : n2;

    if (!this.adjList[c1]) this.adjList[c1] = [];
    if (!this.adjList[c2]) this.adjList[c2] = [];

    if (!this.adjList[c1].includes(c2)) this.adjList[c1].push(c2);
    if (!this.adjList[c2].includes(c1)) this.adjList[c2].push(c1);
  }

  searchNode(nombre) {
    return this.nodes.find(n => (typeof n === 'object' ? n.valor === nombre : n === nombre));
  }

  getArbol(nombre) {
    const nodo = this.searchNode(nombre);
    return nodo || null;
  }

  printAdjacency(nombre) {
    if (this.adjList[nombre]) {
      console.log(this.adjList[nombre]);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }
}

export function convertirAGrafoD3(grafo) {
  const nodes = grafo.nodes.map((nodo) => {
    const id = typeof nodo === "object" ? nodo.valor : nodo; 
    return {
      id,
      color: "#4CAF50"
    };
  });

  const visitados = new Set();
  const links = [];

  for (const origen in grafo.adjList) {
    for (const destino of grafo.adjList[origen]) {
      const clave = [origen, destino].sort().join("-");
      if (!visitados.has(clave)) {
        links.push({ source: origen, target: destino });
        visitados.add(clave);
      }
    }
  }
  
  console.log("Datos del grafo para D3:", { nodes, links }); 
  return { nodes, links };
}