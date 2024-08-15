// src/utils/layout.js
//import * as d3 from 'd3';
export function calculateCircularLayout(nodes, width, height) {
  const visibleNodes = nodes.filter(node => node.visible !== false);
  const radius = Math.min(width, height) / 2 - 50;
  const angleStep = (2 * Math.PI) / visibleNodes.length;

  visibleNodes.forEach((node, index) => {
    const angle = index * angleStep;
    node.x = width / 2 + radius * Math.cos(angle);
    node.y = height / 2 + radius * Math.sin(angle);
  });

  return nodes;
}
