<template>
  <div class="mx-auto max-w-2xl">
    <div
      ref="cardRef"
      class="relative overflow-hidden rounded-[2.25rem] bg-date-cream p-7 text-date-text shadow-soft sm:p-9"
    >
      <div class="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-date-light/80" />
      <div class="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-date-rose/25" />

      <div class="relative">
        <p class="text-center text-sm font-black uppercase tracking-[0.24em] text-date-pink">
          DATE ACCEPTED ❤️
        </p>
        <h2 class="mt-3 text-center text-4xl font-black sm:text-5xl">Our Date Quest</h2>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <SummaryLine label="Date" :value="payload.date" />
          <SummaryLine label="Time" :value="payload.time" />
          <SummaryLine label="Food" :value="payload.food" />
          <SummaryLine label="Excitement" :value="`${payload.excitement}%`" />
        </div>

        <div class="mt-6 rounded-[1.75rem] bg-gradient-to-r from-date-pink to-date-rose p-5 text-center text-white shadow-lg">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-white/75">Compatibility Meter</p>
          <p class="mt-2 text-5xl font-black">Love Score: {{ payload.loveScore }}%</p>
        </div>

        <div class="mt-6 grid items-center gap-5 sm:grid-cols-[1fr_auto]">
          <div class="rounded-[1.5rem] bg-white/70 p-5">
            <p class="text-2xl font-black">Invitation unlocked ✨</p>
            <p class="mt-2 leading-7 text-date-text/70">
              This card contains all the cute evidence needed for one highly official romantic adventure.
            </p>
          </div>
          <QRCard :payload="payload" @ready="qrDataUrl = $event" />
        </div>
      </div>
    </div>

    <button
      type="button"
      class="mt-6 w-full rounded-full bg-date-pink px-8 py-4 text-lg font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-date-rose disabled:cursor-wait disabled:opacity-70"
      :disabled="isDownloading || !qrDataUrl"
      @click="downloadInvitation"
    >
      {{ isDownloading ? 'Preparing your card...' : 'Download Invitation' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { toPng } from 'html-to-image';
import { ref } from 'vue';
import type { QRPayload } from '../types/date';
import QRCard from './QRCard.vue';

defineProps<{
  payload: QRPayload;
}>();

const cardRef = ref<HTMLElement | null>(null);
const isDownloading = ref(false);
const qrDataUrl = ref('');

async function downloadInvitation() {
  if (!cardRef.value) {
    return;
  }

  isDownloading.value = true;
  try {
    const pngDataUrl = await toPng(cardRef.value, {
      backgroundColor: '#fff7fb',
      cacheBust: true,
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.download = 'date-quest-invitation.png';
    link.href = pngDataUrl;
    link.click();
  } finally {
    isDownloading.value = false;
  }
}
</script>

<script lang="ts">
import { defineComponent, h } from 'vue';

export const SummaryLine = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h('div', { class: 'rounded-[1.5rem] bg-white/75 p-5 shadow-lg' }, [
        h('p', { class: 'text-sm font-black uppercase tracking-[0.18em] text-date-pink' }, props.label),
        h('p', { class: 'mt-2 text-2xl font-black' }, props.value),
      ]);
  },
});
</script>
