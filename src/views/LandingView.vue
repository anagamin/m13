<script setup lang="ts">
import { ref } from 'vue'
import CinnabarSeal from '@/components/CinnabarSeal.vue'
import ProofCard from '@/components/ProofCard.vue'
import StagePreview from '@/components/StagePreview.vue'
import { proofs, subscriptionBenefits } from '@/data/content'
import { approaches, stages } from '@/data/stages'

const activeProof = ref<string | null>(null)

function openProof(id: string) {
  activeProof.value = id
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
  <div class="landing">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__atmosphere" aria-hidden="true">
        <img
          class="hero__bg"
          src="/hero-cultivation-bg.png"
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchpriority="high"
        />
        <div class="hero__veil" />
        <div class="hero__mist hero__mist--1" />
        <div class="hero__mist hero__mist--2" />
      </div>

      <div class="hero__content container">
        <p class="hero__brand reveal">m13 · 內丹 · онлайн-школа</p>
        <h1 class="hero__title reveal reveal-delay-1">
          Устная передача<br />
          <span>культивации</span>
        </h1>
        <p class="hero__lead reveal reveal-delay-2">
          Онлайн-обучение методу культивации (внутренней алхимии) древнего Китая — через практику, а не
          через описания. Всё проходит в личном кабинете.
        </p>
        <div class="hero__cta reveal reveal-delay-3">
          <RouterLink to="/cabinet" class="btn btn--cinnabar">Начать онлайн-обучение</RouterLink>
          <RouterLink to="/path" class="btn btn--ghost">Структура пути</RouterLink>
        </div>
      </div>
    </section>

    <!-- Кто мы -->
    <section class="who">
      <div class="container who__grid">
        <div class="who__seal-wrap reveal">
          <CinnabarSeal size="lg" char="傳" label="Передача" />
        </div>
        <div class="who__text">
          <p class="section-label">Кто мы</p>
          <h2 class="section-title">Носители устной традиции культивации</h2>
          <p class="section-lead">
            Наш метод основан на устной передаче традиции культивации (внутренней алхимии) древнего
            Китая. В основе лежат Школы Небесных Наставников (天師道) и Школа Высшей Чистоты (上清).
            Также используется учение о девяти сокровищах.
          </p>
          <p>
            Ещё одна опора — учение о восьми бессмертных: каждый представляет свой подход к практике.
            Реальная практика — совмещение всех подходов в соответствии с особенностями организма
            отдельного практикующего. Мы открываем часть системы
            <strong>бесплатно</strong> — чтобы вы поняли, ваше это или нет. В память об Учителе.
          </p>
        </div>
      </div>
    </section>

    <!-- Что делаем -->
    <section class="what">
      <div class="narrow">
        <p class="section-label">Что мы делаем</p>
        <h2 class="section-title">Передаём метод через практику</h2>
        <p class="section-lead">
          В древности обучение шло от практики, а не от теории. Ученику давали последовательность — и он
          должен был точно повторить её за мастером. Лишь по мере наработки в нём зарождалось понимание,
          которое затем раскрывали метафорами и принципами.
        </p>
        <div class="what__body">
          <p>
            Задача всех последовательностей — ухватить принцип, начать им пользоваться и встроить его в
            своё развитие. Каждая последовательность вскрывает один или несколько принципов.
          </p>
          <p>
            Наша задача — дать вам эти практики. Ваша — начать их повторять, постепенно раскрывая
            понимание и мир дунхуа. А поскольку вы уже увлекаетесь дунхуа и понимаете метафоры и образы,
            ликбез «что такое культивация» вам не нужен.
          </p>
          <p>
            Сам метод находится за пределами понимания человеческого мозга. Его описание возможно лишь
            через метафоры — образы, которые помогают объять необъятное и построить практику.
            «Дракон обнимает жемчужину», энергии, меридианы, дворцы мозга не стоит воспринимать буквально
            и строить из них описательную модель. Реальное понимание вырастает из практики.
          </p>
        </div>
      </div>
    </section>

    <!-- К чему стремимся -->
    <section class="aim">
      <div class="container aim__inner">
        <div>
          <p class="section-label">К чему стремимся</p>
          <h2 class="section-title">Цель — за гранью метафоры бессмертия</h2>
          <p class="section-lead">
            Даже декларируемая цель — бессмертие — лишь образ. В реальности цель культивации лежит за гранью
            жизни и смерти, пространства и времени, и недоступна для описания.
          </p>
          <p>
            Как говорил Лао-цзы: Дао рождает одно, одно — два, два — три, три — десять тысяч вещей.
            Практикующий идёт обратным путём: десять тысяч → три → два → один → пустота — чтобы запустить
            «дыхание Дао». Процесс культивации бесконечен.
          </p>
        </div>
        <ol class="aim__steps" aria-label="Обратный путь культивации">
          <li><span>10 000</span> гармония перемен</li>
          <li><span>3</span> три опоры</li>
          <li><span>2</span> новое тело и сознание</li>
          <li><span>1</span> бессмертный зародыш</li>
          <li><span>∅</span> новое пространство</li>
        </ol>
      </div>
    </section>

    <!-- Три пространства -->
    <section class="spaces">
      <div class="container">
        <p class="section-label">Основа метода</p>
        <h2 class="section-title">Три пространства</h2>
        <p class="section-lead">
          Метод основан на взаимодействии Земли, Неба и Человека. Из этого взаимодействия рождается
          учение о девяти энергиях — и сама идея эликсира.
        </p>
        <div class="spaces__grid">
          <article
            v-for="s in spaces"
            :key="s.key"
            class="spaces__item"
            :class="`spaces__item--${s.key}`"
          >
            <p class="spaces__name">{{ s.name }}</p>
            <p class="spaces__term">{{ s.term }}</p>
            <p class="spaces__text">{{ s.text }}</p>
          </article>
        </div>
        <aside class="spaces__note">
          <p>
            Со временем в даосских школах произошла подмена: вместо развития
            <strong>цзин</strong> стали развивать уровень <strong>ци</strong>, а цзин воспринимать
            лишь как сексуальную эссенцию. Так практика привязалась к земному уровню — и утратила
            способность выйти за его предел. Для культивации опора — именно цзин, пространство Человека.
          </p>
          <RouterLink to="/path#nine">Как цзин — мера плотности →</RouterLink>
        </aside>
      </div>
    </section>

    <!-- Уровни пути -->
    <section class="path-preview">
      <div class="container">
        <p class="section-label">Уровни пути</p>
        <h2 class="section-title">Четыре этапа культивации</h2>
        <p class="section-lead">
          Это не виртуальные ранги, а конкретные состояния практикующего — от подготовки к культивации до
          рождения бессмертного зародыша.
        </p>

        <div class="path-preview__list">
          <StagePreview v-for="stage in stages" :key="stage.id" :stage="stage" />
        </div>

        <div class="path-preview__action">
          <RouterLink to="/path" class="btn btn--gold">Смотреть структуру пути →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Три подхода -->
    <section class="paths">
      <div class="container">
        <p class="section-label">Подходы</p>
        <h2 class="section-title">Три пути восьми бессмертных</h2>
        <p class="section-lead">
          Процесс культивации един, но подход зависит от пренатальных особенностей. В реальности пути
          всегда комбинируются.
        </p>
        <div class="paths__grid">
          <article v-for="a in approaches" :key="a.id" class="paths__item">
            <p class="paths__cn">{{ a.nameCn }}</p>
            <h3 class="paths__name">{{ a.name }}</h3>
            <p class="paths__essence">{{ a.essence }}</p>
            <p class="paths__practice">{{ a.practice }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Proofs -->
    <section class="proofs" id="proofs">
      <div class="container">
        <p class="section-label">Подтверждения</p>
        <h2 class="section-title">Живые знания по культивации (внутренней алхимии)</h2>
        <p class="section-lead">
          Видео и аудио, по которым видно: за проектом — серьёзная основа, история передачи и измеримый
          результат практики.
        </p>

        <div class="proofs__grid">
          <ProofCard
            v-for="item in proofs"
            :key="item.id"
            :item="item"
            @play="openProof(item.id)"
          />
        </div>

        <div v-if="activeProof" class="proofs__player" role="dialog" aria-label="Просмотр материала">
          <div class="proofs__player-inner">
            <button class="proofs__close" type="button" @click="activeProof = null">Закрыть</button>
            <div class="proofs__placeholder">
              <CinnabarSeal size="md" char="證" />
              <p>Плеер MVP — контент подключится на следующем этапе</p>
              <p class="proofs__id">{{ proofs.find((p) => p.id === activeProof)?.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Safety -->
    <section class="safety">
      <div class="narrow">
        <p class="section-label">Техника безопасности</p>
        <h2 class="section-title">Первое правило — не навреди</h2>
        <p>
          Чтобы формировать основу, вы должны быть в хорошей форме, здоровы и полны энергии. При серьёзных
          проблемах со здоровьем согласуйте практики с лечащим врачом.
        </p>
      </div>
    </section>

    <!-- Offer / CTA to cabinet -->
    <section class="offer">
      <div class="container offer__grid">
        <div>
          <p class="section-label">Старт обучения</p>
          <h2 class="section-title">Часть знаний — бесплатно. Глубина — в кабинете.</h2>
          <p class="section-lead">
            Онлайн-школа: зарегистрируйтесь в личном кабинете — там начинается само обучение.
            Попробуйте. Поймите, ваше ли это. Затем — платные уровни и годовая подписка.
          </p>
          <ul class="offer__list">
            <li v-for="b in subscriptionBenefits" :key="b">{{ b }}</li>
          </ul>
          <p class="offer__instructor">
            Дойдя до определённых уровней, вы можете присоединиться к команде как инструктор.
          </p>
        </div>
        <div class="offer__panel">
          <p class="offer__tier">Онлайн · личный кабинет</p>
          <p class="offer__price">Обучение</p>
          <p class="offer__note">Бесплатный вход · подписка подключится позже</p>
          <RouterLink to="/cabinet" class="btn btn--cinnabar offer__btn">Войти в кабинет</RouterLink>
          <p class="offer__exam">
            Есть опыт цигун? Онлайн-экзамен ускорит доступ к следующим уровням.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  padding: calc(var(--header-h) + 2rem) 0 5rem;
  overflow: hidden;

  &__atmosphere {
    position: absolute;
    inset: 0;
    background: var(--ink);
  }

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 68% center;
    opacity: 0.72;
    filter: saturate(0.85) brightness(0.78) contrast(1.05);
  }

  &__veil {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(7, 9, 12, 0.35) 0%, rgba(7, 9, 12, 0.45) 42%, rgba(7, 9, 12, 0.94) 100%),
      linear-gradient(90deg, rgba(7, 9, 12, 0.72) 0%, rgba(7, 9, 12, 0.35) 42%, rgba(7, 9, 12, 0.18) 100%),
      radial-gradient(ellipse 55% 45% at 78% 28%, rgba(184, 151, 74, 0.08), transparent 60%),
      radial-gradient(ellipse 50% 40% at 18% 72%, rgba(61, 107, 90, 0.08), transparent 55%);
    pointer-events: none;
  }

  &__mist {
    position: absolute;
    inset: 30% -10% 10%;
    background: radial-gradient(ellipse at center, rgba(230, 223, 210, 0.05), transparent 70%);
    animation: mist-drift 18s ease-in-out infinite;
    pointer-events: none;

    &--2 {
      inset: 45% -5% 5%;
      animation-delay: -7s;
      animation-duration: 24s;
      opacity: 0.65;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 40rem;
  }

  &__brand {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--bone);
    margin-bottom: 1.25rem;
  }

  &__title {
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 500;
    color: var(--bone);
    margin-bottom: 1.25rem;

    span {
      color: var(--gold-bright);
      font-style: italic;
    }
  }

  &__lead {
    font-size: 1.125rem;
    max-width: 34rem;
    margin-bottom: 2rem;
    color: var(--bone-dim);
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }
}

.who {
  padding: var(--space-2xl) 0;
  border-top: 1px solid rgba(230, 223, 210, 0.06);

  &__grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  &__seal-wrap {
    padding-top: 0.5rem;
  }

  strong {
    color: var(--gold);
    font-weight: 500;
  }
}

.what {
  padding: var(--space-xl) 0 var(--space-2xl);
  text-align: center;

  .section-title {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
  }

  .section-lead {
    margin-inline: auto;
  }

  &__body {
    max-width: 40rem;
    margin: 1rem auto 0;
    text-align: left;

    p + p {
      margin-top: 1rem;
    }
  }
}

.aim {
  padding: var(--space-2xl) 0;
  background: linear-gradient(180deg, rgba(14, 18, 24, 0.6), transparent);

  &__inner {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-xl);
    align-items: center;
  }

  &__steps {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 1px solid rgba(184, 151, 74, 0.25);

    li {
      display: flex;
      align-items: baseline;
      gap: 1rem;
      padding: 0.85rem 0 0.85rem 1.25rem;
      color: var(--bone-dim);
      font-size: 0.98rem;
      border-bottom: 1px solid rgba(230, 223, 210, 0.06);

      &:last-child {
        border-bottom: none;
      }

      span {
        font-family: var(--font-display);
        font-size: 1.15rem;
        color: var(--gold);
        min-width: 3.5rem;
      }
    }
  }
}

