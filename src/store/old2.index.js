import { createStore } from 'vuex';
import { fileSystem } from '../fileSystem.js';
import { calculateCircularLayout } from '../utils/layout';

export default createStore({
  state: {
    nodes: [],
    edges: [],
    fileSystem: fileSystem,
    expandedNodes: new Set([0]), // Track which nodes are expanded
    currentNodeId: null
  },
  mutations: {
    SET_NODES(state, nodes) {
      state.nodes = calculateCircularLayout(nodes, 800, 600);
    },
    SET_EDGES(state, edges) {
      state.edges = edges;
    },
    TOGGLE_EXPAND_NODE(state, nodeId) {
      if (state.expandedNodes.has(nodeId)) {
        state.expandedNodes.delete(nodeId);
      } else {
        state.expandedNodes.add(nodeId);
      }
    }
  },
  actions: {
    loadFileSystem({ commit, state }) {
      const nodes = [];
      const edges = [];
      let nodeIdCounter = 0;

      const traverse = (node, parentId = null, depth = 0, visible = true) => {
        const nodeId = nodeIdCounter++;
        nodes.push({
          id: nodeId,
          name: node.name,
          type: node.type,
          x: 0, // Placeholder, will be calculated later
          y: 0, // Placeholder, will be calculated later
          visible: visible,
          path: [...(parentId !== null ? nodes[parentId].path : []), node.name]
        });

        if (parentId !== null && visible) {
          edges.push({ from: parentId, to: nodeId });
        }

        if (node.children && state.expandedNodes.has(nodeId)) {
          node.children.forEach(child => traverse(child, nodeId, depth + 1, true));
        }
      };

      state.fileSystem.forEach(rootNode => traverse(rootNode));

      commit('SET_NODES', nodes);
      commit('SET_EDGES', edges);
    },
    toggleNode({ commit, dispatch }, nodeId) {
      commit('TOGGLE_EXPAND_NODE', nodeId);
      dispatch('loadFileSystem');
    }
  },
  getters: {
    getNodes: state => state.nodes.filter(node => node.visible),
    getEdges: state => state.edges
  }
});
