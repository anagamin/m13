<script setup lang="ts">
import { computed, ref } from 'vue'
import { energies, stages } from '@/data/stages'
import type { Stage } from '@/data/stages'

const activeId = ref(stages[0].id)
const active = computed(() => stages.find((s) => s.id === activeId.value) as Stage)

const colorMap: Record<string, string> = {
  cinnabar: 'var(--cinnabar)',
  pagoda: 'var(--pagoda)',
  jade: 'var(--jade-bright)',
  tablet: 'var(--gold)',
}
</script>

<template>
  <div class="structure">
    <header class="structure__hero">
      <div class="container">
        <p class="section-label">Карта знания</p>
        <h1 class="structure__title">Структура пути культивации</h1>
        <p class="structure__lead">
          Четыре глобальных этапа учения бессмертного Чжунли Цюаня и учение о девяти энергиях — каркас
          всей системы INBI.
        </p>
      </div>
    </header>

    <!-- Vertical path infographic -->
    <section class="path-map">
      <div class="container">
        <div class="path-map__track" aria-hidden="true">
          <div class="path-map__line" />
        </div>

        <ol class="path-map__steps">
          <li
            v-for="stage in stages"
            :key="stage.id"
            class="path-map__step"
            :class="{ 'path-map__step--active': activeId === stage.id }"
            :style="{ '--stage-color': colorMap[stage.color] }"
          >
            <button
              type="button"
              class="path-map__node"
              :aria-pressed="activeId === stage.id"
              @click="activeId = stage.id"
            >
              <span class="path-map__seal">{{ stage.nameCn }}</span>
              <span class="path-map__order">Этап {{ stage.order }}</span>
              <span class="path-map__name">{{ stage.name }}</span>
            </button>

            <div class="path-map__bridge">
              <span class="path-map__donghua">≈ {{ stage.donghua }}</span>
            </div>
          </li>
        </ol>

        <article class="path-detail" :style="{ '--stage-color': colorMap[active.color] }">
          <div class="path-detail__head">
            <span class="path-detail__cn">{{ active.nameCn }}</span>
            <h2>{{ active.name }}</h2>
            <p class="path-detail__meta">
              Соотносится с: <em>{{ active.donghua }}</em> · {{ active.duration }}
            </p>
          </div>
          <p class="path-detail__summary">{{ active.summary }}</p>
          <div class="path-detail__cols">
            <div>
              <h3>Практики и направления</h3>
              <ul>
                <li v-for="p in active.practices" :key="p">{{ p }}</li>
              </ul>
            </div>
            <div class="path-detail__outcome">
              <h3>Итог этапа</h3>
              <p>{{ active.outcome }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Timeline comparison with donghua -->
    <section class="compare">
      <div class="container">
        <p class="section-label">Соответствие</p>
        <h2 class="section-title">Реальный путь ↔ уровни дунхуа</h2>

        <div class="compare__table" role="table" aria-label="Сравнение этапов">
          <div class="compare__row compare__row--head" role="row">
            <div role="columnheader">Этап INBI</div>
            <div role="columnheader">В дунхуа</div>
            <div role="columnheader">Суть</div>
          </div>
          <div
            v-for="stage in stages"
            :key="stage.id"
            class="compare__row"
            role="row"
            :style="{ '--stage-color': colorMap[stage.color] }"
          >
            <div role="cell">
              <span class="compare__dot" />
              {{ stage.name }}
            </div>
            <div role="cell">{{ stage.donghua }}</div>
            <div role="cell">{{ stage.outcome }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nine energies infographic -->
    <section class="nine">
      <div class="container">
        <p class="section-label">Девять энергий</p>
        <h2 class="section-title">Матрица превращений</h2>
        <p class="section-lead">
          Три сокровища — ци, цзин, шэнь — и девять направлений их взаимодействия. Начало практики —
          ци-цзин, сгущение эссенции.
        </p>

        <div class="nine__matrix" role="list">
          <div
            v-for="(e, i) in energies"
            :key="e.label"
            class="nine__cell"
            role="listitem"
            :class="{ 'nine__cell--focus': e.label === 'ци-цзин' }"
            :style="{ animationDelay: `${i * 0.05}s` }"
          >
            <span class="nine__label">{{ e.label }}</span>
            <span class="nine__flow">{{ e.from }} → {{ e.to }}</span>
            <span class="nine__desc">{{ e.desc }}</span>
          </div>
        </div>

        <aside class="nine__note">
          <p>
            <strong>Важно:</strong> в эпоху расцвета практик цзин стояла выше ци. Сейчас — наоборот: многие
            знания утеряны или переформатированы. Мы возвращаем прямое понимание ци как эссенции.
          </p>
        </aside>
      </div>
    </section>

    <!-- Red talisman deep dive -->
    <section class="red-focus">
      <div class="container red-focus__grid">
        <div>
          <p class="section-label">Старт</p>
          <h2 class="section-title">Красный талисман — ваш первый горизонт</h2>
          <p>
            Основной этап для начала практикования. Огромное количество практик, направлений и задач:
            подготовить тело и сгустить ци. Срок — от года до многих лет: зависят способности и здоровье.
          </p>
          <p>
            Мужчина 30–40 лет без проблем со здоровьем может пройти этап за год. С навыком цигун — быстрее.
            Для ускорения доступа к следующим уровням — онлайн-экзамен.
          </p>
          <RouterLink to="/cabinet" class="btn btn--cinnabar">Открыть бесплатные уроки</RouterLink>
        </div>
        <div class="red-focus__visual" aria-hidden="true">
          <div class="red-focus__ring" />
          <div class="red-focus__ring red-focus__ring--2" />
          <span class="red-focus__glyph">赤符</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.structure {
  padding-top: var(--header-h);

  &__hero {
    padding: var(--space-xl) 0 var(--space-lg);
    background:
      radial-gradient(ellipse at 20% 0%, rgba(184, 58, 42, 0.12), transparent 50%),
      linear-gradient(180deg, var(--ink-elevated), var(--ink));
  }

  &__title {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
  }

  &__lead {
    max-width: 36rem;
    font-size: 1.1rem;
  }
}

.path-map {
  padding: var(--space-xl) 0;
  position: relative;

  &__steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    margin-bottom: var(--space-lg);
    position: relative;
  }

  &__step {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__node {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    width: 100%;
    padding: 1.25rem 1rem;
    border: 1px solid rgba(230, 223, 210, 0.1);
    background: var(--ink-elevated);
    transition:
      border-color 0.35s,
      background 0.35s,
      transform 0.35s var(--ease-out);

    &:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--stage-color) 50%, transparent);
    }
  }

  &__step--active .path-map__node {
    border-color: var(--stage-color);
    background: color-mix(in srgb, var(--stage-color) 10%, var(--ink-elevated));
  }

  &__seal {
    font-family: var(--font-cn);
    font-size: 1.5rem;
    color: var(--stage-color);
    letter-spacing: 0.12em;
  }

  &__order {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ash);
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--bone);
  }

  &__bridge {
    padding-left: 0.25rem;
  }

  &__donghua {
    font-size: 0.8rem;
    color: var(--ash);
    font-style: italic;
  }
}

