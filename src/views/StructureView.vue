<script setup lang="ts">
import { computed, ref } from 'vue'
import { approaches, energies, stages } from '@/data/stages'
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
          Три пространства → уровни пути → эликсир. Каркас метода: Земля, Небо и Человек; четыре этапа
          превращений; создание и усвоение эликсиров как суть культивации.
        </p>
      </div>
    </header>

    <!-- Vertical path infographic -->
    <section class="path-map">
      <div class="container">
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
              <ul v-if="active.results?.length">
                <li v-for="r in active.results" :key="r">{{ r }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Timeline comparison with donghua -->
    <section class="compare">
      <div class="container">
        <p class="section-label">Соответствие</p>
        <h2 class="section-title">Этапы пути ↔ ориентиры дунхуа</h2>
        <p class="section-lead">
          Лёгкое сопоставление для ориентира. Сами уровни — конкретные состояния практикующего, а не
          виртуальные ранги.
        </p>

        <div class="compare__table" role="table" aria-label="Сравнение этапов">
          <div class="compare__row compare__row--head" role="row">
            <div role="columnheader">Этап m13</div>
            <div role="columnheader">Ориентир</div>
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

    <!-- Three approaches -->
    <section class="approaches">
      <div class="container">
        <p class="section-label">Подходы</p>
        <h2 class="section-title">Три пути восьми бессмертных</h2>
        <p class="section-lead">
          Процесс культивации един. Подход выбирается по пренатальным особенностям — и в реальности
          пути всегда комбинируются.
        </p>

        <div class="approaches__grid">
          <article v-for="a in approaches" :key="a.id" class="approaches__item">
            <p class="approaches__cn">{{ a.nameCn }}</p>
            <h3 class="approaches__name">{{ a.name }}</h3>
            <p class="approaches__essence">{{ a.essence }}</p>
            <p class="approaches__practice">{{ a.practice }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Nine energies infographic -->
    <section id="nine" class="nine">
      <div class="container">
        <p class="section-label">Девять энергий</p>
        <h2 class="section-title">Матрица взаимодействий</h2>
        <p class="section-lead">
          На взаимодействии трёх пространств рождается идея о девяти энергиях. С разной позиции
          восприятия понимание отличается — ниже опорная схема.
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
            <strong>Подмена цзин на ци.</strong> Если вы посмотрите на иероглиф Цзин (精), он состоит из
            ключа «Зерно» (米) и «Синий» (青). В древности это означало «очищенная субстанция, суть,
            семя».
          </p>
          <p>
            Когда мы говорим «Цзин-Ци», это читается как «Сущность Энергии» — самая плотная,
            концентрированная, первозданная форма Ци. Когда мы говорим «Цзин-Шэнь», это читается как
            «Сущность Духа» — Дух, который обрёл плоть, основу, якорь в материи.
          </p>
          <p>
            Вывод: Цзин — это не третье место в очереди из трёх. Цзин — это мера плотности. Она
            применяется и к Ци (делая её тяжёлой, «свинцовой»), и к Шэнь (делая его стабильным,
            «кристаллическим»).
          </p>
          <p>В классической алхимии есть известная формула:</p>
          <blockquote>
            Цзин — это основа Ци. Без Цзин Ци рассеивается как ветер.<br />
            Ци — это основа Шэнь. Без Ци Шэнь подобен пламени без масла.<br />
            Шэнь — это основа Пустоты. Без Шэнь Пустота остаётся пустым местом, а не источником
            творения.
          </blockquote>
          <p>Если спроецировать это на учение о девяти энергиях:</p>
          <ul>
            <li>
              <strong>Цзин-Ци</strong> — Ци (движение) погружена в Цзин (плотность). Наполнение
              меридианов и фасций. Рождение «ртутного тела».
            </li>
            <li>
              <strong>Цзин-Шэнь</strong> — Шэнь (сознание) схватывается с Цзин (плотностью). Сознание
              перестаёт быть иллюзорным ветром и начинает кристаллизоваться, овеществляться в теле.
              Рождение «киноварного тела» и самой Пилюли.
            </li>
          </ul>
          <p>
            Трактаты («Учжэнь пянь», «Чжун-Люй чуань дао») постоянно твердят: «Чтобы взрастить Шэнь,
            сначала укрепи Цзин».
          </p>
          <p>Если вы начинаете воспринимать Цзин как основу, это кардинально меняет практику:</p>
          <ul>
            <li>
              Вы перестаёте гоняться за «ощущениями» (Ци). Вместо тепла или движения ищете вязкость,
              тяжесть, клейкость (Цзин).
            </li>
            <li>
              Вы перестаёте «воображать» Шэнь. Вместо медитации на абстрактный свет ищете структуру,
              опору, сжатие этого света внутри костей или суставов.
            </li>
          </ul>
          <p>
            Это и есть переход от «воздушной» практики к «свинцовой», о котором говорили мастера.
          </p>
          <p>
            <strong>Важно:</strong> энергии, меридианы и подобные понятия — метафоры. Их не стоит
            воспринимать буквально и строить из них описательную модель. Они нужны, чтобы дать опору
            практике. Реальное понимание вырастает из самой практики.
          </p>
        </aside>
      </div>
    </section>

    <!-- Elixir essence -->
    <section class="elixir">
      <div class="narrow">
        <p class="section-label">Суть метода</p>
        <h2 class="section-title">Создание и усвоение эликсиров</h2>
        <p>
          Эликсир — триединство Неба, Земли и Человека: ртуть (материал), сера (направление), киноварь
          (процесс преобразования). Это автономно циркулирующее усилие, способное изменять все свойства
          человека. Познавший эликсир — познал культивацию.
        </p>
      </div>
    </section>

    <!-- Red talisman / CTA -->
    <section class="red-focus">
      <div class="container red-focus__grid">
        <div>
          <p class="section-label">Старт</p>
          <h2 class="section-title">Красный талисман — ваш первый горизонт</h2>
          <p>
            Базовая схема подготовки: тело как лаборатория, сгущение ци (ци-цзин) и умение перегонять
            энергию. Срок индивидуален — обычно 1–3 года.
          </p>
          <p>
            Онлайн-обучение начинается в личном кабинете. Часть знаний открыта бесплатно. С навыком
            цигун онлайн-экзамен ускорит доступ к следующим уровням.
          </p>
          <RouterLink to="/cabinet" class="btn btn--cinnabar">Открыть обучение</RouterLink>
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
    max-width: 38rem;
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

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  &__outcome p {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--bone);
    line-height: 1.3;
    margin-bottom: 0.5rem;
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
    align-items: start;

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

.approaches {
  padding: var(--space-2xl) 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    margin-top: var(--space-md);
  }

  &__item {
    padding-top: 1rem;
    border-top: 1px solid rgba(230, 223, 210, 0.1);
  }

  &__cn {
    font-family: var(--font-cn);
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    color: var(--cinnabar-bright);
    margin-bottom: 0.35rem;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--bone);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  &__essence {
    font-size: 0.95rem;
    color: var(--bone-dim);
    margin-bottom: 0.85rem;
  }

  &__practice {
    font-size: 0.8rem;
    color: var(--ash);
  }
}

.nine {
  padding: var(--space-2xl) 0;
  background: rgba(14, 18, 24, 0.35);

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
    gap: 0.45rem;
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
    color: var(--bone-dim);
    line-height: 1.5;
  }

  &__note {
    padding: 1.5rem 1.6rem;
    border-left: 2px solid var(--gold);
    background: rgba(184, 151, 74, 0.05);
    max-width: 46rem;

    p + p,
    p + blockquote,
    p + ul,
    blockquote + p,
    ul + p {
      margin-top: 0.9rem;
    }

    blockquote {
      margin: 0;
      padding: 0.85rem 1rem;
      border-left: 2px solid var(--cinnabar);
      color: var(--bone-dim);
      font-style: italic;
      line-height: 1.65;
    }

    ul {
      margin: 0;
      padding-left: 1.2rem;
    }

    li {
      margin-top: 0.55rem;
      color: var(--bone-dim);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    strong {
      color: var(--gold);
      font-weight: 500;
    }
  }
}

.elixir {
  padding: var(--space-xl) 0;
  text-align: center;

  .section-title {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
  }

  p:last-child {
    max-width: 38rem;
    margin-inline: auto;
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
  .compare__row,
  .approaches__grid {
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
