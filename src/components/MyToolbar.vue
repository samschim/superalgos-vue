<!-- src/components/MyToolbar.vue -->
<template>
  <div class="toolbar">
    <button @click="addNode">Add Node</button>
    <button @click="removeNode">Remove Node</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'MyToolbar',
  computed: {
    ...mapState(['currentNodeId'])
  },
  methods: {
    ...mapActions(['addNode', 'removeNode']),
    addNode() {
      if (this.currentNodeId !== null) {
        const newNode = {
          name: `New Node ${Math.floor(Math.random() * 100)}`,
          type: 'file' // You can change this to 'folder' if needed
        };
        this.addNode({ parentId: this.currentNodeId, newNode });
      }
    },
    removeNode() {
      if (this.currentNodeId !== null) {
        this.removeNode(this.currentNodeId);
      }
    }
  }
};
</script>

<style scoped>
.toolbar {
  background-color: #f4f4f9;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
