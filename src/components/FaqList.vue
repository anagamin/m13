<script setup lang="ts">
import { ref } from 'vue'
import type { FaqItem } from '@/data/site'

defineProps<{ items: FaqItem[] }>()

const openIndex = ref(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <div class="faq">
    <div v-for="(item, index) in items" :key="item.q" class="faq__item">
      <h3 class="faq__heading">
        <button
          type="button"
          class="faq__q"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span>{{ item.q }}</span>
          <span class="faq__mark" aria-hidden="true">{{ openIndex === index ? '–' : '+' }}</span>
        </button>
      </h3>
      <div v-show="openIndex === index" class="faq__a">
        <p>{{ item.a }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq {
  border-top: 1px solid rgba(230, 223, 210, 0.1);

  &__item {
    border-bottom: 1px solid rgba(230, 223, 210, 0.1);
  }

  &__heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  &__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
    padding: 1.15rem 0;
    text-align: left;
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.55rem);
    color: var(--bone);

    &:hover {
      color: var(--gold-bright);
    }
  }

  &__mark {
    flex: none;
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--gold);
  }

  &__a {
    padding: 0 0 1.2rem;
    max-width: 42rem;

    p {
      font-size: 1.02rem;
    }
  }
}
</style>
