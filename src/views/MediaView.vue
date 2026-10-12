<script setup lang="ts">
import { computed, ref } from 'vue'
import MediaModal from '@/components/MediaModal.vue'
import PageHero from '@/components/PageHero.vue'
import ProofCard from '@/components/ProofCard.vue'
import { mediaVideos } from '@/data/site'

const activeTag = ref('Все')
const activeTitle = ref<string | null>(null)

const tags = computed(() => ['Все', ...new Set(mediaVideos.flatMap((video) => video.tags))])

const visible = computed(() =>
  activeTag.value === 'Все'
    ? mediaVideos
    : mediaVideos.filter((video) => video.tags.includes(activeTag.value)),
)
</script>

<template>
  <div class="page">
    <PageHero
      label="Медиа"
      title="Видео по темам"
      lead="Короткая библиотека: основы, путь, энергии, практика и передача. Ролик открывается здесь же."
    />

    <section class="library">
      <div class="container">
        <div class="library__tags" role="tablist" aria-label="Темы видео">
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            role="tab"
            class="library__tag"
            :class="{ 'library__tag--on': activeTag === tag }"
            :aria-selected="activeTag === tag"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>

        <div class="library__grid">
          <ProofCard
            v-for="video in visible"
            :key="video.id"
            :item="{ ...video, type: 'video' }"
            @play="activeTitle = video.title"
          />
        </div>
      </div>
    </section>

    <MediaModal :title="activeTitle" @close="activeTitle = null" />
  </div>
</template>

<style scoped lang="scss">
.library {
  padding-bottom: var(--space-2xl);

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: var(--space-lg);
  }

  &__tag {
    padding: 0.45rem 0.85rem;
    border: 1px solid rgba(230, 223, 210, 0.16);
    color: var(--bone-dim);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    &:hover,
    &--on {
      border-color: var(--gold);
      color: var(--gold-bright);
    }

    &--on {
      background: rgba(184, 151, 74, 0.1);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }
}

@media (max-width: 900px) {
  .library__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .library__grid {
    grid-template-columns: 1fr;
  }
}
</style>
