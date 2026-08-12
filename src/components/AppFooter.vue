<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <span class="footer__seal">丹</span>
        <div>
          <p class="footer__name">INBI</p>
          <p class="footer__tag">Внутренняя даосская алхимия · в память об Учителе</p>
        </div>
      </div>

      <div class="footer__cols">
        <div>
          <p class="footer__label">Путь</p>
          <RouterLink to="/">О проекте</RouterLink>
          <RouterLink to="/path">Структура знаний</RouterLink>
          <RouterLink to="/cabinet">Обучение</RouterLink>
        </div>
        <div>
          <p class="footer__label">Важно</p>
          <p class="footer__note">
            Практики согласуйте с лечащим врачом при серьёзных проблемах со здоровьем. Первое правило —
            не навреди.
          </p>
        </div>
      </div>
    </div>
    <div class="footer__bottom container">
      <p>© {{ new Date().getFullYear() }} INBI. Часть знаний — бесплатно. Доступ к глубине — по подписке.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: var(--space-2xl);
  border-top: 1px solid rgba(230, 223, 210, 0.08);
  background: linear-gradient(180deg, transparent, rgba(14, 18, 24, 0.9));
  padding: var(--space-xl) 0 var(--space-lg);

  &__inner {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-xl);
    padding-bottom: var(--space-lg);
  }

  &__brand {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  &__seal {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    background: var(--cinnabar-deep);
    color: var(--bone);
    font-family: var(--font-cn);
    font-size: 1.2rem;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0.16em;
    color: var(--bone);
  }

  &__tag {
    margin-top: 0.35rem;
    font-size: 0.9rem;
    color: var(--ash);
    max-width: 18rem;
  }

  &__cols {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: var(--space-lg);

    a {
      display: block;
      margin-top: 0.55rem;
      color: var(--bone-dim);
      font-size: 0.95rem;
      transition: color 0.25s;

      &:hover {
        color: var(--gold);
      }
    }
  }

  &__label {
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }

  &__note {
    font-size: 0.9rem;
    color: var(--ash);
    line-height: 1.55;
  }

  &__bottom {
    padding-top: var(--space-md);
    border-top: 1px solid rgba(230, 223, 210, 0.06);

    p {
      font-size: 0.8rem;
      color: var(--ash);
    }
  }
}

@media (max-width: 800px) {
  .footer__inner,
  .footer__cols {
    grid-template-columns: 1fr;
  }
}
</style>