.spaces {
  padding: var(--space-2xl) 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    margin-top: var(--space-md);
  }

  &__item {
    padding-top: 1.25rem;
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
    font-size: 1.5rem;
    color: var(--bone);
    margin-bottom: 0.25rem;
  }

  &__term {
    font-family: var(--font-cn);
    font-size: 0.95rem;
    letter-spacing: 0.12em;
    color: var(--gold);
    margin-bottom: 0.85rem;
  }

  &__text {
    font-size: 0.95rem;
    color: var(--bone-dim);
  }

  &__note {
    margin-top: var(--space-lg);
    padding: 1.25rem 0 0;
    border-top: 1px solid rgba(184, 151, 74, 0.22);
    max-width: 42rem;

    p {
      font-size: 0.98rem;
      color: var(--bone-dim);
      line-height: 1.65;
    }

    a {
      display: inline-block;
      margin-top: 0.75rem;
      color: var(--gold);
      font-size: 0.9rem;

      &:hover {
        color: var(--gold-bright);
      }
    }

    strong {
      color: var(--gold);
      font-weight: 500;
    }
  }
}

.path-preview {
  padding: var(--space-2xl) 0;

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
  }

  &__action {
    margin-top: var(--space-lg);
  }
}

.paths {
  padding: var(--space-2xl) 0;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(61, 107, 90, 0.1), transparent 45%),
    rgba(14, 18, 24, 0.4);

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
    letter-spacing: 0.04em;
    color: var(--ash);
  }
}

