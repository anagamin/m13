<script setup lang="ts">
import type { Stage } from '@/data/stages'

defineProps<{ stage: Stage }>()
</script>

<template>
  <article class="stage" :class="`stage--${stage.color}`">
    <div class="stage__order">
      <span class="stage__num">0{{ stage.order }}</span>
      <span class="stage__cn">{{ stage.nameCn }}</span>
    </div>
    <h3 class="stage__name">{{ stage.name }}</h3>
    <p class="stage__donghua">
      В дунхуа: <em>{{ stage.donghua }}</em>
    </p>
    <p class="stage__summary">{{ stage.summary }}</p>
    <p class="stage__duration">{{ stage.duration }}</p>
  </article>
</template>

<style scoped lang="scss">
.stage {
  position: relative;
  padding: var(--space-lg) var(--space-md);
  border-left: 2px solid rgba(230, 223, 210, 0.12);
  transition: border-color 0.4s var(--ease-out), background 0.4s;

  &:hover {
    background: rgba(22, 27, 36, 0.5);
  }

  &--cinnabar {
    border-left-color: var(--cinnabar);

    .stage__cn {
      color: var(--cinnabar-bright);
    }
  }

  &--pagoda {
    border-left-color: var(--pagoda);

    .stage__cn {
      color: var(--pagoda);
    }
  }

  &--jade {
    border-left-color: var(--jade-bright);

    .stage__cn {
      color: var(--jade-bright);
    }
  }

  &--tablet {
    border-left-color: var(--tablet);

    .stage__cn {
      color: var(--gold-bright);
    }
  }

  &__order {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  &__num {
    font-family: var(--font-display);
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    color: var(--ash);
  }

  &__cn {
    font-family: var(--font-cn);
    font-size: 1.1rem;
    letter-spacing: 0.15em;
  }

  &__name {
    font-size: 1.65rem;
    color: var(--bone);
    margin-bottom: 0.5rem;
  }

  &__donghua {
    font-size: 0.88rem;
    color: var(--gold);
    margin-bottom: 0.85rem;

    em {
      font-style: italic;
      font-family: var(--font-display);
      font-size: 1.05em;
    }
  }

  &__summary {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  &__duration {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ash);
  }
}
</style>
