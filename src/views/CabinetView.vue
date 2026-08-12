<script setup lang="ts">
import { computed, ref } from 'vue'
import { lessons, subscriptionBenefits } from '@/data/content'
import { stages } from '@/data/stages'

const activeLessonId = ref(lessons[2].id)
const sidebarOpen = ref(true)

const activeLesson = computed(() => lessons.find((l) => l.id === activeLessonId.value)!)
const stageFilter = ref<string>('red-talisman')

const filteredLessons = computed(() =>
  lessons.filter((l) => l.stageId === stageFilter.value),
)

const progress = computed(() => {
  const stageLessons = lessons.filter((l) => l.stageId === 'red-talisman')
  const done = stageLessons.filter((l) => l.completed).length
  return Math.round((done / stageLessons.length) * 100)
})

const currentStage = computed(() => stages.find((s) => s.id === stageFilter.value))

function selectLesson(id: string, locked: boolean) {
  if (locked) return
  activeLessonId.value = id
}
</script>

<template>
  <div class="cabinet">
    <aside class="sidebar" :class="{ 'sidebar--closed': !sidebarOpen }">
      <div class="sidebar__head">
        <div>
          <p class="sidebar__label">Ваш путь</p>
          <h1 class="sidebar__title">Красный талисман</h1>
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

      <div class="sidebar__progress">
        <div class="sidebar__progress-bar">
          <div class="sidebar__progress-fill" :style="{ width: `${progress}%` }" />
        </div>
        <p>{{ progress }}% бесплатного блока</p>
      </div>

      <div class="sidebar__stages">
        <button
          v-for="s in stages"
          :key="s.id"
          type="button"
          class="sidebar__stage"
          :class="{
            'sidebar__stage--active': stageFilter === s.id,
            'sidebar__stage--locked': s.order > 1,
          }"
          @click="s.order === 1 ? (stageFilter = s.id) : null"
        >
          <span>{{ s.nameCn }}</span>
          <span>{{ s.name }}</span>
        </button>
      </div>

      <ul class="sidebar__lessons">
        <li v-for="lesson in filteredLessons" :key="lesson.id">
          <button
            type="button"
            class="lesson-item"
            :class="{
              'lesson-item--active': activeLessonId === lesson.id,
              'lesson-item--done': lesson.completed,
              'lesson-item--locked': !lesson.free,
            }"
            @click="selectLesson(lesson.id, !lesson.free)"
          >
            <span class="lesson-item__status" aria-hidden="true">
              <template v-if="!lesson.free">鎖</template>
              <template v-else-if="lesson.completed">✓</template>
              <template v-else>○</template>
            </span>
            <span class="lesson-item__body">
              <span class="lesson-item__title">{{ lesson.title }}</span>
              <span class="lesson-item__meta">
                {{ lesson.duration }}
                <template v-if="!lesson.free"> · платный</template>
              </span>
            </span>
          </button>
        </li>
      </ul>

      <div class="sidebar__sub">
        <p class="sidebar__sub-title">Годовая подписка</p>
        <ul>
          <li v-for="b in subscriptionBenefits.slice(0, 3)" :key="b">{{ b }}</li>
        </ul>
        <button type="button" class="btn btn--cinnabar sidebar__sub-btn">Открыть доступ</button>
      </div>
    </aside>

    <section class="player">
      <div class="player__stage-tag">
        {{ currentStage?.nameCn }} · {{ currentStage?.name }}
      </div>

      <div class="player__screen">
        <div class="player__visual" aria-hidden="true">
          <div class="player__orb" />
          <button class="player__play" type="button" aria-label="Воспроизвести">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </button>
        </div>
        <div class="player__bar">
          <div class="player__bar-fill" />
        </div>
      </div>

      <div class="player__info">
        <div class="player__badges">
          <span v-if="activeLesson.free" class="badge badge--free">Бесплатно</span>
          <span v-else class="badge badge--paid">По подписке</span>
          <span class="badge">{{ activeLesson.duration }}</span>
        </div>
        <h2 class="player__title">{{ activeLesson.title }}</h2>
        <p class="player__desc">{{ activeLesson.description }}</p>

        <div class="player__text-block">
          <h3>Текстовая версия</h3>
          <p>
            Культивация — это внутренняя даосская алхимия (нэй дан). На этапе красного талисмана ваша
            задача — подготовить тело и сгустить ци-цзин в объёме, достаточном для начала формирования
            основы. Не торопитесь: качество важнее скорости. Если есть опыт цигун — процесс ускорится;
            если есть проблемы со здоровьем — согласуйте практики с врачом.
          </p>
          <p>
            Следующий шаг после сгущения ци — белая пагода: перестройка природы, смена опоры с ци на цзин.
            Даже в идеальных условиях на это уйдёт не менее девяти лет — но каждый месяц вы будете видеть
            рост культивации в себе и вокруг.
          </p>
        </div>

        <div class="player__actions">
          <button type="button" class="btn btn--ghost">Отметить пройденным</button>
          <button type="button" class="btn btn--gold">Сдать экзамен на уровень</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.cabinet {
  display: grid;
  grid-template-columns: minmax(280px, 340px) 1fr;
  min-height: calc(100dvh - var(--header-h));
  background: var(--ink);
}

