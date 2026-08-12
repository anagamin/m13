<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  char?: string
  label?: string
}>()
</script>

<template>
  <div class="seal" :class="[`seal--${size || 'md'}`]" :title="label">
    <span class="seal__char">{{ char || '丹' }}</span>
    <span v-if="label" class="seal__ring" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss">
.seal {
  position: relative;
  display: grid;
  place-items: center;
  background: var(--cinnabar);
  color: var(--bone);
  font-family: var(--font-cn);
  border-radius: 2px;
  box-shadow:
    0 0 0 1px rgba(184, 58, 42, 0.4),
    0 8px 32px rgba(184, 58, 42, 0.18);
  animation: seal-breathe 6s ease-in-out infinite;

  &--sm {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }

  &--md {
    width: 4rem;
    height: 4rem;
    font-size: 1.6rem;
  }

  &--lg {
    width: 5.5rem;
    height: 5.5rem;
    font-size: 2.2rem;
  }

  &__ring {
    position: absolute;
    inset: -6px;
    border: 1px solid rgba(184, 58, 42, 0.35);
    border-radius: 3px;
    pointer-events: none;
  }
}
</style>
