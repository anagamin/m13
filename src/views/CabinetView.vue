<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  examFeeRub,
  practices,
  tierHints,
  tierLabels,
  type Practice,
  type PracticeTier,
} from '@/data/content'
import { stages } from '@/data/stages'

const CORE_TIERS: PracticeTier[] = ['intro', 'early', 'middle', 'late']
const ALL_NAV_TIERS: PracticeTier[] = [...CORE_TIERS, 'extra']

const colorMap: Record<string, string> = {
  cinnabar: 'var(--cinnabar)',
  pagoda: 'var(--pagoda)',
  jade: 'var(--jade-bright)',
  tablet: 'var(--gold)',
}

const stageFilter = ref('red-talisman')
const sidebarOpen = ref(true)
const collapsedTiers = ref<Record<string, boolean>>({})

const stagePractices = computed(() =>
  practices.filter((p) => p.stageId === stageFilter.value),
)

const firstOpen = computed(
  () => stagePractices.value.find((p) => p.access === 'open') ?? stagePractices.value[0],
)

const activePracticeId = ref(firstOpen.value?.id ?? '')

watch(stageFilter, () => {
  activePracticeId.value = firstOpen.value?.id ?? ''
})

const activePractice = computed(
  () => practices.find((p) => p.id === activePracticeId.value) ?? firstOpen.value,
)

const currentStage = computed(() => stages.find((s) => s.id === stageFilter.value)!)

const hasCurriculum = computed(() => stagePractices.value.length > 0)

const coreProgress = computed(() => {
  const core = stagePractices.value.filter((p) => p.tier !== 'extra')
  if (!core.length) return 0
  const done = core.filter((p) => p.completed).length
  return Math.round((done / core.length) * 100)
})

const groupedTiers = computed(() => {
  return ALL_NAV_TIERS.map((tier) => {
    const items = stagePractices.value.filter((p) => p.tier === tier)
    if (!items.length) return null
    return {
      tier,
      label: tierLabels[tier],
      hint: tierHints[tier],
      items,
      done: items.filter((p) => p.completed).length,
      total: items.length,
    }
  }).filter(Boolean) as {
    tier: PracticeTier
    label: string
    hint: string
    items: Practice[]
    done: number
    total: number
  }[]
})

function isTierCollapsed(tier: PracticeTier) {
  const key = `${stageFilter.value}:${tier}`
  if (key in collapsedTiers.value) return collapsedTiers.value[key]
  return tier === 'extra'
}

function toggleTier(tier: PracticeTier) {
  const key = `${stageFilter.value}:${tier}`
  collapsedTiers.value = {
    ...collapsedTiers.value,
    [key]: !isTierCollapsed(tier),
  }
}

function selectStage(id: string) {
  stageFilter.value = id
}

function selectPractice(p: Practice) {
  activePracticeId.value = p.id
}

function statusGlyph(p: Practice) {
  if (p.access === 'purchasable') return '＋'
  if (p.access === 'locked') return '鎖'
  if (p.completed) return '✓'
  return '○'
}
</script>

