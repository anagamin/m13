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
      <button ref="closeRef" class="player__close" type="button" @click="emit('close')">
        Закрыть
      </button>
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
  background: rgba(7, 9, 12, 0.86);
  backdrop-filter: blur(8px);
  animation: fade-in 0.3s ease;

  &__inner {
    width: min(100% - 2rem, 64rem);
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

  &__frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    clear: both;

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  &__title {
    margin-top: 1rem;
    color: var(--gold);
    font-family: var(--font-display);
    font-size: 1.45rem;
    text-align: center;
    clear: both;
  }
}
</style>
