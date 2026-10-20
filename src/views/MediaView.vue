<script setup lang="ts">
import { computed, ref } from 'vue'
import MediaModal from '@/components/MediaModal.vue'
import PageHero from '@/components/PageHero.vue'
import ProofCard from '@/components/ProofCard.vue'
import { mediaVideos, type MediaVideo } from '@/data/site'

const activeTag = ref('Все')
const activeVideo = ref<MediaVideo | null>(null)

const tags = computed(() => ['Все', ...new Set(mediaVideos.flatMap((video) => video.tags ?? []))])

const visible = computed(() =>
  activeTag.value === 'Все'
    ? mediaVideos
    : mediaVideos.filter((video) => video.tags?.includes(activeTag.value)),
)

const library = computed(() => visible.value.filter((video) => !video.section))

const sections = computed(() => {
  const groups = new Map<string, MediaVideo[]>()
  for (const video of visible.value) {
    if (!video.section) continue
    const list = groups.get(video.section) ?? []
    list.push(video)
    groups.set(video.section, list)
  }
  return [...groups.entries()].map(([title, videos]) => ({ title, videos }))
})
</script>

<template>
  <div class="page">
    <PageHero
      label="Медиа"
      title="Видео по темам"
      lead="Видео о методе. Ролик открывается здесь же."
    />

    <section class="library">
      <div class="container">
        <div v-if="tags.length > 1" class="library__tags" role="tablist" aria-label="Темы видео">
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
            v-for="video in library"
            :key="video.id"
            :item="{ ...video, type: 'video' }"
            @play="activeVideo = video"
          />
        </div>

        <section v-for="group in sections" :key="group.title" class="library__section">
          <h2 class="library__heading">{{ group.title }}</h2>
          <div class="library__grid">
            <ProofCard
              v-for="video in group.videos"
              :key="video.id"
              :item="{ ...video, type: 'video' }"
              @play="activeVideo = video"
            />
          </div>
        </section>
      </div>
    </section>

    <MediaModal :video="activeVideo" @close="activeVideo = null" />
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

  &__section {
    margin-top: var(--space-2xl);
  }

  &__heading {
    font-size: clamp(1.7rem, 3vw, 2.4rem);
    color: var(--bone);
    margin-bottom: var(--space-md);
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
