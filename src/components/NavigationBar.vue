<!-- src/components/NavigationBar.vue -->
<template>
    <div class="navigation-bar">
      <button @click="goBack" :disabled="!canGoBack">←</button>
      <span>{{ currentPath }}</span>
      <button @click="goForward" :disabled="!canGoForward">→</button>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  
  export default {
    name: 'NavigationBar',
    computed: {
      ...mapState(['navigationHistory', 'futureHistory', 'currentNodeId']),
      ...mapGetters(['getCurrentPath']),
      canGoBack() {
        return this.navigationHistory.length > 0;
      },
      canGoForward() {
        return this.futureHistory.length > 0;
      },
      currentPath() {
        return this.getCurrentPath;
      }
    },
    methods: {
      ...mapActions(['goBack', 'goForward'])
    }
  };
  </script>
  
  <style scoped>
  .navigation-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f4f4f9;
    border-bottom: 1px solid #ddd;
  }
  button {
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  span {
    flex-grow: 1;
    text-align: center;
  }
  </style>
  