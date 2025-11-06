<template>
  <div class="box">
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        top: bubble.y + '%',
        left: bubble.x + '%',
        backgroundColor: bubble.color,
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({ count: Number });

const bubbles = ref([]);

watch(
  () => props.count,
  () => {
    const id = Date.now();
    const x = Math.random() * 90; // % position
    const y = Math.random() * 90;
    const color = `hsl(${Math.random() * 360}, 80%, 60%)`;

    bubbles.value.push({ id, x, y, color });
  }
);
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.bubble {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: wiggle 0.6s ease-out;
}

@keyframes wiggle {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.2) rotate(10deg);
  }
  50% {
    transform: scale(1.1) rotate(-10deg);
  }
  75% {
    transform: scale(1.15) rotate(6deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