<template>
  <div class="cabinet">
    <aside class="sidebar" :class="{ 'sidebar--closed': !sidebarOpen }">
      <div class="sidebar__head">
        <div>
          <p class="sidebar__label">Структура обучения</p>
          <h1 class="sidebar__title">4 этапа пути</h1>
        </div>
        <button
          class="sidebar__toggle"
          type="button"
          :aria-label="sidebarOpen ? 'Свернуть' : 'Развернуть'"
          @click="sidebarOpen = !sidebarOpen"
        >
          {{ sidebarOpen ? '‹' : '›' }}
        </button>
      </div>

      <!-- Stage path -->
      <nav class="stage-path" aria-label="Этапы обучения">
        <button
          v-for="(s, i) in stages"
          :key="s.id"
          type="button"
          class="stage-path__item"
          :class="{
            'stage-path__item--active': stageFilter === s.id,
            'stage-path__item--locked': !practices.some((p) => p.stageId === s.id),
          }"
          :style="{ '--stage-color': colorMap[s.color] }"
          @click="selectStage(s.id)"
        >
          <span class="stage-path__rail" aria-hidden="true">
            <span class="stage-path__dot" />
            <span v-if="i < stages.length - 1" class="stage-path__line" />
          </span>
          <span class="stage-path__body">
            <span class="stage-path__order">Этап {{ s.order }}</span>
            <span class="stage-path__cn">{{ s.nameCn }}</span>
            <span class="stage-path__name">{{ s.name }}</span>
          </span>
        </button>
      </nav>

      <div v-if="hasCurriculum" class="sidebar__progress">
        <div class="sidebar__progress-meta">
          <span>{{ currentStage.name }}</span>
          <span>{{ coreProgress }}% основы</span>
        </div>
        <div class="sidebar__progress-bar">
          <div
            class="sidebar__progress-fill"
            :style="{
              width: `${coreProgress}%`,
              background: colorMap[currentStage.color],
            }"
          />
        </div>
      </div>

      <!-- Tier groups -->
      <div v-if="hasCurriculum" class="sidebar__nav">
        <section v-for="group in groupedTiers" :key="group.tier" class="tier">
          <button
            type="button"
            class="tier__head"
            :class="{
              'tier__head--extra': group.tier === 'extra',
              'tier__head--intro': group.tier === 'intro',
            }"
            :aria-expanded="!isTierCollapsed(group.tier)"
            @click="toggleTier(group.tier)"
          >
            <span class="tier__chevron" aria-hidden="true">{{
              isTierCollapsed(group.tier) ? '▸' : '▾'
            }}</span>
            <span class="tier__titles">
              <span class="tier__label">{{ group.label }}</span>
              <span class="tier__hint">{{ group.hint }}</span>
            </span>
            <span class="tier__count">{{ group.done }}/{{ group.total }}</span>
          </button>

          <ul v-show="!isTierCollapsed(group.tier)" class="tier__list">
            <li v-for="p in group.items" :key="p.id">
              <button
                type="button"
                class="practice-item"
                :class="{
                  'practice-item--active': activePracticeId === p.id,
                  'practice-item--done': p.completed,
                  'practice-item--locked': p.access === 'locked',
                  'practice-item--extra': p.access === 'purchasable',
                }"
                :aria-current="activePracticeId === p.id ? 'true' : undefined"
                @click="selectPractice(p)"
              >
                <span class="practice-item__status" aria-hidden="true">{{ statusGlyph(p) }}</span>
                <span class="practice-item__body">
                  <span class="practice-item__title">{{ p.title }}</span>
                  <span class="practice-item__meta">
                    {{ p.duration }}
                    <template v-if="p.access === 'purchasable'"> · доп.</template>
                    <template v-else-if="p.access === 'locked'"> · скоро</template>
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </section>
      </div>

      <div v-else class="sidebar__empty">
        <p>Материалы этапа ещё не опубликованы.</p>
        <p class="sidebar__empty-hint">Доступ откроется после предыдущих экзаменов.</p>
      </div>

      <div v-if="hasCurriculum && currentStage.order <= 2" class="sidebar__exam">
        <p class="sidebar__exam-title">Экзамен на следующий этап</p>
        <p class="sidebar__exam-note">
          Не чаще раза в месяц · запрос {{ examFeeRub.toLocaleString('ru-RU') }}&nbsp;₽
        </p>
        <button type="button" class="btn btn--gold sidebar__exam-btn">Запросить экзамен</button>
      </div>
    </aside>

    <section class="player">
      <template v-if="activePractice && hasCurriculum">
        <div class="player__crumb">
          <span class="player__crumb-stage" :style="{ color: colorMap[currentStage.color] }">
            {{ currentStage.nameCn }} · {{ currentStage.name }}
          </span>
          <span class="player__crumb-sep" aria-hidden="true">/</span>
          <span>{{ tierLabels[activePractice.tier] }}</span>
        </div>

        <div
          class="player__screen"
          :class="{
            'player__screen--locked': activePractice.access === 'locked',
            'player__screen--extra': activePractice.access === 'purchasable',
          }"
        >
          <div class="player__visual" aria-hidden="true">
            <div
              class="player__orb"
              :style="{
                background: `radial-gradient(circle, color-mix(in srgb, ${colorMap[currentStage.color]} 45%, transparent), transparent 70%)`,
              }"
            />
            <button
              v-if="activePractice.access === 'open'"
              class="player__play"
              type="button"
              aria-label="Воспроизвести"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5L8 5.5z" />
              </svg>
            </button>
            <div v-else class="player__lock-msg">
              <p v-if="activePractice.access === 'locked'">Откроется по мере прохождения цепочки</p>
              <p v-else>Дополнительный блок · покупается отдельно</p>
            </div>
          </div>
          <div class="player__bar">
            <div
              class="player__bar-fill"
              :style="{ background: colorMap[currentStage.color] }"
            />
          </div>
        </div>

        <div class="player__info">
          <div class="player__badges">
            <span v-if="activePractice.access === 'open'" class="badge badge--free">Доступно</span>
            <span v-else-if="activePractice.access === 'locked'" class="badge">В цепочке</span>
            <span v-else class="badge badge--paid">Доп. блок</span>
            <span class="badge">{{ activePractice.duration }}</span>
            <span class="badge badge--tier">{{ tierLabels[activePractice.tier] }}</span>
          </div>

          <h2 class="player__title">{{ activePractice.title }}</h2>
          <p class="player__desc">{{ activePractice.description }}</p>

          <div class="player__classify">
            <div class="player__classify-item">
              <span class="player__classify-key">Этап</span>
              <span>{{ currentStage.name }}</span>
            </div>
            <div class="player__classify-item">
              <span class="player__classify-key">Класс</span>
              <span>{{
                activePractice.tier === 'extra'
                  ? 'Дополнительная практика'
                  : activePractice.tier === 'intro'
                    ? 'Вводная'
                    : 'Основная цепочка'
              }}</span>
            </div>
            <div class="player__classify-item">
              <span class="player__classify-key">Формат</span>
              <span>Видео + текст</span>
            </div>
          </div>

          <div class="player__text-block">
            <h3>Текстовая версия</h3>
            <p>{{ activePractice.text }}</p>
          </div>

          <div class="player__actions">
            <button
              v-if="activePractice.access === 'open'"
              type="button"
              class="btn btn--ghost"
            >
              Отметить пройденным
            </button>
            <button
              v-else-if="activePractice.access === 'purchasable'"
              type="button"
              class="btn btn--cinnabar"
            >
              Открыть доп. блок
            </button>
            <button
              v-if="currentStage.order <= 2"
              type="button"
              class="btn btn--gold"
            >
              Сдать экзамен · {{ examFeeRub.toLocaleString('ru-RU') }}&nbsp;₽
            </button>
          </div>
        </div>
      </template>

      <div v-else class="player__placeholder">
        <p class="player__placeholder-cn">{{ currentStage.nameCn }}</p>
        <h2>{{ currentStage.name }}</h2>
        <p>{{ currentStage.summary }}</p>
        <p class="player__placeholder-note">
          Учебные материалы этого этапа появятся после сдачи предыдущих экзаменов.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.cabinet {
  display: grid;
  grid-template-columns: minmax(300px, 380px) 1fr;
  min-height: calc(100dvh - var(--header-h));
  background: var(--ink);
}

