<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col h-screen">
    <NavigationBar />
    <MyToolbar @add-node="addNode" @remove-node="removeNode" />
    <MySidebar :selectedNode="selectedNode" @update-node-label="updateNodeLabel" />
    <Mindmap />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavigationBar from './components/NavigationBar.vue';
import MyToolbar from './components/MyToolbar.vue';
import MySidebar from './components/MySidebar.vue';
import Mindmap from './components/MyMindmap.vue';

export default {
  name: 'App',
  components: { NavigationBar, MyToolbar, MySidebar, Mindmap },
  computed: {
    ...mapGetters(['getSelectedNode'])
  },
  methods: {
    ...mapActions(['addNode', 'removeNode', 'updateNode']),
    updateNodeLabel(id, label) {
      this.updateNode({ nodeId: id, label });
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
