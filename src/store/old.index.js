// src/store/index.js
import { createStore } from 'vuex';
import { fileSystem } from '../fileSystem.js';
import { calculateCircularLayout } from '../utils/layout.js';

export default createStore({
  state: {
    nodes: [],
    edges: [],
    fileSystem: fileSystem,
    expandedNodes: new Set(),
    navigationHistory: [],
    futureHistory: [],
    currentPath: [],
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
    },
    NAVIGATE_TO(state, { path, nodeId }) {
      if (state.currentNodeId !== null) {
        state.navigationHistory.push(state.currentNodeId);
      }
      state.futureHistory = [];
      state.currentNodeId = nodeId;
      state.currentPath = path;
    },
    GO_BACK(state) {
      if (state.navigationHistory.length > 0) {
        state.futureHistory.push(state.currentNodeId);
        const previousNodeId = state.navigationHistory.pop();
        const node = state.nodes.find(n => n.id === previousNodeId);
        state.currentNodeId = previousNodeId;
        state.currentPath = node ? node.path : [];
      }
    },
    GO_FORWARD(state) {
      if (state.futureHistory.length > 0) {
        const nextNodeId = state.futureHistory.pop();
        state.navigationHistory.push(state.currentNodeId);
        const node = state.nodes.find(n => n.id === nextNodeId);
        state.currentNodeId = nextNodeId;
        state.currentPath = node ? node.path : [];
      }
    },
    ADD_NODE(state, { parentId, newNode }) {
      const parent = state.nodes.find(n => n.id === parentId);
      if (parent && parent.type === 'folder') {
        const newId = state.nodes.length;
        state.nodes.push({
          id: newId,
          name: newNode.name,
          type: newNode.type,
          x: parent.x + 200,
          y: parent.y + state.nodes.length * 60,
          visible: true,
          path: [...parent.path, newNode.name]
        });
        state.edges.push({ from: parentId, to: newId });
      }
    },
    REMOVE_NODE(state, nodeId) {
      const nodeIndex = state.nodes.findIndex(n => n.id === nodeId);
      if (nodeIndex !== -1) {
        state.nodes.splice(nodeIndex, 1);
        state.edges = state.edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId);
        state.navigationHistory = state.navigationHistory.filter(id => id !== nodeId);
        state.futureHistory = state.futureHistory.filter(id => id !== nodeId);
      }
    }
  },
  actions: {
    loadFileSystem({ commit, state }) {
      const nodes = [];
      const edges = [];
      let nodeIdCounter = 0;

      const traverse = (node, parentId = null, depth = 0, visible = true, yPos = 0) => {
        const nodeId = nodeIdCounter++;
        nodes.push({
          id: nodeId,
          name: node.name,
          type: node.type,
          x: 0, // Placeholder, will be calculated later
          y: yPos + nodes.length * 60 + 50, // Use yPos to influence node position
          visible: visible,
          path: [...(parentId !== null ? nodes[parentId].path : []), node.name]
        });

        if (parentId !== null && visible) {
          edges.push({ from: parentId, to: nodeId });
        }

        if (node.children && state.expandedNodes.has(nodeId)) {
          let childYPos = yPos + nodes.length * 60 + 50; // Start below the current node
          node.children.forEach(child => {
            traverse(child, nodeId, depth + 1, visible, childYPos);
            childYPos += 60; // Increment for each child to stack them vertically
          });
        }
      };

      state.fileSystem.forEach(rootNode => traverse(rootNode));

      commit('SET_NODES', nodes);
      commit('SET_EDGES', edges);
    },
    toggleNode({ commit, dispatch }, nodeId) {
      commit('TOGGLE_EXPAND_NODE', nodeId);
      dispatch('loadFileSystem');
    },
    navigateTo({ commit, dispatch }, nodeId) {
      const node = this.state.nodes.find(n => n.id === nodeId);
      if (node) {
        commit('NAVIGATE_TO', { path: node.path, nodeId });
        dispatch('loadFileSystem');
      }
    },
    goBack({ commit, dispatch }) {
      commit('GO_BACK');
      dispatch('loadFileSystem');
    },
    goForward({ commit, dispatch }) {
      commit('GO_FORWARD');
      dispatch('loadFileSystem');
    },
    addNode({ commit }, { parentId, newNode }) {
      commit('ADD_NODE', { parentId, newNode });
    },
    removeNode({ commit }, nodeId) {
      commit('REMOVE_NODE', nodeId);
    }
  },
  getters: {
    getNodes: state => state.nodes.filter(node => node.visible),
    getEdges: state => state.edges,
    getCurrentPath: state => state.currentPath.join(' / ')
  }
});
