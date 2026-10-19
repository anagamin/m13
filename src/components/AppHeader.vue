<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { navItems } from '@/data/site'

defineProps<{ compact?: boolean }>()

const route = useRoute()
const router = useRouter()
const { isAuthenticated, logout } = useAuth()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}

function signOut() {
  logout()
  menuOpen.value = false
  if (route.meta.requiresAuth) router.push('/')
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="header"
    :class="{ 'header--solid': scrolled || compact || menuOpen, 'header--compact': compact }"
  >
    <div class="header__inner">
      <RouterLink to="/" class="logo">
        <span class="logo__seal" aria-hidden="true">m</span>
        <span class="logo__text">
          <span class="logo__brand">m13</span>
          <span class="logo__sub">內丹 · онлайн</span>
        </span>
      </RouterLink>

      <button
        class="burger"
        :class="{ 'burger--open': menuOpen }"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
        <span />
        <span class="sr-only">{{ menuOpen ? 'Закрыть меню' : 'Открыть меню' }}</span>
      </button>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': menuOpen }" aria-label="Основная навигация">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="nav__link"
          :class="{ 'nav__link--active': route.name === item.name }"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          :to="isAuthenticated ? '/cabinet' : '/enter'"
          class="nav__link nav__link--cta"
          :class="{ 'nav__link--active': route.name === 'cabinet' || route.name === 'enter' }"
        >
          Кабинет
        </RouterLink>
        <button v-if="isAuthenticated" class="nav__out" type="button" @click="signOut">Выйти</button>
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

  // Blur lives on a layer behind the bar. backdrop-filter on the header
  // itself would become the containing block for the fixed mobile nav
  // and collapse it to the bar height, so page content covers the menu.
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition:
      background 0.4s var(--ease-out),
      border-color 0.4s var(--ease-out),
      backdrop-filter 0.4s var(--ease-out);
  }

  &--solid::before,
  &--compact::before {
    background: rgba(7, 9, 12, 0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(230, 223, 210, 0.06);
  }

  &__inner {
    position: relative;
    z-index: 1;
    width: min(100% - 2.5rem, var(--max-w));
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 1rem;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: none;

  &__seal {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--bone);
    background: var(--cinnabar);
    border-radius: var(--radius-sm);
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__brand {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--bone);
    line-height: 1;
  }

  &__sub {
    margin-top: 0.2rem;
    font-family: var(--font-cn);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    color: var(--ash);
  }
}

.burger {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  position: relative;

  span:not(.sr-only) {
    position: absolute;
    left: 0.55rem;
    right: 0.55rem;
    height: 1px;
    background: var(--bone);
    transition: transform 0.3s var(--ease-out);
  }

  span:nth-child(1) {
    transform: translateY(-6px);
  }

  span:nth-child(3) {
    transform: translateY(6px);
  }

  &--open span:nth-child(1) {
    transform: rotate(40deg);
  }

  &--open span:nth-child(2) {
    opacity: 0;
  }

  &--open span:nth-child(3) {
    transform: rotate(-40deg);
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.1rem;

  &__link {
    padding: 0.45rem 0.6rem;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--bone-dim);
    white-space: nowrap;

    &:hover,
    &--active {
      color: var(--bone);
    }

    &--cta {
      margin-left: 0.35rem;
      border: 1px solid rgba(184, 58, 42, 0.55);
      color: var(--cinnabar-bright);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 0.72rem;

      &:hover,
      &.nav__link--active {
        background: rgba(184, 58, 42, 0.12);
        color: var(--bone);
      }
    }
  }

  &__out {
    margin-left: 0.35rem;
    padding: 0.45rem 0.55rem;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ash);

    &:hover {
      color: var(--bone);
    }
  }
}

@media (max-width: 1180px) {
  .burger {
    display: grid;
    z-index: 2;
  }

  .logo__sub {
    display: none;
  }

  .nav {
    display: none;
    position: fixed;
    z-index: 1;
    inset: var(--header-h) 0 0;
    padding: 1rem 1.25rem 2rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    background: var(--ink);
    overflow: auto;

    &--open {
      display: flex;
    }

    &__link {
      padding: 0.95rem 0.2rem;
      font-size: 1.15rem;
      border-bottom: 1px solid rgba(230, 223, 210, 0.06);

      &--cta {
        margin: 0.8rem 0 0;
        text-align: center;
        padding: 0.95rem;
      }
    }

    &__out {
      margin: 0.4rem 0 0;
      padding: 0.8rem 0.2rem;
      text-align: left;
      font-size: 0.95rem;
    }
  }
}
</style>
