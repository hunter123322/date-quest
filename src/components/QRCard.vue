<template>
  <div class="rounded-[1.5rem] bg-white/80 p-4 text-center shadow-lg">
    <p class="mb-3 text-sm font-black uppercase tracking-[0.18em] text-date-pink">Secret QR</p>
    <img
      v-if="qrDataUrl"
      class="mx-auto h-36 w-36 rounded-2xl bg-white p-2"
      :src="qrDataUrl"
      alt="QR code for date invitation details"
    />
    <div v-else class="mx-auto grid h-36 w-36 place-items-center rounded-2xl bg-date-light/45 text-sm">
      Making magic...
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { ref, watch } from 'vue';
import type { QRPayload } from '../types/date';

const props = defineProps<{
  payload: QRPayload;
}>();

const emit = defineEmits<{
  ready: [dataUrl: string];
}>();

const qrDataUrl = ref('');

watch(
  () => props.payload,
  async (payload) => {
    qrDataUrl.value = await QRCode.toDataURL(JSON.stringify(payload), {
      color: {
        dark: '#3b2c35',
        light: '#fff7fb',
      },
      margin: 1,
      width: 240,
    });
    emit('ready', qrDataUrl.value);
  },
  { deep: true, immediate: true },
);
</script>
