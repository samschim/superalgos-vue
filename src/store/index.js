// src/store/index.js
import { createStore } from 'vuex';
import { fileSystem } from '../fileSystem.js';
import { calculateCircularLayout } from '../utils/layout';

export default createStore({
  state: {
    nodes: [],
    edges: [],
    expandedNodes: new Set()
  },
  mutations: {
    SET_NODES(state, nodes) {
      state.nodes = nodes;
    },
    SET_EDGES(state, edges) {
      state.edges = edges;
    }
  },
  actions: {
    loadFileSystem({ commit }) {
      const nodes = calculateCircularLayout(fileSystem, 800, 600); // Assuming dimensions
      const edges = calculateEdges(nodes);
      commit('SET_NODES', nodes);
      commit('SET_EDGES', edges);
    }
  },
  getters: {
    getNodes: state => state.nodes,
    getEdges: state => state.edges
  }
});

function calculateEdges(nodes) {
  let edges = [];
  nodes.forEach(node => {
    if (node.children) {
      node.children.forEach(child => {
        edges.push({ from: node.id, to: child.id });
      });
    }
  });
  return edges;
}
