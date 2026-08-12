<script setup lang="ts">
import { ref } from 'vue'
import CinnabarSeal from '@/components/CinnabarSeal.vue'
import ProofCard from '@/components/ProofCard.vue'
import StagePreview from '@/components/StagePreview.vue'
import { proofs, subscriptionBenefits } from '@/data/content'
import { stages } from '@/data/stages'

const activeProof = ref<string | null>(null)

function openProof(id: string) {
  activeProof.value = id
}
</script>

<template>
  <div class="landing">
    <!-- HERO: brand + one headline + one sentence + CTA + full-bleed visual -->
    <section class="hero">
      <div class="hero__atmosphere" aria-hidden="true">
        <div class="hero__mountains" />
        <div class="hero__mist hero__mist--1" />
        <div class="hero__mist hero__mist--2" />
        <div class="hero__glow" />
      </div>

      <div class="hero__content container">
        <p class="hero__brand reveal">INBI · 內丹</p>
        <h1 class="hero__title reveal reveal-delay-1">
          Культивация из дунхуа<br />
          <span>существует в реальности</span>
        </h1>
        <p class="hero__lead reveal reveal-delay-2">
          Структурированное знание внутренней даосской алхимии — учение Чжунли Цюаня — для тех, кто готов
          практиковать, а не только смотреть.
        </p>
        <div class="hero__cta reveal reveal-delay-3">
          <RouterLink to="/cabinet" class="btn btn--cinnabar">Начать бесплатно</RouterLink>
          <RouterLink to="/path" class="btn btn--ghost">Структура пути</RouterLink>
        </div>
      </div>
    </section>

    <!-- Thesis: anime roots → real path -->
    <section class="thesis">
      <div class="container thesis__grid">
        <div class="thesis__seal-wrap reveal">
          <CinnabarSeal size="lg" char="真" label="Истинное знание" />
        </div>
        <div class="thesis__text">
          <p class="section-label">Суть</p>
          <h2 class="section-title">Не фантазия экрана — живая традиция</h2>
          <p class="section-lead">
            Культивации в аниме и дунхуа берут корни из реальных практик даосских культиваторов за
            многотысячелетнюю историю. И сейчас есть возможность стать таким культиватором — не сидя на
            диване, а приобщившись к знанию.
          </p>
          <p>
            Мы открываем часть системы
            <strong>бесплатно</strong> — чтобы вы поняли, ваше это или нет. В память об Учителе. Да, путь
            стоит средств — но не того золота весом человека, что отдавали в древности.
          </p>
        </div>
      </div>
    </section>

    <!-- Proofs -->
    <section class="proofs" id="proofs">
      <div class="container">
        <p class="section-label">Подтверждения</p>
        <h2 class="section-title">Не однодневка. Не развод. Живое знание.</h2>
        <p class="section-lead">
          Видео и аудио, по которым видно: за проектом — серьёзная основа, история передачи и
          измеримый результат практики.
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

    <!-- Four stages preview -->
    <section class="path-preview">
      <div class="container">
        <p class="section-label">Система</p>
        <h2 class="section-title">Четыре этапа учения Чжунли Цюаня</h2>
        <p class="section-lead">
          Каждый этап соотносится с уровнями, знакомыми по дунхуа — но это реальная внутренняя алхимия
          (нэй дан).
        </p>

        <div class="path-preview__list">
          <StagePreview v-for="stage in stages" :key="stage.id" :stage="stage" />
        </div>

        <div class="path-preview__action">
          <RouterLink to="/path" class="btn btn--gold">Смотреть инфографику пути →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Nine energies teaser -->
    <section class="energies">
      <div class="energies__bg" aria-hidden="true" />
      <div class="container energies__inner">
        <div>
          <p class="section-label">Основа</p>
          <h2 class="section-title">Учение о девяти энергиях</h2>
          <p class="section-lead">
            Ци-ци, ци-цзин, ци-шэнь, цзин-ци… Мы берём ци не в узком смысле, а как эссенцию. Сгущение ци —
            это ци-цзин: начало культивационных практик.
          </p>
          <p>
            Когда-то цзин стояла выше ци. Сегодня, после утрат и влияния буддизма, ци выше цзин. Наша
            система возвращает понимание в прямом, алхимическом смысле.
          </p>
        </div>
        <div class="energies__diagram" aria-hidden="true">
          <div class="energies__node energies__node--qi">Ци</div>
          <div class="energies__node energies__node--jing">Цзин</div>
          <div class="energies__node energies__node--shen">Шэнь</div>
          <svg class="energies__lines" viewBox="0 0 300 280" fill="none">
            <path
              class="energies__path"
              d="M150 40 L60 220 M150 40 L240 220 M60 220 L240 220 M150 40 L150 150 M60 220 L150 150 M240 220 L150 150"
              stroke="rgba(184,151,74,0.35)"
              stroke-width="1"
            />
            <circle cx="150" cy="150" r="28" stroke="rgba(184,58,42,0.5)" stroke-width="1" fill="rgba(184,58,42,0.08)" />
            <text x="150" y="155" text-anchor="middle" fill="#b8974a" font-size="11" font-family="Outfit">九</text>
          </svg>
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
          проблемах со здоровьем согласуйте практики с лечащим врачом. В красном талисмане есть практики
          для разных систем тела — но изъяны требуют осторожности или индивидуального подхода.
        </p>
      </div>
    </section>

    <!-- Monetization / offer -->
    <section class="offer">
      <div class="container offer__grid">
        <div>
          <p class="section-label">Доступ</p>
          <h2 class="section-title">Часть знаний — бесплатно. Глубина — по пути.</h2>
          <p class="section-lead">
            Попробуйте. Поймите, ваше ли это. Затем — платные уровни и годовая подписка с бонусами.
          </p>
          <ul class="offer__list">
            <li v-for="b in subscriptionBenefits" :key="b">{{ b }}</li>
          </ul>
        </div>
        <div class="offer__panel">
          <p class="offer__tier">Годовая подписка</p>
          <p class="offer__price"><span>от</span> 1</p>
          <p class="offer__note">MVP: цена и оплата подключатся позже</p>
          <RouterLink to="/cabinet" class="btn btn--cinnabar offer__btn">Войти в кабинет</RouterLink>
          <p class="offer__exam">
            Есть опыт цигун? Онлайн-экзамен ускорит доступ к следующим уровням.
          </p>
        </div>
      </div>
    </section>

    <!-- Instructor path -->
    <section class="instructor">
      <div class="container instructor__inner">
        <h2 class="section-title">От ученика — к инструктору</h2>
        <p>
          Дойдя до определённых уровней и набрав опыт, вы можете присоединиться к команде, обучать других
          и зарабатывать.
        </p>
        <RouterLink to="/cabinet" class="btn btn--ghost">Перейти к обучению</RouterLink>
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
    background:
      linear-gradient(180deg, rgba(7, 9, 12, 0.2) 0%, rgba(7, 9, 12, 0.55) 45%, rgba(7, 9, 12, 0.96) 100%),
      radial-gradient(ellipse 80% 50% at 70% 35%, rgba(184, 58, 42, 0.18), transparent 55%),
      radial-gradient(ellipse 60% 40% at 20% 70%, rgba(61, 107, 90, 0.12), transparent 50%),
      linear-gradient(160deg, #0c1018 0%, #07090c 100%);
  }

  &__mountains {
    position: absolute;
    inset: auto 0 0;
    height: 55%;
    background:
      linear-gradient(180deg, transparent, rgba(7, 9, 12, 0.4)),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400' preserveAspectRatio='none'%3E%3Cpath fill='%230e1218' d='M0 400V220c80-40 160-90 280-85 140 6 180 70 320 65 120-4 160-55 280-50 140 6 180 80 300 70 100-8 160-50 260-45v225H0z'/%3E%3Cpath fill='%2312161c' opacity='.9' d='M0 400V280c100-30 200-70 340-60 150 10 200 55 340 50 130-5 170-45 290-40 120 5 160 55 250 50 80-4 130-30 220-28v148H0z'/%3E%3C/svg%3E")
        bottom / 100% 100% no-repeat;
  }

  &__mist {
    position: absolute;
    inset: 30% -10% 10%;
    background: radial-gradient(ellipse at center, rgba(230, 223, 210, 0.06), transparent 70%);
    animation: mist-drift 18s ease-in-out infinite;
    pointer-events: none;

    &--2 {
      inset: 45% -5% 5%;
      animation-delay: -7s;
      animation-duration: 24s;
      opacity: 0.7;
    }
  }

  &__glow {
    position: absolute;
    top: 18%;
    right: 18%;
    width: min(42vw, 28rem);
    height: min(42vw, 28rem);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184, 151, 74, 0.12), transparent 65%);
    animation: qi-pulse 8s ease-in-out infinite;
    pointer-events: none;
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
    letter-spacing: 0.22em;
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

