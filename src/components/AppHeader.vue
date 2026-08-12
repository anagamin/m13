<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ compact?: boolean }>()

const route = useRoute()
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled || compact, 'header--compact': compact }">
    <div class="header__inner container">
      <RouterLink to="/" class="logo">
        <span class="logo__seal" aria-hidden="true">m</span>
        <span class="logo__text">
          <span class="logo__brand">m13</span>
          <span class="logo__sub">內丹 · онлайн</span>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="Основная навигация">
        <RouterLink to="/" class="nav__link" :class="{ 'nav__link--active': route.name === 'landing' }">
          О пути
        </RouterLink>
        <RouterLink to="/path" class="nav__link" :class="{ 'nav__link--active': route.name === 'path' }">
          Структура знаний
        </RouterLink>
        <RouterLink to="/cabinet" class="nav__link nav__link--cta">Кабинет</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  height: var(--header-h);
  transition:
    background 0.4s var(--ease-out),
    border-color 0.4s var(--ease-out),
    backdrop-filter 0.4s var(--ease-out);

  &--scrolled,
  &--compact {
    background: rgba(7, 9, 12, 0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(230, 223, 210, 0.06);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;

  &__seal {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--bone);
    background: var(--cinnabar);
    border-radius: var(--radius-sm);
    animation: seal-breathe 5s ease-in-out infinite;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  &__brand {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--bone);
  }

  &__sub {
    font-family: var(--font-cn);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    color: var(--ash);
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &__link {
    padding: 0.55rem 1rem;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--bone-dim);
    transition: color 0.3s var(--ease-out);

    &:hover,
    &--active {
      color: var(--bone);
    }

    &--cta {
      margin-left: 0.5rem;
      border: 1px solid rgba(184, 58, 42, 0.55);
      color: var(--cinnabar-bright);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.72rem;
      font-weight: 500;

      &:hover {
        background: rgba(184, 58, 42, 0.12);
        color: var(--bone);
      }
    }
  }
}

@media (max-width: 720px) {
  .logo__sub {
    display: none;
  }

  .nav__link:not(.nav__link--cta) {
    display: none;
  }
}
</style>
