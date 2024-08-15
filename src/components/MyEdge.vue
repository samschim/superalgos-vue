<template>
  <line
    :x1="sourceNode.x"
    :y1="sourceNode.y"
    :x2="targetNode.x"
    :y2="targetNode.y"
    stroke="black"
  />
</template>

<script>
export default {
  props: {
    edge: Object,
    nodes: Array
  },
  computed: {
    sourceNode() {
      return this.nodes.find(node => node.id === this.edge.from);
    },
    targetNode() {
      return this.nodes.find(node => node.id === this.edge.to);
    }
  }
};
</script>
