export class TreeNode {
  constructor(valor) {
    this.valor = valor;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    this.hijos.push(nodo);
  }

  eliminarHijo(valor) {
    this.hijos = this.hijos.filter(h => h.valor !== valor);
    this.hijos.forEach(hijo => hijo.eliminarHijo(valor));
  }
}


export function dfs(nodo) {
  if (!nodo) return;
  console.log(nodo.valor);
  for (let hijo of nodo.hijos) {
    dfs(hijo);
  }
}


export function bfs(raiz) {
  const cola = [raiz];
  while (cola.length > 0) {
    const actual = cola.shift();
    console.log(actual.valor);
    cola.push(...actual.hijos);
  }
}


export function calcularAltura(nodo) {
  if (!nodo || nodo.hijos.length === 0) return 1;
  return 1 + Math.max(...nodo.hijos.map(calcularAltura));
}


export function contarZonas(nodo) {
  if (!nodo) return 0;
  return 1 + nodo.hijos.reduce((acc, hijo) => acc + contarZonas(hijo), 0);
}
