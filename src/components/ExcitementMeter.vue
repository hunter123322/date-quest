<template>
  <div class="mx-auto max-w-xl rounded-[2rem] bg-white/65 p-6 shadow-glass backdrop-blur">
    <div class="flex items-center justify-center py-8">
      <div
        class="grid aspect-square place-items-center rounded-full bg-gradient-to-br from-date-pink to-date-rose text-white shadow-soft transition-all duration-300"
        :style="{ width: `${120 + modelValue * 1.45}px`, maxWidth: '260px' }"
      >
        <Heart class="h-16 w-16 fill-current" />
      </div>
    </div>

    <div class="mb-3 flex items-center justify-between text-sm font-bold text-date-text/70">
      <span>0 ❤️</span>
      <span>❤️ 100</span>
    </div>
    <input
      class="accent-date-pink h-3 w-full cursor-pointer"
      type="range"
      min="0"
      max="100"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
    <p class="mt-5 text-center text-2xl font-black text-date-pink">
      Excitement Level: {{ modelValue }}%
    </p>
  </div>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next';

defineEmits<{
  'update:modelValue': [value: number];
}>();

defineProps<{
  modelValue: number;
}>();
</script>
