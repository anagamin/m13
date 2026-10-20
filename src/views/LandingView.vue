<script setup lang="ts">
import { ref } from 'vue'
import FaqList from '@/components/FaqList.vue'
import LearningFlow from '@/components/LearningFlow.vue'
import MediaModal from '@/components/MediaModal.vue'
import ProofCard from '@/components/ProofCard.vue'
import { faq, formatRub, mainMediaVideos, subscriptionPriceRub, type MediaVideo } from '@/data/site'
import { stages } from '@/data/stages'

const heroImageOk = ref(true)
const activeVideo = ref<MediaVideo | null>(null)
const videos = mainMediaVideos
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="hero__atmosphere" aria-hidden="true">
        <img
          v-if="heroImageOk"
          class="hero__bg"
          src="/hero-cultivation-bg.png"
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchpriority="high"
          @error="heroImageOk = false"
        />
        <div class="hero__veil" />
        <div class="hero__mist hero__mist--1" />
        <div class="hero__mist hero__mist--2" />
      </div>

      <div class="hero__content container">
        <div class="hero__intro">
          <h1 class="hero__title reveal reveal-delay-1">
            Онлайн-академия даосской алхимии
            <span>moneda13.com</span>
          </h1>
          <p class="hero__lead reveal reveal-delay-2">
            Ты видел культивацию в дунхуа. Теперь попробуй сам — по реальной традиции, с практикой и
            обратной связью. Первый урок бесплатно.
          </p>
          <div class="hero__cta reveal reveal-delay-3">
            <RouterLink to="/enter" class="btn btn--cinnabar btn--lg">Начать бесплатно</RouterLink>
          </div>
          <p class="hero__meta reveal reveal-delay-3">
            Старт бесплатный. Подписка —
            <RouterLink to="/prices">{{ formatRub(subscriptionPriceRub) }} в месяц</RouterLink>.
          </p>
        </div>

        <aside class="hero__preview reveal reveal-delay-2">
          <div class="hero__frame">
            <iframe
              class="hero__video"
              src="https://vkvideo.ru/video_ext.php?oid=-242302356&id=456239017&hash=c2cb35254799a364&hd=3&autoplay=0"
              title="Видео"
              allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
              allowfullscreen
            />
          </div>
        </aside>
      </div>
    </section>

    <section class="who">
      <div class="container">
        <p class="section-label">Кто мы</p>
        <h2 class="section-title">Носители устной передачи</h2>
        <p class="section-lead">
          Метод пришёл прямой устной передачей традиции внутренней алхимии. В основе — Школы
          Небесных Наставников (天師道) и Школа Высшей Чистоты (上清). Мы сами практикуем его много
          лет и не выносим личные имена вперёд: важнее передача, чем личности.
        </p>
        <RouterLink to="/about" class="text-link">Подробнее о нас</RouterLink>
      </div>
    </section>

    <section class="aim">
      <div class="container aim__inner">
        <div class="aim__copy">
          <p class="section-label">К чему стремимся</p>
          <h2 class="section-title">Цель — за гранью метафоры бессмертия</h2>
          <p class="section-lead">
            Декларируемая цель — бессмертие — лишь образ. В реальности цель культивации лежит за
            гранью жизни и смерти, пространства и времени, и недоступна для описания.
          </p>
          <p>
            Как говорил Лао-цзы: Дао рождает одно, одно — два, два — три, три — десять тысяч вещей.
            Практикующий идёт обратным путём: десять тысяч → три → два → один → пустота — чтобы
            запустить «дыхание Дао». Процесс культивации бесконечен.
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

    <section class="study">
      <div class="container">
        <p class="section-label">Как проходит обучение</p>
        <h2 class="section-title">Один урок — пять шагов</h2>
        <p class="section-lead">
          Раньше мастер стоял рядом и правил ученика. Сейчас ту же цепочку держат видео, понятная
          теория и ответ на отчёт.
        </p>
        <LearningFlow />
        <div class="study__links">
          <RouterLink to="/learning" class="text-link">Как это устроено целиком</RouterLink>
        </div>
      </div>
    </section>

    <section class="path">
      <div class="container">
        <p class="section-label">Путь</p>
        <h2 class="section-title">Четыре уровня</h2>
        <p class="section-lead">
          Это не ранги, а состояния практикующего — от подготовки тела до рождения бессмертного
          зародыша.
        </p>
        <ol class="path__list">
          <li v-for="stage in stages" :key="stage.id">
            <span class="path__cn">{{ stage.nameCn }}</span>
            <span class="path__order">Уровень {{ stage.order }}</span>
            <h3>{{ stage.name }}</h3>
            <p>{{ stage.outcome }}</p>
          </li>
        </ol>
        <RouterLink to="/program" class="btn btn--gold">Посмотреть путь обучения</RouterLink>
      </div>
    </section>

    <section class="media">
      <div class="container">
        <p class="section-label">Медиа</p>
        <h2 class="section-title">С чего посмотреть</h2>
        <p class="section-lead">
          Вводные видео. Полная библиотека — на странице «Медиа».
        </p>
        <div class="media__grid">
          <ProofCard
            v-for="video in videos"
            :key="video.id"
            :item="{ ...video, type: 'video' }"
            @play="activeVideo = video"
          />
        </div>
        <RouterLink to="/media" class="text-link media__all">Все видео</RouterLink>
      </div>
    </section>

    <section class="faq">
      <div class="container">
        <p class="section-label">Вопросы</p>
        <h2 class="section-title">Коротко до старта</h2>
        <FaqList :items="faq" />
      </div>
    </section>

    <section class="close">
      <div class="narrow">
        <h2 class="section-title">Первый урок — бесплатно</h2>
        <p>
          Регистрация открывает кабинет. Дальше — видео, теория и упражнение, без оплаты и без
          оборудования.
        </p>
        <RouterLink to="/enter" class="btn btn--cinnabar btn--lg">Начать бесплатно</RouterLink>
      </div>
    </section>

    <MediaModal :video="activeVideo" @close="activeVideo = null" />
  </div>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  padding: calc(var(--header-h) + 2rem) 0 3rem;
  overflow: hidden;

  &__atmosphere {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 70% 30%, rgba(184, 58, 42, 0.18), transparent 55%),
      var(--ink);
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
      linear-gradient(180deg, rgba(7, 9, 12, 0.28) 0%, rgba(7, 9, 12, 0.55) 38%, rgba(7, 9, 12, 0.94) 100%),
      linear-gradient(90deg, rgba(7, 9, 12, 0.78) 0%, rgba(7, 9, 12, 0.28) 48%, rgba(7, 9, 12, 0.2) 100%);
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
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
    gap: clamp(1.5rem, 4vw, 3.25rem);
    align-items: center;
  }

  &__intro {
    max-width: 40rem;
  }

  &__title {
    font-size: clamp(2.15rem, 4.4vw, 3.55rem);
    font-weight: 500;
    line-height: 1.08;
    color: var(--bone);
    margin-bottom: 1.15rem;

    span {
      display: block;
      margin-top: 0.55rem;
      font-family: var(--font-body);
      font-size: 0.95rem;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.16em;
      color: var(--gold);
    }
  }

  &__lead {
    font-size: 1.15rem;
    max-width: 36rem;
    margin-bottom: 1.75rem;
    color: var(--bone-dim);
  }

  &__preview {
    min-width: 0;
  }

  &__frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0a0d12;
    border: 1px solid rgba(230, 223, 210, 0.12);
  }

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  &__cta {
    margin-bottom: 1rem;
  }

  &__meta {
    max-width: 34rem;
    font-size: 0.95rem;
    color: var(--ash);

    a {
      color: var(--gold);
      border-bottom: 1px solid rgba(184, 151, 74, 0.45);

      &:hover {
        color: var(--gold-bright);
      }
    }
  }
}

