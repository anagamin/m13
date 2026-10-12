<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { register, login } = useAuth()

const mode = ref<'register' | 'login'>(route.query.mode === 'login' ? 'login' : 'register')
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

function redirectTarget() {
  const value = route.query.redirect
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) return value
  return '/cabinet'
}

function submit() {
  error.value = ''
  const result =
    mode.value === 'register'
      ? register(name.value, email.value, password.value)
      : login(email.value, password.value)
  if (!result.ok) {
    error.value = result.message
    return
  }
  router.push(redirectTarget())
}

function switchMode(next: 'register' | 'login') {
  mode.value = next
  error.value = ''
}
</script>

<template>
  <div class="page enter">
    <div class="container enter__grid">
      <div>
        <p class="section-label">Кабинет</p>
        <h1>{{ mode === 'register' ? 'Начать бесплатно' : 'Войти' }}</h1>
        <p class="enter__lead">
          После регистрации открывается кабинет и первый урок: видео, теория и упражнение. Оплата на
          этом шаге не нужна.
        </p>
        <ol>
          <li>Имя, почта и пароль — только в этом браузере.</li>
          <li>Дальше вы в кабинете, на начале красного талисмана.</li>
          <li>Подписка и отдельные блоки подключаются позже. Сейчас оплата не списывается.</li>
        </ol>
      </div>

      <form class="card" @submit.prevent="submit">
        <div class="card__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'register'"
            :class="{ 'is-on': mode === 'register' }"
            @click="switchMode('register')"
          >
            Регистрация
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'login'"
            :class="{ 'is-on': mode === 'login' }"
            @click="switchMode('login')"
          >
            Вход
          </button>
        </div>

        <label v-if="mode === 'register'">
          <span>Имя</span>
          <input v-model="name" name="name" type="text" autocomplete="name" maxlength="80" />
        </label>
        <label>
          <span>Почта</span>
          <input v-model="email" name="email" type="email" autocomplete="email" maxlength="120" />
        </label>
        <label>
          <span>Пароль</span>
          <input
            v-model="password"
            name="password"
            type="password"
            :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
            maxlength="100"
          />
        </label>

        <p v-if="error" class="card__error" role="alert">{{ error }}</p>

        <button class="btn btn--cinnabar btn--lg" type="submit">
          {{ mode === 'register' ? 'Создать кабинет' : 'Войти в кабинет' }}
        </button>
        <p class="card__hint">
          Прототип: пароль хранится только в вашем браузере и никуда не отправляется.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.enter {
  padding-bottom: var(--space-2xl);

  &__grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-xl);
    align-items: start;
    padding-top: var(--space-xl);
  }

  h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    color: var(--bone);
    margin-bottom: 1rem;
  }

  &__lead {
    font-size: 1.125rem;
    max-width: 34rem;
    margin-bottom: 1.25rem;
  }

  ol {
    list-style: decimal;
    padding-left: 1.2rem;
    max-width: 32rem;
  }

  li {
    margin-top: 0.55rem;
    color: var(--bone-dim);
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: var(--space-lg);
  background: var(--ink-soft);
  border: 1px solid rgba(230, 223, 210, 0.1);

  &__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin-bottom: 0.4rem;

    button {
      padding: 0.7rem 0.5rem;
      border: 1px solid rgba(230, 223, 210, 0.12);
      color: var(--ash);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 0.75rem;

      &.is-on {
        color: var(--bone);
        border-color: var(--gold-dim);
        background: rgba(184, 151, 74, 0.08);
      }
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  span {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ash);
  }

  input {
    width: 100%;
    padding: 0.9rem 0.95rem;
    font: inherit;
    font-size: 1rem;
    color: var(--bone);
    background: var(--ink);
    border: 1px solid rgba(230, 223, 210, 0.16);

    &:focus {
      outline: none;
      border-color: var(--gold);
    }
  }

  &__error {
    color: var(--cinnabar-bright);
    font-size: 0.95rem;
  }

  .btn {
    width: 100%;
    margin-top: 0.35rem;
  }

  &__hint {
    font-size: 0.82rem;
    color: var(--ash);
  }
}

@media (max-width: 860px) {
  .enter__grid {
    grid-template-columns: 1fr;
  }
}
</style>
