<script setup lang="ts">
const steps = [
  {
    n: '01',
    title: 'Смотрит видео',
    text: 'Урок показывает форму и порядок. Его можно остановить и повторить.',
  },
  {
    n: '02',
    title: 'Запоминает теорию',
    text: 'Рядом — объяснение простым языком: что это и зачем вам этот шаг.',
  },
  {
    n: '03',
    title: 'Выполняет упражнение',
    text: 'Практика остаётся основой. Сначала ощущение, затем повтор.',
  },
  {
    n: '04',
    title: 'Присылает отчёт',
    text: 'Коротко: что вышло, где трудно, что изменилось в ощущении.',
  },
  {
    n: '05',
    title: 'Получает ответ',
    text: 'Наставник правит практику — то, что раньше делал мастер рядом.',
  },
]

const months = [
  { label: 'Сразу', text: 'Первые уроки открыты' },
  { label: 'Месяц в подписке', text: 'Следующее видео' },
  { label: 'Ещё месяц', text: 'И следующее' },
  { label: 'Дальше', text: 'Цепочка продолжается' },
]
</script>

<template>
  <div class="flow">
    <ol class="flow__steps">
      <li v-for="step in steps" :key="step.n">
        <span class="flow__n">{{ step.n }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>

    <div class="flow__unlock">
      <p class="flow__unlock-label">Подписка</p>
      <p class="flow__unlock-lead">
        Новые видео основной цепочки открываются не пакетом, а по мере того, как вы находитесь в
        подписке.
      </p>
      <ol class="flow__months">
        <li v-for="month in months" :key="month.label">
          <span>{{ month.label }}</span>
          {{ month.text }}
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flow {
  &__steps {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0.85rem;
      left: 2%;
      right: 2%;
      height: 1px;
      background: rgba(184, 151, 74, 0.35);
    }

    li {
      position: relative;
    }

    h3 {
      font-size: 1.35rem;
      color: var(--bone);
      margin: 0.85rem 0 0.45rem;
    }

    p {
      font-size: 0.92rem;
    }
  }

  &__n {
    position: relative;
    z-index: 1;
    display: inline-grid;
    place-items: center;
    width: 1.7rem;
    height: 1.7rem;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    color: var(--bone);
    background: var(--cinnabar);
  }

  &__unlock {
    margin-top: var(--space-xl);
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(230, 223, 210, 0.08);
  }

  &__unlock-label {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.65rem;
  }

  &__unlock-lead {
    max-width: 36rem;
    margin-bottom: 1.25rem;
  }

  &__months {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 1rem 0.9rem 1rem 0;
      border-top: 2px solid var(--gold-dim);
      color: var(--bone-dim);
      font-size: 0.92rem;
    }

    span {
      display: block;
      margin-bottom: 0.35rem;
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: var(--bone);
    }
  }
}

@media (max-width: 1100px) {
  .flow__steps {
    grid-template-columns: 1fr;
    gap: 0;

    &::before {
      top: 0;
      bottom: 0;
      left: 0.8rem;
      right: auto;
      width: 1px;
      height: auto;
    }

    li {
      padding: 0 0 1.35rem 2.6rem;
    }
  }

  .flow__n {
    position: absolute;
    left: 0;
    top: 0;
  }

  .flow__months {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .flow__months {
    grid-template-columns: 1fr;
  }
}
</style>
