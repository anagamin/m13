<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { energies, stages } from '@/data/stages'

type LevelPopup = 'scheme' | 'review'

const popup = ref<LevelPopup | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)
let popupOpener: HTMLElement | null = null

const popupLabel: Record<LevelPopup, string> = {
  scheme: 'Схема красного талисмана',
  review: 'Обзор красного талисмана',
}

const reviewSrc =
  'https://vkvideo.ru/video_ext.php?oid=-242302356&id=456239018&hash=d52e14999a3d43ae&hd=3'

function openPopup(kind: LevelPopup, event: MouseEvent) {
  popupOpener = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  popup.value = kind
}

function closePopup() {
  popup.value = null
  popupOpener?.focus()
  popupOpener = null
}

function onPopupKey(event: KeyboardEvent) {
  if (event.key === 'Escape') closePopup()
}

watch(popup, async (value) => {
  if (value) {
    window.addEventListener('keydown', onPopupKey)
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeRef.value?.focus()
  } else {
    window.removeEventListener('keydown', onPopupKey)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onPopupKey)
  document.body.style.overflow = ''
})

const colorMap: Record<string, string> = {
  cinnabar: 'var(--cinnabar)',
  pagoda: 'var(--pagoda)',
  jade: 'var(--jade-bright)',
  tablet: 'var(--gold)',
}

const spaces = [
  {
    key: 'earth',
    name: 'Земля',
    term: 'ци',
    text: 'Пространство времени и конкретных объектов: тело, стол, ощущение — всё, что появляется и исчезает.',
  },
  {
    key: 'human',
    name: 'Человек',
    term: 'цзин',
    text: 'Граница между Небом и Землёй. Пространство усилий и перемен — опора и движущее начало культивации.',
  },
  {
    key: 'heaven',
    name: 'Небо',
    term: 'шэнь',
    text: 'Пространство вне времени: чистые структуры, сознание и идеи — природа Духа.',
  },
]
</script>

<template>
  <div class="structure">
    <section class="band" aria-labelledby="path-title">
      <div class="container">
        <div class="path">
          <figure class="path__visual">
            <img
              class="path__image"
              src="/images/learning-path.jpg"
              width="576"
              height="1024"
              alt="Схема пути: красный талисман, белая пагода, зелёная терраса и золотая скрижаль"
            />
          </figure>

          <header class="band__head path__head">
            <p class="section-label">Программа</p>
            <h1 id="path-title" class="section-title">Путь обучения</h1>
          </header>

          <ol class="levels">
            <li
              v-for="stage in stages"
              :key="stage.id"
              class="level"
              :style="{ '--stage-color': colorMap[stage.color] }"
            >
              <span class="level__index" aria-hidden="true">{{ stage.order }}</span>
              <article class="level__card">
                <div class="level__top">
                  <p class="level__seal">{{ stage.nameCn }}</p>
                  <div v-if="stage.id === 'red-talisman'" class="level__links">
                    <button
                      type="button"
                      class="level__link"
                      @click="openPopup('scheme', $event)"
                    >
                      схема
                    </button>
                    <button
                      type="button"
                      class="level__link"
                      @click="openPopup('review', $event)"
                    >
                      обзор
                    </button>
                  </div>
                </div>
                <h2 class="level__name">{{ stage.name }}</h2>
                <p class="level__meta">
                  <em>{{ stage.donghua }}</em>
                  <span>{{ stage.duration }}</span>
                </p>
                <p class="level__summary">{{ stage.summary }}</p>
                <p class="level__outcome">{{ stage.outcome }}</p>
              </article>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section id="spaces" class="band" aria-labelledby="spaces-title">
      <div class="container">
        <header class="band__head">
          <p class="section-label">Основа метода</p>
          <h2 id="spaces-title" class="section-title">Три пространства</h2>
          <p class="section-lead">
            Метод стоит на взаимодействии Земли, Человека и Неба. Из него вырастают девять энергий и
            сама идея эликсира. Опора практики — цзин.
          </p>
        </header>

        <div class="spaces__grid">
          <article
            v-for="space in spaces"
            :key="space.key"
            :class="`spaces__item spaces__item--${space.key}`"
          >
            <p class="spaces__name">{{ space.name }}</p>
            <p class="spaces__term">{{ space.term }}</p>
            <p>{{ space.text }}</p>
          </article>
        </div>
        <p class="spaces__more">
          <a href="#jing">Почему цзин — центр практики</a>
        </p>
      </div>
    </section>

    <section id="nine" class="band band--lift" aria-labelledby="nine-title">
      <div class="container">
        <header class="band__head">
          <p class="section-label">Девять энергий</p>
          <h2 id="nine-title" class="section-title">Матрица взаимодействий</h2>
          <p class="section-lead">
            На взаимодействии трёх пространств рождается идея о девяти энергиях. С разной позиции
            восприятия понимание отличается — ниже опорная схема.
          </p>
        </header>

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
      </div>
    </section>

    <section id="jing" class="band" aria-labelledby="jing-title">
      <div class="container">
        <header class="band__head">
          <p class="section-label">Центр практики</p>
          <h2 id="jing-title" class="section-title">Почему цзин — центр</h2>
          <p class="section-lead">
            Со временем в даосских школах вместо цзин стали развивать ци и читать цзин как сексуальную
            эссенцию. Для культивации опора — цзин, пространство Человека: мера плотности, а не третья
            энергия в очереди.
          </p>
        </header>

        <div class="reading">
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
        </div>
      </div>
    </section>

    <section id="elixir" class="band band--lift" aria-labelledby="elixir-title">
      <div class="container">
        <header class="band__head">
          <p class="section-label">Суть метода</p>
          <h2 id="elixir-title" class="section-title">Создание и усвоение эликсиров</h2>
        </header>
        <div class="reading">
          <p>
            Эликсир — триединство Неба, Земли и Человека: ртуть (материал), сера (направление), киноварь
            (процесс преобразования). Это автономно циркулирующее усилие, способное изменять все свойства
            человека. Познавший эликсир — познал культивацию.
          </p>
        </div>
      </div>
    </section>

    <div
      v-if="popup"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="popupLabel[popup]"
      @click.self="closePopup"
    >
      <div class="lightbox__panel" :class="`lightbox__panel--${popup}`">
        <div class="lightbox__bar">
          <button ref="closeRef" class="lightbox__close" type="button" @click="closePopup">
            Закрыть
          </button>
        </div>
        <img
          v-if="popup === 'scheme'"
          class="lightbox__image"
          src="/images/red-talisman-scheme.jpg"
          alt="Схема красного талисмана"
        />
        <div v-else class="lightbox__frame">
          <iframe
            :src="reviewSrc"
            title="Обзор красного талисмана"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
            frameborder="0"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.structure {
  padding-top: var(--header-h);
}