.path-detail {
  padding: var(--space-lg);
  border: 1px solid color-mix(in srgb, var(--stage-color) 35%, transparent);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--stage-color) 8%, transparent), transparent 50%),
    var(--ink-soft);
  animation: fade-up 0.5s var(--ease-out);

  &__cn {
    font-family: var(--font-cn);
    font-size: 0.9rem;
    letter-spacing: 0.2em;
    color: var(--stage-color);
  }

  h2 {
    font-size: 2rem;
    margin: 0.35rem 0 0.5rem;
  }

  &__meta {
    font-size: 0.9rem;
    color: var(--gold);
    margin-bottom: 1rem;

    em {
      font-family: var(--font-display);
      font-style: italic;
    }
  }

  &__summary {
    margin-bottom: 1.5rem;
    max-width: 40rem;
  }

  &__cols {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: var(--space-lg);

    h3 {
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ash);
      margin-bottom: 0.75rem;
      font-family: var(--font-body);
      font-weight: 500;
    }

    li {
      padding: 0.45rem 0;
      border-bottom: 1px solid rgba(230, 223, 210, 0.06);
      color: var(--bone-dim);
      font-size: 0.95rem;
    }
  }

  &__outcome p {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--bone);
    line-height: 1.3;
  }
}

.compare {
  padding: var(--space-2xl) 0;
  background: rgba(14, 18, 24, 0.5);

  &__table {
    margin-top: var(--space-md);
    border: 1px solid rgba(230, 223, 210, 0.08);
  }

  &__row {
    display: grid;
    grid-template-columns: 1.1fr 1.3fr 1fr;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    border-bottom: 1px solid rgba(230, 223, 210, 0.06);
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    &--head {
      font-size: 0.7rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--ash);
      background: var(--ink-elevated);
    }
  }

  &__dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 0.6rem;
    background: var(--stage-color);
    vertical-align: middle;
  }
}