.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(230, 223, 210, 0.08);
  background: var(--ink-elevated);
  overflow: hidden;
  max-height: calc(100dvh - var(--header-h));
  transition: width 0.35s var(--ease-out);

  &--closed {
    width: 3.5rem;

    .sidebar__head > div,
    .stage-path,
    .sidebar__progress,
    .sidebar__nav,
    .sidebar__empty,
    .sidebar__exam {
      display: none;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.1rem 1.15rem 0.65rem;
    flex-shrink: 0;
  }

  &__label {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.3rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 500;
  }

  &__toggle {
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(230, 223, 210, 0.15);
    color: var(--ash);
    font-size: 1.1rem;
    line-height: 1;

    &:hover {
      color: var(--bone);
    }
  }

  &__progress {
    padding: 0 1.15rem 0.85rem;
    flex-shrink: 0;
  }

  &__progress-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.72rem;
    color: var(--ash);
    margin-bottom: 0.4rem;
  }

  &__progress-bar {
    height: 2px;
    background: rgba(230, 223, 210, 0.1);
  }

  &__progress-fill {
    height: 100%;
    transition: width 0.5s var(--ease-out);
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding: 0 0.65rem 1rem;
  }

  &__empty {
    flex: 1;
    padding: 1.25rem;
    color: var(--ash);
    font-size: 0.9rem;
  }

  &__empty-hint {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  &__exam {
    flex-shrink: 0;
    padding: 1rem 1.15rem 1.25rem;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
    background: rgba(184, 151, 74, 0.06);
  }

  &__exam-title {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.35rem;
  }

  &__exam-note {
    font-size: 0.78rem;
    color: var(--ash);
    margin-bottom: 0.85rem;
  }

  &__exam-btn {
    width: 100%;
    padding: 0.7rem;
    font-size: 0.7rem;
  }
}

