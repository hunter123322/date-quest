<template>
  <button
    type="button"
    class="group rounded-3xl border-2 p-5 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    :class="
      selected
        ? 'border-date-pink bg-date-pink text-white'
        : 'border-white/80 bg-white/70 text-date-text hover:border-date-rose'
    "
    @click="$emit('select')"
  >
    <p class="text-3xl">{{ icon }}</p>
    <p class="mt-3 text-xl font-black">{{ label }}</p>
    <p class="mt-1 text-sm" :class="selected ? 'text-white/85' : 'text-date-text/60'">
      {{ selected ? 'Perfect pick!' : helper }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  select: [];
}>();

withDefaults(
  defineProps<{
    helper?: string;
    icon?: string;
    label: string;
    selected: boolean;
  }>(),
  {
    helper: 'Tap to choose',
    icon: '📅',
  },
);
</script>
