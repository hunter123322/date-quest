<template>
  <button
    type="button"
    class="group rounded-[2rem] border-2 p-5 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:rotate-1 hover:shadow-soft"
    :class="
      selected
        ? 'border-date-pink bg-date-pink text-white'
        : 'border-white/80 bg-white/70 text-date-text hover:border-date-rose'
    "
    @click="$emit('select')"
  >
    <div class="flex h-24 items-center justify-center rounded-[1.5rem] bg-white/55 text-6xl transition group-hover:scale-105">
      {{ food.emoji }}
    </div>
    <h3 class="mt-4 text-2xl font-black">{{ food.title }}</h3>
    <p class="mt-2 text-sm leading-6" :class="selected ? 'text-white/85' : 'text-date-text/65'">
      {{ food.description }}
    </p>
  </button>
</template>

<script setup lang="ts">
import type { FoodOption } from '../types/date';

defineEmits<{
  select: [];
}>();

defineProps<{
  food: FoodOption;
  selected: boolean;
}>();
</script>
