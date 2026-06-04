<template>
  <main class="romance-gradient relative min-h-screen overflow-hidden px-4 py-6 text-date-text sm:px-6">
    <FloatingHearts />

    <div class="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
      <header v-if="step > 0" class="pb-6">
        <ProgressBar :current="progressStep" :total="5" />
      </header>

      <section class="grid flex-1 place-items-center">
        <Transition name="slide" mode="out-in">
          <div :key="step" class="w-full">
            <section v-if="step === 0" class="mx-auto max-w-3xl text-center">
              <p class="text-6xl sm:text-7xl">💌</p>
              <div class="glass-card mt-6 rounded-[2.5rem] p-8 sm:p-12">
                <p class="text-sm font-black uppercase tracking-[0.24em] text-date-pink">
                  Date Quest
                </p>
                <h1 class="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                  Every great adventure starts
                  <span class="block text-date-pink">with one simple question...</span>
                </h1>
                <button type="button"
                  class="mt-9 rounded-full bg-date-pink px-10 py-5 text-xl font-black text-white shadow-soft transition hover:-translate-y-1 hover:scale-105 hover:bg-date-rose"
                  @click="start">
                  Start ❤️
                </button>
              </div>
            </section>

            <section v-else-if="step === 1" class="mx-auto max-w-4xl text-center">
              <div class="glass-card relative min-h-[31rem] overflow-hidden rounded-[2.5rem] p-8 sm:p-12">
                <div v-for="burst in heartBursts" :key="burst.id" class="pointer-events-none absolute text-5xl"
                  :style="{ left: `${burst.x}%`, top: `${burst.y}%` }">
                  ❤️
                </div>

                <p class="text-6xl">🥺</p>
                <h2 class="mt-5 text-4xl font-black leading-tight text-date-pink sm:text-6xl">
                  HI,
                  <span class="text-rose-500">EMJEY!</span>
                   WILL YOU GO ON A DATE WITH ME?
                </h2>
                <p class="mx-auto mt-4 max-w-xl text-lg text-date-text/70">
                  Tiny official form, enormous emotional stakes. Choose wisely.
                </p>

                <div v-if="!hasAccepted" class="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
                  <button type="button"
                    class="rounded-full bg-date-pink px-12 py-5 text-2xl font-black text-white shadow-soft transition hover:-translate-y-1 hover:scale-110"
                    @click="sayYes">
                    YES ❤️
                  </button>

                  <button type="button"
                    class="rounded-full bg-white px-10 py-5 text-xl font-black text-date-text shadow-lg transition duration-200"
                    :style="noButtonStyle" @click="moveNoButton" @mouseenter="moveNoButton">
                    {{ noButtonLabel }}
                  </button>
                </div>

                <div v-else class="mx-auto mt-9 max-w-xl rounded-[2rem] bg-white/75 p-6 shadow-glass animate-pop">
                  <p class="text-4xl">🎉</p>
                  <p class="mt-3 text-3xl font-black text-date-pink">YAY!! I'M SO EXCITED ❤️</p>
                  <button type="button"
                    class="mt-6 rounded-full bg-date-pink px-9 py-4 text-lg font-black text-white shadow-soft transition hover:-translate-y-1"
                    @click="goNext">
                    Continue →
                  </button>
                </div>
              </div>
            </section>

            <section v-else-if="step === 2" class="mx-auto max-w-5xl">
              <SlideHeader title="When Are You Free?" subtitle="Pick the date and time that feels most magical."
                icon="📅" />

              <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DateCard v-for="date in dateOptions" :key="date.id" :label="date.label"
                  :selected="state.date?.id === date.id" @select="state.date = date" />
              </div>

              <h3 class="mt-9 text-center text-2xl font-black text-date-pink">Preferred Time</h3>
              <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DateCard v-for="time in timeOptions" :key="time.id" helper="A cozy candidate" icon="⏰"
                  :label="time.label" :selected="state.time?.id === time.id" @select="state.time = time" />
              </div>

              <NextButton :disabled="!canContinue" @click="goNext" />
            </section>

            <section v-else-if="step === 3" class="mx-auto max-w-6xl">
              <SlideHeader title="What Are You Feeling?" subtitle="Pick your food vibe" icon="🍽️" />
              <div class="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <FoodCard v-for="food in foodOptions" :key="food.id" :food="food" :selected="state.food?.id === food.id"
                  @select="state.food = food" />
              </div>
              <NextButton :disabled="!canContinue" @click="goNext" />
            </section>

            <section v-else-if="step === 4" class="mx-auto max-w-4xl">
              <SlideHeader title="How Excited Are You?" subtitle="A large heart meter, because science." icon="💗" />
              <ExcitementMeter v-model="state.excitement" class="mt-7" />
              <NextButton @click="goNext" />
            </section>

            <section v-else class="mx-auto max-w-4xl">
              <SlideHeader title="Date Summary" subtitle="Download the official invitation card." icon="💝" />
              <SummaryCard class="mt-7" :payload="qrPayload" />
              <button type="button"
                class="mx-auto mt-5 block rounded-full bg-white/70 px-6 py-3 font-black text-date-pink shadow-lg transition hover:-translate-y-1"
                @click="reset">
                Start Over
              </button>
            </section>
          </div>
        </Transition>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti';
