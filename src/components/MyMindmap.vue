<template>
  <svg :width="width" :height="height">
    <MyEdge v-for="edge in edges" :key="edge.from + '-' + edge.to" :edge="edge" :nodes="nodes" />
    <MyNode v-for="node in visibleNodes" :key="node.id" :node="node" @toggle-node="handleToggleNode" />
  </svg>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MyNode from './MyNode.vue';
import MyEdge from './MyEdge.vue';

export default {
  components: {
    MyNode,
    MyEdge
  },
  computed: {
    ...mapGetters(['getNodes', 'getEdges']),
    visibleNodes() {
      return this.getNodes.filter(node => this.expandedNodes.has(node.id) || node.type !== 'folder');
    }
  },
  data() {
    return {
      width: 800,
      height: 600,
      expandedNodes: new Set()
    };
  },
  created() {
    this.$store.dispatch('loadFileSystem');
  },
  methods: {
    handleToggleNode(nodeId) {
      if (this.expandedNodes.has(nodeId)) {
        this.expandedNodes.delete(nodeId);
      } else {
        this.expandedNodes.add(nodeId);
      }
      this.$store.dispatch('updateNodes'); // Update nodes and edges based on expanded state
    },
    ...mapActions(['loadFileSystem', 'updateNodes'])
  }
};
</script>