.proofs {
  padding: var(--space-2xl) 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
  }

  &__player {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: grid;
    place-items: center;
    background: rgba(7, 9, 12, 0.85);
    backdrop-filter: blur(8px);
    animation: fade-in 0.3s ease;
  }

  &__player-inner {
    width: min(100% - 2rem, 42rem);
    background: var(--ink-soft);
    border: 1px solid rgba(230, 223, 210, 0.1);
    padding: var(--space-lg);
  }

  &__close {
    float: right;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ash);

    &:hover {
      color: var(--bone);
    }
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 1rem;
    text-align: center;
    clear: both;
  }

  &__id {
    color: var(--gold);
    font-family: var(--font-display);
    font-size: 1.25rem;
  }
}

.safety {
  padding: var(--space-xl) 0;
  border-block: 1px solid rgba(230, 223, 210, 0.06);
  text-align: center;

  .section-title {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
  }

  p:last-child {
    max-width: 36rem;
    margin-inline: auto;
  }
}

.offer {
  padding: var(--space-2xl) 0;

  &__grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  &__list {
    margin-top: var(--space-md);

    li {
      position: relative;
      padding: 0.65rem 0 0.65rem 1.5rem;
      border-bottom: 1px solid rgba(230, 223, 210, 0.06);
      color: var(--bone-dim);
      font-size: 0.98rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 1.15rem;
        width: 6px;
        height: 6px;
        background: var(--cinnabar);
        border-radius: 1px;
      }
    }
  }

  &__instructor {
    margin-top: 1.25rem;
    font-size: 0.9rem;
    color: var(--ash);
  }

  &__panel {
    padding: var(--space-lg);
    background:
      linear-gradient(160deg, rgba(184, 58, 42, 0.12), transparent 50%),
      var(--ink-soft);
    border: 1px solid rgba(184, 58, 42, 0.25);
  }

  &__tier {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  &__price {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: var(--bone);
    line-height: 1.15;
    margin-bottom: 0.5rem;
  }

  &__note {
    font-size: 0.85rem;
    color: var(--ash);
    margin-bottom: 1.5rem;
  }

  &__btn {
    width: 100%;
  }

  &__exam {
    margin-top: 1.25rem;
    font-size: 0.88rem;
    color: var(--bone-dim);
  }
}

@media (max-width: 1000px) {
  .proofs__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .aim__inner,
  .offer__grid,
  .spaces__grid,
  .paths__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .who__grid {
    grid-template-columns: 1fr;
  }

  .who__seal-wrap {
    display: none;
  }

  .path-preview__list,
  .proofs__grid {
    grid-template-columns: 1fr;
  }

  .hero {
    align-items: center;
    padding-bottom: 4rem;
  }
}
</style>
