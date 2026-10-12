<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import CinnabarSeal from '@/components/CinnabarSeal.vue'

const props = defineProps<{ title: string | null }>()
const emit = defineEmits<{ close: [] }>()

const closeRef = ref<HTMLButtonElement | null>(null)

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.title,
  async (title) => {
    if (title) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeRef.value?.focus()
    } else {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    v-if="title"
    class="player"
    role="dialog"
    aria-modal="true"
    aria-label="Просмотр видео"
    @click.self="emit('close')"
  >
    <div class="player__inner">
      <button ref="closeRef" class="player__close" type="button" @click="emit('close')">
        Закрыть
      </button>
      <div class="player__placeholder">
        <CinnabarSeal size="md" char="觀" />
        <p>Видео подключится позже. Сейчас это карточка библиотеки.</p>
        <p class="player__title">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: rgba(7, 9, 12, 0.86);
  backdrop-filter: blur(8px);
  animation: fade-in 0.3s ease;

  &__inner {
    width: min(100% - 2rem, 42rem);
    background: var(--ink-soft);
    border: 1px solid rgba(230, 223, 210, 0.1);
    padding: var(--space-lg);
  }

  &__close {
    float: right;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ash);

    &:hover {
      color: var(--bone);
    }
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 1rem 2rem;
    text-align: center;
    clear: both;
  }

  &__title {
    color: var(--gold);
    font-family: var(--font-display);
    font-size: 1.45rem;
  }
}
</style>
