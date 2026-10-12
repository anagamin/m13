<script setup lang="ts">
defineProps<{
  label: string
  title: string
  lead?: string
  narrow?: boolean
}>()
</script>

<template>
  <header class="page-hero">
    <div :class="narrow ? 'narrow' : 'container'">
      <p class="section-label">{{ label }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="lead" class="page-hero__lead">{{ lead }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-hero {
  padding: var(--space-xl) 0 var(--space-lg);
  background:
    radial-gradient(ellipse at 18% 0%, rgba(184, 58, 42, 0.14), transparent 52%),
    linear-gradient(180deg, var(--ink-elevated), var(--ink));

  &__title {
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    color: var(--bone);
    margin-bottom: 1rem;
  }

  &__lead {
    max-width: 40rem;
    font-size: 1.125rem;
  }
}
</style>