.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(230, 223, 210, 0.08);
  background: var(--ink-elevated);
  overflow: hidden;
  transition: width 0.35s var(--ease-out);

  &--closed {
    width: 3.5rem;

    .sidebar__head > div,
    .sidebar__progress,
    .sidebar__stages,
    .sidebar__lessons,
    .sidebar__sub {
      display: none;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.25rem 1.25rem 0.75rem;
  }

  &__label {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.35rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
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
    padding: 0 1.25rem 1rem;

    p {
      margin-top: 0.4rem;
      font-size: 0.75rem;
      color: var(--ash);
    }
  }

  &__progress-bar {
    height: 2px;
    background: rgba(230, 223, 210, 0.1);
  }

  &__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--cinnabar), var(--gold));
    transition: width 0.5s var(--ease-out);
  }

  &__stages {
    display: flex;
    gap: 0.35rem;
    padding: 0 1rem 1rem;
    overflow-x: auto;
  }

  &__stage {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid rgba(230, 223, 210, 0.1);
    font-size: 0.7rem;
    color: var(--ash);
    text-align: left;

    span:first-child {
      font-family: var(--font-cn);
      color: var(--bone-dim);
    }

    &--active {
      border-color: var(--cinnabar);
      color: var(--bone);

      span:first-child {
        color: var(--cinnabar-bright);
      }
    }

    &--locked {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  &__lessons {
    flex: 1;
    overflow-y: auto;
    padding: 0 0.75rem 1rem;
  }

  &__sub {
    padding: 1rem 1.25rem 1.25rem;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
    background: rgba(184, 58, 42, 0.06);

    ul {
      margin: 0.5rem 0 1rem;
    }

    li {
      font-size: 0.8rem;
      color: var(--ash);
      padding: 0.25rem 0;
    }
  }

  &__sub-title {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
  }

  &__sub-btn {
    width: 100%;
    padding: 0.7rem;
    font-size: 0.7rem;
  }
}

.lesson-item {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  text-align: left;
  border-radius: var(--radius-sm);
  transition: background 0.25s;

  &:hover:not(.lesson-item--locked) {
    background: rgba(230, 223, 210, 0.04);
  }

  &--active {
    background: rgba(184, 58, 42, 0.12);
  }

  &--locked {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &__status {
    flex-shrink: 0;
    width: 1.25rem;
    font-family: var(--font-cn);
    font-size: 0.75rem;
    color: var(--ash);
    padding-top: 0.15rem;
  }

  &--done &__status {
    color: var(--jade-bright);
  }

  &--active &__status {
    color: var(--cinnabar-bright);
  }

  &__title {
    display: block;
    font-size: 0.9rem;
    color: var(--bone);
    margin-bottom: 0.15rem;
  }

  &__meta {
    font-size: 0.72rem;
    color: var(--ash);
  }
}

.player {
  padding: 1.5rem 2rem 2.5rem;
  overflow-y: auto;
  max-height: calc(100dvh - var(--header-h));

  &__stage-tag {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--cinnabar-bright);
    margin-bottom: 1rem;
    font-family: var(--font-cn);
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
      radial-gradient(ellipse at 50% 45%, rgba(184, 58, 42, 0.25), transparent 55%),
      radial-gradient(ellipse at 70% 60%, rgba(184, 151, 74, 0.1), transparent 40%),
      linear-gradient(160deg, #12161c, #07090c);
  }

  &__orb {
    position: absolute;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184, 58, 42, 0.4), transparent 70%);
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

  &__bar {
    height: 3px;
    background: rgba(230, 223, 210, 0.08);
  }

  &__bar-fill {
    width: 28%;
    height: 100%;
    background: var(--cinnabar);
  }

  &__badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    margin-bottom: 0.5rem;
  }

  &__desc {
    margin-bottom: 1.5rem;
    max-width: 40rem;
  }

  &__text-block {
    padding: 1.25rem 0;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
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
}

@media (max-width: 900px) {
  .cabinet {
    grid-template-columns: 1fr;
  }

  .sidebar {
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid rgba(230, 223, 210, 0.08);
  }

  .player {
    padding: 1rem 1.25rem 2rem;
    max-height: none;
  }
}
</style>
