<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <span class="footer__seal">m</span>
        <div>
          <p class="footer__name">m13</p>
          <p class="footer__tag">Устная передача культивации. Метод важнее личностей.</p>
        </div>
      </div>

      <div class="footer__cols">
        <div>
          <p class="footer__label">Разделы</p>
          <RouterLink to="/">Начало</RouterLink>
          <RouterLink to="/learning">Как проходит обучение</RouterLink>
          <RouterLink to="/program">Программа</RouterLink>
          <RouterLink to="/prices">Цены</RouterLink>
          <RouterLink to="/media">Медиа</RouterLink>
          <RouterLink to="/about">О нас</RouterLink>
        </div>
        <div>
          <p class="footer__label">Важно</p>
          <p class="footer__note">
            При серьёзных проблемах со здоровьем согласуйте практику с врачом. Если занятие вызывает
            боль или резкое ухудшение самочувствия — остановитесь.
          </p>
        </div>
      </div>
    </div>
    <div class="footer__bottom container">
      <p>© {{ new Date().getFullYear() }} m13. Старт бесплатный. Подписка — 1 500 ₽ в месяц.</p>
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
    grid-template-columns: 1.1fr 1fr;
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
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    color: var(--bone);
  }

  &__tag {
    margin-top: 0.35rem;
    font-size: 0.9rem;
    color: var(--ash);
    max-width: 22rem;
  }

  &__cols {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-lg);

    a {
      display: block;
      margin-top: 0.5rem;
      color: var(--bone-dim);
      font-size: 0.95rem;

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
    margin-bottom: 0.35rem;
  }

  &__note {
    font-size: 0.9rem;
    color: var(--ash);
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
