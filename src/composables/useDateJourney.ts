import { computed, reactive, ref } from 'vue';
import type { DateJourneyState, FoodOption, JourneyStep, QRPayload } from '../types/date';

export const dateOptions = [
  { id: 'june-15', label: 'June 15' },
  { id: 'june-17', label: 'June 17' },
  { id: 'june-23', label: 'June 23' },
  { id: 'june-30', label: 'June 30' },
];

export const timeOptions = [
  { id: '1-pm', label: '☀️ 1 PM' },
  { id: '3-pm', label: '🌸 3 PM' },
  { id: '5-pm', label: '🌅 5 PM' },
  { id: '7-pm', label: '🌙 7 PM' },
];

export const foodOptions: FoodOption[] = [
  {
    id: 'bicol',
    emoji: '🌶️',
    title: 'Bicol Cuisine',
    description: 'Spicy, warm, and full of flavor',
  },
  {
    id: 'italian',
    emoji: '🍝',
    title: 'Italian',
    description: 'Pasta and romantic conversations',
  },
  {
    id: 'fast-food',
    emoji: '🍔',
    title: 'Fast Food',
    description: 'Simple and fun',
  },
  {
    id: 'street-food',
    emoji: '🌮',
    title: 'Street Food',
    description: 'Adventure in every bite',
  },
  {
    id: 'seafood',
    emoji: '🦐',
    title: 'Seafood',
    description: 'Fresh and exciting',
  },
  {
    id: 'steak',
    emoji: '🥩',
    title: 'Steak',
    description: 'Fancy and unforgettable',
  },
];

const initialState = (): DateJourneyState => ({
  date: null,
  time: null,
  food: null,
  excitement: 87,
  loveScore: 97,
});

export function useDateJourney() {
  const step = ref<JourneyStep>(0);
  const hasAccepted = ref(false);
  const state = reactive<DateJourneyState>(initialState());

  const progressStep = computed(() => Math.max(1, step.value));

  const canContinue = computed(() => {
    if (step.value === 2) {
      return Boolean(state.date && state.time);
    }

    if (step.value === 3) {
      return Boolean(state.food);
    }

    return true;
  });

  const qrPayload = computed<QRPayload>(() => ({
    date: state.date?.label ?? 'Mystery Date',
    time: state.time?.label.replace(/^[^\d]+/, '').trim() ?? 'Surprise Time',
    food: state.food?.title ?? 'Surprise Food',
    excitement: state.excitement,
    loveScore: state.loveScore,
  }));

  function start() {
    step.value = 1;
  }

  function acceptDate() {
    hasAccepted.value = true;
    state.loveScore = Math.floor(Math.random() * 11) + 90;
  }

  function goNext() {
    if (!canContinue.value || step.value >= 5) {
      return;
    }

    step.value = (step.value + 1) as JourneyStep;
  }

  function reset() {
    const freshState = initialState();
    Object.assign(state, freshState);
    step.value = 0;
    hasAccepted.value = false;
  }

  return {
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
    acceptDate,
  };
}