.band {
  padding: var(--space-2xl) 0;

  &:first-child {
    padding-top: var(--space-xl);
    background:
      radial-gradient(ellipse at 22% 18%, rgba(184, 151, 74, 0.09), transparent 42%),
      radial-gradient(ellipse at 8% 78%, rgba(184, 58, 42, 0.08), transparent 36%);
  }

  &--lift {
    background: rgba(14, 18, 24, 0.5);
  }

  &__head {
    max-width: 42rem;
    margin-bottom: var(--space-lg);

    .section-label {
      margin-bottom: 0.85rem;
    }

    .section-title {
      margin-bottom: 0.85rem;
    }

    .section-lead {
      margin-bottom: 0;
    }
  }
}

#spaces,
#nine,
#jing,
#elixir {
  scroll-margin-top: calc(var(--header-h) + 1.25rem);
}

.spaces {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-lg);
  }

  &__item {
    padding-top: 1.15rem;
    border-top: 2px solid rgba(230, 223, 210, 0.12);

    &--earth {
      border-top-color: var(--cinnabar);
    }

    &--human {
      border-top-color: var(--gold);
    }

    &--heaven {
      border-top-color: var(--jade-bright);
    }
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.7rem;
    color: var(--bone);
    margin-bottom: 0.2rem;
  }

  &__term {
    font-family: var(--font-cn);
    letter-spacing: 0.12em;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  &__more {
    margin-top: var(--space-lg);

    a {
      color: var(--gold);
      border-bottom: 1px solid rgba(184, 151, 74, 0.45);
      font-size: 0.95rem;

      &:hover {
        color: var(--gold-bright);
      }
    }
  }
}

.path {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    'visual head'
    'visual levels';
  column-gap: clamp(1.5rem, 3vw, 3.25rem);
  align-items: start;

  &__head {
    grid-area: head;
    margin-bottom: var(--space-md);
  }

  &__visual {
    grid-area: visual;
    position: sticky;
    top: calc(var(--header-h) + 1rem);
    margin: 0;
    justify-self: start;
    border: 1px solid rgba(201, 168, 76, 0.38);
    background: #05070a;
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.38);
    line-height: 0;
  }

  &__image {
    width: auto;
    height: auto;
    max-width: min(32rem, 40vw);
    max-height: calc(100dvh - var(--header-h) - 2.75rem);
  }
}

