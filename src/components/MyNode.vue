<template>
  <g :transform="`translate(${x}, ${y})`" @dblclick="toggleExpand">
    <circle
      :r="radius"
      :fill="type === 'folder' ? '#87CEEB' : '#FFD700'"
      stroke="black"
    />
    <text x="-10" y="5" class="text-sm">
      <tspan>{{ icon }} </tspan>{{ name }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'MyNode',
  props: {
    id: Number,
    x: Number,
    y: Number,
    name: String,
    type: String,
    radius: {
      type: Number,
      default: 20
    }
  },
  computed: {
    icon() {
      // Choose an icon based on the type
      return this.type === 'folder' ? '📁' : '📄';
    }
  },
  methods: {
    toggleExpand() {
      this.$emit('dblclick', this.id); // Emit event to handle expansion
    }
  }
};
</script>

<style scoped>
circle {
  cursor: pointer;
  transition: fill 0.3s;
}
circle:hover {
  fill: #a0d2eb; /* Slightly different color on hover */
}
text {
  pointer-events: none;
  font-size: 10px;
}
</style>
