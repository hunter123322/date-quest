<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <span
      v-for="heart in floatingHearts"
      :key="heart.id"
      class="absolute animate-float text-date-pink/45"
      :style="{
        left: `${heart.left}%`,
        top: `${heart.top}%`,
        fontSize: `${heart.size}px`,
        animationDelay: `${heart.delay}s`,
        animationDuration: `${heart.duration}s`,
      }"
    >
      {{ heart.icon }}
    </span>

    <span
      v-for="trail in trailHearts"
      :key="trail.id"
      class="trail-heart fixed text-date-pink"
      :style="{ left: `${trail.x}px`, top: `${trail.y}px` }"
    >
      ♥
    </span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const floatingHearts = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  delay: Math.random() * -8,
  duration: 6 + Math.random() * 7,
  icon: ['♥', '♡', '❤️', '💕'][index % 4],
  left: Math.random() * 100,
  size: 16 + Math.random() * 26,
  top: Math.random() * 100,
}));

const trailHearts = ref<{ id: number; x: number; y: number }[]>([]);
let trailId = 0;
let lastTrailAt = 0;

function addTrailHeart(event: MouseEvent) {
  const now = Date.now();
  if (now - lastTrailAt < 90) {
    return;
  }

  lastTrailAt = now;
  const id = trailId++;
  trailHearts.value.push({
    id,
    x: event.clientX - 6,
    y: event.clientY - 8,
  });

  window.setTimeout(() => {
    trailHearts.value = trailHearts.value.filter((heart) => heart.id !== id);
  }, 850);
}

onMounted(() => {
  window.addEventListener('pointermove', addTrailHeart);
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', addTrailHeart);
});
</script>

<style scoped>
.trail-heart {
  animation: trail-fade 850ms ease-out forwards;
  transform: translateY(0) scale(1);
}

@keyframes trail-fade {
  to {
    opacity: 0;
    transform: translateY(-28px) scale(0.35) rotate(22deg);
  }
}
</style>