.levels {
  grid-area: levels;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin: 0;
  padding: 0 0 0 0.15rem;
  list-style: none;

  &::before {
    content: '';
    position: absolute;
    left: 1.3rem;
    top: 1.4rem;
    bottom: 1.4rem;
    width: 1px;
    background: linear-gradient(
      180deg,
      var(--cinnabar),
      var(--pagoda) 38%,
      var(--jade-bright) 68%,
      var(--gold)
    );
  }
}

.level {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 0.9rem;
  align-items: start;

  &__index {
    position: relative;
    z-index: 1;
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    margin-top: 0.85rem;
    border: 1px solid var(--stage-color);
    background: var(--ink);
    color: var(--stage-color);
    font-family: var(--font-display);
    font-size: 1.15rem;
    line-height: 1;
  }

  &__card {
    padding: 1.15rem 1.25rem 1.2rem;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--stage-color) 9%, transparent), transparent 46%),
      var(--ink-elevated);
    border: 1px solid rgba(230, 223, 210, 0.1);
    border-top: 2px solid var(--stage-color);
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.35rem;
  }

  &__seal {
    font-family: var(--font-cn);
    font-size: 0.95rem;
    letter-spacing: 0.16em;
    color: var(--stage-color);
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-left: auto;
  }

  &__link {
    color: var(--gold);
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    line-height: 1.2;
    border-bottom: 1px solid rgba(184, 151, 74, 0.45);

    &:hover {
      color: var(--gold-bright);
    }
  }

  &__name {
    font-size: clamp(1.45rem, 2vw, 1.85rem);
    color: var(--bone);
    margin-bottom: 0.4rem;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.85rem;

    em {
      font-family: var(--font-display);
      font-style: italic;
      font-size: 1.02rem;
      color: var(--gold);
    }

    span {
      font-size: 0.78rem;
      letter-spacing: 0.04em;
      color: var(--ash);
    }
  }

  &__summary {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  &__outcome {
    margin-top: 0.9rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
    font-family: var(--font-display);
    font-size: 1.2rem;
    line-height: 1.35;
    color: var(--bone);
  }
}

.nine__matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(230, 223, 210, 0.08);
  border: 1px solid rgba(230, 223, 210, 0.08);
}

.nine__cell {
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

.nine__label {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--bone);
}

.nine__flow {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
}

.nine__desc {
  font-size: 0.88rem;
  color: var(--bone-dim);
  line-height: 1.5;
}

.reading {
  max-width: 46rem;
  padding: 1.5rem 1.6rem;
  background: var(--ink-elevated);
  border: 1px solid rgba(230, 223, 210, 0.1);
  border-top: 2px solid var(--gold);

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
    list-style: disc;
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

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(7, 9, 12, 0.88);
  backdrop-filter: blur(8px);
  animation: fade-in 0.3s ease;

  &__panel {
    position: relative;

    &--scheme {
      max-width: min(100%, 72rem);
    }

    &--review {
      width: min(100%, 56rem);
    }
  }

  &__bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.55rem;
  }

  &__close {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ash);

    &:hover {
      color: var(--bone);
    }
  }

  &__image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100dvh - 5rem);
    object-fit: contain;
    border: 1px solid rgba(201, 168, 76, 0.38);
    background: #05070a;
  }

  &__frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #05070a;
    border: 1px solid rgba(230, 223, 210, 0.1);

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
}

@media (max-width: 980px) {
  .path {
    grid-template-columns: 1fr;
    grid-template-areas:
      'head'
      'visual'
      'levels';
    row-gap: var(--space-md);
  }

  .path__visual {
    position: static;
    justify-self: start;
  }

  .path__image {
    max-width: min(100%, 26rem);
    max-height: 78vh;
  }
}

@media (max-width: 900px) {
  .spaces__grid,
  .nine__matrix {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .levels::before {
    left: 1.15rem;
  }

  .level {
    grid-template-columns: 2.15rem minmax(0, 1fr);
    gap: 0.7rem;
  }

  .level__index {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  .reading {
    padding: 1.15rem 1rem;
  }
}
</style>
