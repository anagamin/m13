<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  video: { title: string; src: string } | null
}>()
const emit = defineEmits<{ close: [] }>()

const closeRef = ref<HTMLButtonElement | null>(null)

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.video,
  async (video) => {
    if (video) {
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
    v-if="video"
    class="player"
    role="dialog"
    aria-modal="true"
    aria-label="Просмотр видео"
    @click.self="emit('close')"
  >
    <div class="player__inner">
      <div class="player__bar">
        <button ref="closeRef" class="player__close" type="button" @click="emit('close')">
          Закрыть
        </button>
      </div>
      <div class="player__frame">
        <iframe
          :src="video.src"
          :title="video.title"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          allowfullscreen
        />
      </div>
      <p class="player__title">{{ video.title }}</p>
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
  padding: 1rem;
  background: rgba(7, 9, 12, 0.86);
  backdrop-filter: blur(8px);
  animation: fade-in 0.3s ease;

  &__inner {
    // Ролики библиотеки вертикальные. Ширина от свободной высоты,
    // чтобы кадр 9:16 не сжимался в полоску внутри 16:9.
    width: min(calc(100vw - 2rem), calc((100dvh - 8.5rem) * 9 / 16), 28rem);
    background: var(--ink-soft);
    border: 1px solid rgba(230, 223, 210, 0.1);
    padding: 0.85rem 0.85rem 1.15rem;
  }

  &__bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.55rem;
  }

  &__close {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ash);

    &:hover {
      color: var(--bone);
    }
  }

  &__frame {
    position: relative;
    width: 100%;
    aspect-ratio: 9 / 16;
    background: #05070a;

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  &__title {
    margin-top: 0.85rem;
    color: var(--gold);
    font-family: var(--font-display);
    font-size: 1.35rem;
    line-height: 1.3;
    text-align: center;
  }
}
</style>