.nine {
  padding: var(--space-2xl) 0;

  &__matrix {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(230, 223, 210, 0.08);
    border: 1px solid rgba(230, 223, 210, 0.08);
    margin-bottom: var(--space-lg);
  }

  &__cell {
    background: var(--ink);
    padding: 1.35rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    animation: fade-up 0.6s var(--ease-out) both;
    transition: background 0.3s;

    &:hover {
      background: var(--ink-soft);
    }

    &--focus {
      background: rgba(184, 58, 42, 0.12);
      outline: 1px solid rgba(184, 58, 42, 0.4);
      outline-offset: -1px;
      z-index: 1;
    }
  }

  &__label {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--bone);
  }

  &__flow {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }

  &__desc {
    font-size: 0.88rem;
    color: var(--ash);
  }

  &__note {
    padding: 1.25rem 1.5rem;
    border-left: 2px solid var(--gold);
    background: rgba(184, 151, 74, 0.05);

    strong {
      color: var(--gold);
      font-weight: 500;
    }
  }
}

.red-focus {
  padding: 0 0 var(--space-2xl);

  &__grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-xl);
    align-items: center;
    padding: var(--space-xl);
    background:
      radial-gradient(ellipse at 90% 50%, rgba(184, 58, 42, 0.2), transparent 55%),
      var(--ink-soft);
    border: 1px solid rgba(184, 58, 42, 0.2);

    p {
      margin-bottom: 1rem;
    }

    .btn {
      margin-top: 0.5rem;
    }
  }

  &__visual {
    position: relative;
    height: 16rem;
    display: grid;
    place-items: center;
  }

  &__ring {
    position: absolute;
    width: 10rem;
    height: 10rem;
    border: 1px solid rgba(184, 58, 42, 0.45);
    border-radius: 50%;
    animation: qi-pulse 6s ease-in-out infinite;

    &--2 {
      width: 14rem;
      height: 14rem;
      border-color: rgba(184, 58, 42, 0.2);
      animation-delay: -2s;
    }
  }

  &__glyph {
    font-family: var(--font-cn);
    font-size: 2.5rem;
    letter-spacing: 0.3em;
    color: var(--cinnabar-bright);
    z-index: 1;
  }
}

@media (max-width: 900px) {
  .path-map__steps {
    grid-template-columns: 1fr 1fr;
  }

  .path-detail__cols,
  .red-focus__grid,
  .compare__row {
    grid-template-columns: 1fr;
  }

  .compare__row--head {
    display: none;
  }

  .nine__matrix {
    grid-template-columns: 1fr;
  }
}
</style>
