<script setup lang="ts">
import { computed } from 'vue'
import PageHero from '@/components/PageHero.vue'
import { examFeeRub, practices } from '@/data/content'
import { stages } from '@/data/stages'
import { extraPriceRub, formatRub, subscriptionPriceRub } from '@/data/site'

const groups = computed(() =>
  stages
    .map((stage) => ({
      stage,
      items: practices
        .filter((item) => item.stageId === stage.id && item.tier === 'extra')
        .map((item) => ({
          ...item,
          price: extraPriceRub[item.id],
        })),
    }))
    .filter((group) => group.items.length > 0),
)
</script>

<template>
  <div class="page">
    <PageHero
      label="Цены"
      title="Старт бесплатный"
      :lead="`Дальше — подписка ${formatRub(subscriptionPriceRub)} в месяц. Она открывает новые видео и возможность обратной связи. Отдельные блоки покупаются сами по себе.`"
    />

    <section class="plans">
      <div class="container plans__grid">
        <article class="plan">
          <p class="plan__label">Без оплаты</p>
          <h2>Старт</h2>
          <p class="plan__price">0 ₽</p>
          <ul>
            <li>Регистрация и вход в кабинет</li>
            <li>Начало красного талисмана: вводный урок и первые практики</li>
            <li>Можно понять, ваше это или нет, до любой оплаты</li>
          </ul>
          <RouterLink to="/enter" class="btn btn--cinnabar">Начать бесплатно</RouterLink>
        </article>

        <article class="plan plan--main">
          <p class="plan__label">Основной доступ</p>
          <h2>Подписка</h2>
          <p class="plan__price">
            {{ formatRub(subscriptionPriceRub) }}
            <span>в месяц</span>
          </p>
          <ul>
            <li>Новые видео основной цепочки — по мере нахождения в подписке</li>
            <li>Обратная связь: отчёт о практике и ответ наставника</li>
            <li>Материалы текущего этапа, пока подписка действует</li>
          </ul>
          <RouterLink to="/enter" class="btn btn--cinnabar">Перейти к регистрации</RouterLink>
          <p class="plan__note">В прототипе оплата не списывается. Цена — как будет в обучении.</p>
        </article>
      </div>
    </section>

    <section class="extras">
      <div class="container">
        <p class="section-label">Отдельно</p>
        <h2 class="section-title">Дополнительные блоки</h2>
        <p class="section-lead">
          Они не входят в подписку. У каждого своя цена, в кабинете блок виден и до покупки. Оплата
          разовая — блок остаётся у вас.
        </p>

        <div v-for="group in groups" :key="group.stage.id" class="extras__group">
          <h3>
            <span>{{ group.stage.nameCn }}</span>
            {{ group.stage.name }}
          </h3>
          <ul>
            <li v-for="item in group.items" :key="item.id">
              <div>
                <p class="extras__name">{{ item.title }}</p>
                <p class="extras__desc">{{ item.description }}</p>
              </div>
              <p class="extras__price">{{ item.price ? formatRub(item.price) : '—' }}</p>
            </li>
          </ul>
        </div>

        <p class="extras__exam">
          Переход на следующий уровень — после экзамена. Запрос на сдачу стоит
          {{ formatRub(examFeeRub) }}, не чаще одного раза в месяц.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.plans {
  padding-bottom: var(--space-2xl);

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1.08fr;
    gap: var(--space-md);
    align-items: stretch;
  }
}

.plan {
  padding: var(--space-lg);
  border: 1px solid rgba(230, 223, 210, 0.1);
  background: var(--ink-elevated);
  display: flex;
  flex-direction: column;

  &--main {
    border-color: rgba(184, 58, 42, 0.4);
    background:
      linear-gradient(165deg, rgba(184, 58, 42, 0.14), transparent 48%),
      var(--ink-soft);
  }

  &__label {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 2rem;
    color: var(--bone);
  }

  &__price {
    margin: 0.8rem 0 1.25rem;
    font-family: var(--font-display);
    font-size: 2.8rem;
    color: var(--bone);
    line-height: 1;
    white-space: nowrap;

    span {
      display: block;
      margin-top: 0.4rem;
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--ash);
    }
  }

  ul {
    margin: 0 0 1.5rem;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding: 0.7rem 0 0.7rem 1.2rem;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
    color: var(--bone-dim);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 1.15rem;
      width: 6px;
      height: 6px;
      background: var(--cinnabar);
    }
  }

  .btn {
    margin-top: auto;
  }

  &__note {
    margin-top: 0.9rem;
    font-size: 0.85rem;
    color: var(--ash);
  }
}

.extras {
  padding-bottom: var(--space-xl);

  &__group {
    margin-top: var(--space-lg);

    h3 {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      font-size: 1.7rem;
      color: var(--bone);
      margin-bottom: 0.5rem;

      span {
        font-family: var(--font-cn);
        font-size: 1rem;
        letter-spacing: 0.12em;
        color: var(--cinnabar-bright);
      }
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    align-items: baseline;
    padding: 1rem 0;
    border-top: 1px solid rgba(230, 223, 210, 0.08);
  }

  &__name {
    color: var(--bone);
    font-size: 1.05rem;
  }

  &__desc {
    margin-top: 0.2rem;
    font-size: 0.9rem;
    color: var(--ash);
  }

  &__price {
    font-family: var(--font-display);
    font-size: 1.35rem;
    color: var(--gold);
    white-space: nowrap;
  }

  &__exam {
    margin-top: var(--space-lg);
    max-width: 40rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 800px) {
  .plans__grid,
  .extras li {
    grid-template-columns: 1fr;
  }

  .extras__price {
    margin-top: -0.35rem;
  }
}
</style>
