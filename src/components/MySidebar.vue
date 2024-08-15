<!-- src/components/MySidebar.vue -->
<template>
  <div class="sidebar">
    <h3>Node Properties</h3>
    <div v-if="selectedNode">
      <label>Label:</label>
      <input :value="selectedNode.label" @input="updateLabel" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySidebar',
  props: {
    selectedNode: Object
  },
  methods: {
    updateLabel(event) {
      this.$emit('update-node-label', this.selectedNode.id, event.target.value);
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f4f4f9;
  padding: 10px;
}
</style>
