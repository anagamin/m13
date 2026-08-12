<script setup lang="ts">
import type { ProofItem } from '@/data/content'

defineProps<{ item: ProofItem }>()
defineEmits<{ play: [] }>()
</script>

<template>
  <button class="proof" type="button" @click="$emit('play')">
    <div class="proof__media" :class="`proof__media--${item.type}`">
      <span class="proof__icon" aria-hidden="true">
        <svg v-if="item.type === 'video'" width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
        </svg>
        <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 10v4h3l5 4V6L7 10H4zm13.5 2a3.5 3.5 0 00-1.5-2.87v5.74A3.5 3.5 0 0017.5 12z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span class="proof__duration">{{ item.duration }}</span>
      <span v-if="item.free" class="proof__badge">Бесплатно</span>
    </div>
    <div class="proof__body">
      <p class="proof__type">{{ item.type === 'video' ? 'Видео' : 'Аудио' }}</p>
      <h3 class="proof__title">{{ item.title }}</h3>
      <p class="proof__sub">{{ item.subtitle }}</p>
    </div>
  </button>
</template>

<style scoped lang="scss">
.proof {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  transition: transform 0.4s var(--ease-out);

  &:hover {
    transform: translateY(-4px);

    .proof__icon {
      transform: scale(1.08);
      color: var(--gold-bright);
    }

    .proof__media::after {
      opacity: 0.55;
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    background:
      radial-gradient(ellipse at 30% 40%, rgba(184, 58, 42, 0.35), transparent 55%),
      linear-gradient(145deg, #1a222e 0%, #0a0d12 100%);
    border: 1px solid rgba(230, 223, 210, 0.08);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, transparent 40%, rgba(7, 9, 12, 0.7)),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(184, 151, 74, 0.15), transparent 60%);
      opacity: 0;
      transition: opacity 0.4s;
    }

    &--audio {
      background:
        radial-gradient(ellipse at 70% 60%, rgba(61, 107, 90, 0.4), transparent 50%),
        linear-gradient(145deg, #1a222e 0%, #0a0d12 100%);
    }
  }

  &__icon {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(230, 223, 210, 0.25);
    border-radius: 50%;
    color: var(--bone);
    background: rgba(7, 9, 12, 0.45);
    transition: transform 0.35s var(--ease-out), color 0.35s;
    z-index: 1;
  }

  &__duration {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    z-index: 1;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: var(--bone-dim);
    background: rgba(7, 9, 12, 0.7);
    padding: 0.2rem 0.45rem;
  }

  &__badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(184, 151, 74, 0.4);
    padding: 0.25rem 0.5rem;
    background: rgba(7, 9, 12, 0.55);
  }

  &__body {
    padding: 1.15rem 0.15rem 0;
  }

  &__type {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ash);
    margin-bottom: 0.4rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 500;
    color: var(--bone);
    margin-bottom: 0.35rem;
  }

  &__sub {
    font-size: 0.9rem;
    color: var(--ash);
  }
}
</style>