.who {
  padding: var(--space-2xl) 0;
  border-top: 1px solid rgba(230, 223, 210, 0.06);
}

.text-link {
  color: var(--gold);
  border-bottom: 1px solid rgba(184, 151, 74, 0.45);
  font-size: 0.95rem;

  &:hover {
    color: var(--gold-bright);
  }
}

.aim {
  padding: 0 0 var(--space-2xl);

  &__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(14rem, 22rem);
    gap: var(--space-xl);
    align-items: start;
  }

  &__copy {
    min-width: 0;

    .section-title,
    .section-lead,
    p {
      max-width: 38rem;
    }
  }

  &__steps {
    list-style: none;
    margin: 0;
    padding: 0;
    border-left: 1px solid rgba(184, 151, 74, 0.25);

    li {
      display: grid;
      grid-template-columns: 4.25rem minmax(0, 1fr);
      gap: 0.75rem;
      align-items: baseline;
      padding: 0.85rem 0 0.85rem 1.25rem;
      color: var(--bone-dim);
      border-bottom: 1px solid rgba(230, 223, 210, 0.06);

      &:last-child {
        border-bottom: none;
      }

      span {
        font-family: var(--font-display);
        font-size: 1.15rem;
        color: var(--gold);
      }
    }
  }
}

.study {
  padding: var(--space-2xl) 0;
  background: linear-gradient(180deg, rgba(14, 18, 24, 0.65), transparent);

  &__links {
    margin-top: var(--space-lg);
  }
}

.path {
  padding: var(--space-2xl) 0;

  &__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    list-style: none;
    margin: 0 0 var(--space-lg);
    padding: 0;
  }

  li {
    padding: 1.15rem 1rem 1.25rem;
    border-top: 2px solid rgba(230, 223, 210, 0.14);
    background: rgba(14, 18, 24, 0.35);
  }

  &__cn {
    display: block;
    font-family: var(--font-cn);
    letter-spacing: 0.14em;
    color: var(--cinnabar-bright);
    margin-bottom: 0.35rem;
  }

  &__order {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ash);
    margin-bottom: 0.45rem;
  }

  h3 {
    font-size: 1.45rem;
    color: var(--bone);
    margin-bottom: 0.45rem;
  }

  p {
    font-size: 0.92rem;
  }
}

.media {
  padding: var(--space-2xl) 0;
  background:
    radial-gradient(ellipse at 80% 0%, rgba(184, 151, 74, 0.08), transparent 45%),
    rgba(14, 18, 24, 0.35);

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-md);
  }

  &__all {
    display: inline-block;
    margin-top: var(--space-lg);
  }
}

.faq {
  padding: var(--space-2xl) 0;
}

.close {
  padding: 0 0 var(--space-xl);
  text-align: center;

  p {
    margin: 0 auto 1.5rem;
    max-width: 34rem;
  }
}

@media (max-width: 1100px) {
  .path__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .hero__content,
  .aim__inner,
  .media__grid {
    grid-template-columns: 1fr;
  }

  .path__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    align-items: stretch;
    min-height: auto;
    padding-top: calc(var(--header-h) + 3rem);
    padding-bottom: 3.5rem;
  }

  .path__list {
    grid-template-columns: 1fr;
  }
}
</style>