.stage-path {
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0.85rem 0.85rem;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(230, 223, 210, 0.06);

  &__item {
    display: grid;
    grid-template-columns: 1.1rem 1fr;
    gap: 0.65rem;
    text-align: left;
    padding: 0.15rem 0.35rem;
    border-radius: var(--radius-sm);
    transition: background 0.25s;

    &:hover {
      background: rgba(230, 223, 210, 0.04);
    }

    &--active {
      background: color-mix(in srgb, var(--stage-color) 12%, transparent);
    }

    &--locked {
      opacity: 0.5;
    }
  }

  &__rail {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.45rem;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--stage-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--stage-color) 25%, transparent);
    flex-shrink: 0;
  }

  &__item--active &__dot {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--stage-color) 35%, transparent);
  }

  &__line {
    width: 1px;
    flex: 1;
    min-height: 1.1rem;
    margin-top: 0.25rem;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--stage-color) 50%, transparent),
      rgba(230, 223, 210, 0.12)
    );
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    padding: 0.2rem 0 0.55rem;
    min-width: 0;
  }

  &__order {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ash);
  }

  &__cn {
    font-family: var(--font-cn);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    color: var(--stage-color);
  }

  &__name {
    font-size: 0.88rem;
    color: var(--bone);
  }
}

.tier {
  margin-bottom: 0.35rem;

  &__head {
    display: grid;
    grid-template-columns: 1rem 1fr auto;
    gap: 0.5rem;
    align-items: start;
    width: 100%;
    padding: 0.55rem 0.5rem;
    text-align: left;
    border-radius: var(--radius-sm);

    &:hover {
      background: rgba(230, 223, 210, 0.04);
    }

    &--intro .tier__label {
      color: var(--cinnabar-bright);
    }

    &--extra .tier__label {
      color: var(--gold);
    }
  }

  &__chevron {
    color: var(--ash);
    font-size: 0.75rem;
    line-height: 1.4;
  }

  &__label {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bone);
    margin-bottom: 0.15rem;
  }

  &__hint {
    display: block;
    font-size: 0.68rem;
    color: var(--ash);
    line-height: 1.35;
  }

  &__count {
    font-size: 0.68rem;
    color: var(--ash);
    padding-top: 0.1rem;
  }

  &__list {
    padding: 0 0 0.35rem 0.25rem;
  }
}

.practice-item {
  display: flex;
  gap: 0.65rem;
  width: 100%;
  padding: 0.55rem 0.55rem;
  text-align: left;
  border-radius: var(--radius-sm);
  transition: background 0.25s;

  &:hover {
    background: rgba(230, 223, 210, 0.04);
  }

  &--active {
    background: rgba(184, 58, 42, 0.12);
  }

  &--locked {
    opacity: 0.62;
  }

  &--extra {
    opacity: 0.85;
  }

  &__status {
    flex-shrink: 0;
    width: 1.1rem;
    font-family: var(--font-cn);
    font-size: 0.72rem;
    color: var(--ash);
    padding-top: 0.12rem;
  }

  &--done &__status {
    color: var(--jade-bright);
  }

  &--active &__status {
    color: var(--cinnabar-bright);
  }

  &--extra &__status {
    color: var(--gold);
  }

  &__title {
    display: block;
    font-size: 0.86rem;
    color: var(--bone);
    margin-bottom: 0.1rem;
    line-height: 1.35;
  }

  &__meta {
    font-size: 0.7rem;
    color: var(--ash);
  }
}

