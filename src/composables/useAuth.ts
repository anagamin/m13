import { computed, ref } from 'vue'

export interface SessionUser {
  name: string
  email: string
}

interface StoredUser extends SessionUser {
  password: string
}

const USERS_KEY = 'm13-users'
const SESSION_KEY = 'm13-session'

function readJson<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

const session = ref<SessionUser | null>(readJson<SessionUser | null>(SESSION_KEY, null))

function users(): StoredUser[] {
  return readJson<StoredUser[]>(USERS_KEY, [])
}

export type AuthResult = { ok: true } | { ok: false; message: string }

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function useAuth() {
  const user = computed(() => session.value)
  const isAuthenticated = computed(() => session.value !== null)

  function register(name: string, email: string, password: string): AuthResult {
    const cleanName = name.trim().replace(/\s+/g, ' ')
    const cleanEmail = normalizeEmail(email)

    if (cleanName.length < 2) return { ok: false, message: 'Напишите, как к вам обращаться.' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, message: 'Проверьте адрес почты.' }
    }
    if (password.length < 6) return { ok: false, message: 'Пароль — не короче 6 символов.' }
    if (users().some((item) => item.email === cleanEmail)) {
      return { ok: false, message: 'Такой адрес уже есть. Войдите.' }
    }

    const next: StoredUser = { name: cleanName, email: cleanEmail, password }
    writeJson(USERS_KEY, [...users(), next])
    session.value = { name: next.name, email: next.email }
    writeJson(SESSION_KEY, session.value)
    return { ok: true }
  }

  function login(email: string, password: string): AuthResult {
    const cleanEmail = normalizeEmail(email)
    const found = users().find((item) => item.email === cleanEmail && item.password === password)
    if (!found) return { ok: false, message: 'Неверная почта или пароль.' }
    session.value = { name: found.name, email: found.email }
    writeJson(SESSION_KEY, session.value)
    return { ok: true }
  }

  function logout() {
    session.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { user, isAuthenticated, register, login, logout }
}
