<template>
  <div class="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-white/60 px-4 py-3 shadow-glass backdrop-blur">
    <span
      v-for="item in total"
      :key="item"
      class="text-xl transition-all duration-300"
      :class="item <= current ? 'scale-110 text-date-pink' : 'scale-90 grayscale opacity-45'"
      aria-hidden="true"
    >
      {{ item <= current ? '❤️' : '○' }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number;
  total: number;
}>();
</script>