import { computed, defineComponent, h, reactive, ref } from 'vue';
import DateCard from '../components/DateCard.vue';
import ExcitementMeter from '../components/ExcitementMeter.vue';
import FloatingHearts from '../components/FloatingHearts.vue';
import FoodCard from '../components/FoodCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import SummaryCard from '../components/SummaryCard.vue';
import { useDateJourney } from '../composables/useDateJourney';

const {
  acceptDate,
  canContinue,
  dateOptions,
  foodOptions,
  goNext,
  hasAccepted,
  progressStep,
  qrPayload,
  reset,
  start,
  state,
  step,
  timeOptions,
} = useDateJourney();

const noLabels = ['NO 😢', 'NO 🙈', 'NO 🏃', 'NO 💨', 'NO 🫣', 'NOPE 🫠'];
const noButton = reactive({
  x: 0,
  y: 0,
  rotate: 0,
  labelIndex: 0,
});
const heartBursts = ref<{ id: number; x: number; y: number }[]>([]);

const noButtonLabel = computed(() => noLabels[noButton.labelIndex]);
const noButtonStyle = computed(() => ({
  transform: `translate(${noButton.x}px, ${noButton.y}px) rotate(${noButton.rotate}deg)`,
}));

function moveNoButton() {
  noButton.x = Math.round((Math.random() - 0.5) * 360);
  noButton.y = Math.round((Math.random() - 0.5) * 220);
  noButton.rotate = Math.round((Math.random() - 0.5) * 34);
  noButton.labelIndex = (noButton.labelIndex + 1) % noLabels.length;
}

function sayYes() {
  acceptDate();
  confetti({
    particleCount: 130,
    spread: 80,
    origin: { y: 0.64 },
    colors: ['#ff5fa2', '#ffd6e8', '#ff8fab', '#fff7fb'],
  });

  heartBursts.value = Array.from({ length: 14 }, (_, id) => ({
    id,
    x: 18 + Math.random() * 64,
    y: 22 + Math.random() * 54,
  }));

  window.setTimeout(() => {
    heartBursts.value = [];
  }, 900);
}

const SlideHeader = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h('div', { class: 'mx-auto max-w-3xl text-center' }, [
        h('p', { class: 'text-6xl' }, props.icon),
        h('h2', { class: 'mt-4 text-4xl font-black text-date-pink sm:text-5xl' }, props.title),
        h('p', { class: 'mx-auto mt-3 max-w-2xl text-lg text-date-text/70' }, props.subtitle),
      ]);
  },
});

const NextButton = defineComponent({
  emits: ['click'],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    return () =>
      h(
        'button',
        {
          class:
            'mx-auto mt-8 block rounded-full bg-date-pink px-10 py-4 text-lg font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-date-rose disabled:cursor-not-allowed disabled:opacity-45',
          disabled: props.disabled,
          type: 'button',
          onClick: () => emit('click'),
        },
        'Next →',
      );
  },
});
</script>

<style scoped>
.absolute.text-5xl {
  animation: burst-heart 900ms ease-out forwards;
}

@keyframes burst-heart {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.3);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -130%) scale(1.8) rotate(24deg);
  }
}
</style>