.thesis {
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

.proofs {
  padding: var(--space-2xl) 0;
  background: linear-gradient(180deg, rgba(14, 18, 24, 0.6), transparent);

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

.energies {
  position: relative;
  padding: var(--space-2xl) 0;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 80% 50%, rgba(61, 107, 90, 0.15), transparent 50%),
      radial-gradient(ellipse at 10% 80%, rgba(184, 58, 42, 0.08), transparent 40%);
  }

  &__inner {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    align-items: center;
  }

  &__diagram {
    position: relative;
    height: 280px;
    display: grid;
    place-items: center;
  }

  &__lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__path {
    stroke-dasharray: 400;
    animation: ink-line 2.5s var(--ease-out) forwards;
  }

  &__node {
    position: absolute;
    font-family: var(--font-display);
    font-size: 1.25rem;
    letter-spacing: 0.08em;
    color: var(--bone);
    z-index: 1;

    &--qi {
      top: 4%;
      left: 50%;
      transform: translateX(-50%);
      color: var(--cinnabar-bright);
    }

    &--jing {
      bottom: 12%;
      left: 12%;
      color: var(--gold);
    }

    &--shen {
      bottom: 12%;
      right: 12%;
      color: var(--jade-bright);
    }
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
    font-size: 4rem;
    color: var(--bone);
    line-height: 1;
    margin-bottom: 0.5rem;

    span {
      font-size: 1rem;
      letter-spacing: 0.1em;
      color: var(--ash);
      margin-right: 0.35rem;
      vertical-align: super;
    }
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

.instructor {
  padding: 0 0 var(--space-2xl);

  &__inner {
    padding: var(--space-xl);
    text-align: center;
    background: linear-gradient(180deg, rgba(22, 27, 36, 0.8), rgba(14, 18, 24, 0.4));
    border: 1px solid rgba(230, 223, 210, 0.08);

    .section-title {
      margin-bottom: 0.75rem;
    }

    p {
      max-width: 32rem;
      margin: 0 auto 1.5rem;
    }
  }
}

@media (max-width: 1000px) {
  .proofs__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .energies__inner,
  .offer__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .thesis__grid {
    grid-template-columns: 1fr;
  }

  .thesis__seal-wrap {
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