.player {
  padding: 1.35rem 2rem 2.5rem;
  overflow-y: auto;
  max-height: calc(100dvh - var(--header-h));

  &__crumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ash);
    margin-bottom: 1rem;
  }

  &__crumb-stage {
    font-family: var(--font-cn);
    letter-spacing: 0.14em;
  }

  &__crumb-sep {
    opacity: 0.4;
  }

  &__screen {
    background: #050608;
    border: 1px solid rgba(230, 223, 210, 0.08);
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  &__visual {
    position: relative;
    aspect-ratio: 16 / 9;
    display: grid;
    place-items: center;
    background:
      radial-gradient(ellipse at 50% 45%, rgba(184, 58, 42, 0.18), transparent 55%),
      linear-gradient(160deg, #12161c, #07090c);
  }

  &__orb {
    position: absolute;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    animation: qi-pulse 5s ease-in-out infinite;
  }

  &__play {
    position: relative;
    z-index: 1;
    width: 4.5rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(230, 223, 210, 0.3);
    border-radius: 50%;
    color: var(--bone);
    background: rgba(7, 9, 12, 0.5);
    transition:
      transform 0.3s var(--ease-out),
      border-color 0.3s,
      color 0.3s;

    &:hover {
      transform: scale(1.06);
      border-color: var(--gold);
      color: var(--gold-bright);
    }
  }

  &__lock-msg {
    position: relative;
    z-index: 1;
    max-width: 18rem;
    text-align: center;
    font-size: 0.95rem;
    color: var(--ash);
  }

  &__bar {
    height: 3px;
    background: rgba(230, 223, 210, 0.08);
  }

  &__bar-fill {
    width: 28%;
    height: 100%;
  }

  &__screen--locked &__bar-fill,
  &__screen--extra &__bar-fill {
    width: 0;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    margin-bottom: 0.5rem;
  }

  &__desc {
    margin-bottom: 1.25rem;
    max-width: 40rem;
  }

  &__classify {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding: 0.9rem 0;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
    border-bottom: 1px solid rgba(230, 223, 210, 0.08);
    max-width: 42rem;
  }

  &__classify-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9rem;
    color: var(--bone);
  }

  &__classify-key {
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ash);
  }

  &__text-block {
    padding: 0.5rem 0 0;
    max-width: 42rem;

    h3 {
      font-family: var(--font-body);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 0.85rem;
      font-size: 0.98rem;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  &__placeholder {
    max-width: 36rem;
    padding-top: 3rem;

    h2 {
      font-size: 2.2rem;
      margin: 0.5rem 0 1rem;
    }
  }

  &__placeholder-cn {
    font-family: var(--font-cn);
    letter-spacing: 0.2em;
    color: var(--gold);
  }

  &__placeholder-note {
    margin-top: 1.25rem;
    font-size: 0.9rem;
    color: var(--ash);
  }
}

.badge {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border: 1px solid rgba(230, 223, 210, 0.15);
  color: var(--ash);

  &--free {
    color: var(--jade-bright);
    border-color: rgba(90, 154, 130, 0.4);
  }

  &--paid {
    color: var(--gold);
    border-color: rgba(184, 151, 74, 0.4);
  }

  &--tier {
    color: var(--bone-dim);
  }
}

@media (max-width: 900px) {
  .cabinet {
    grid-template-columns: 1fr;
  }

  .sidebar {
    max-height: 48vh;
    border-right: none;
    border-bottom: 1px solid rgba(230, 223, 210, 0.08);
  }

  .player {
    padding: 1rem 1.25rem 2rem;
    max-height: none;
  }

  .player__classify {
    grid-template-columns: 1fr;
  }
}
</style>
