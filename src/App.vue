<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const isCabinet = computed(() => route.name === 'cabinet')
</script>

<template>
  <AppHeader :compact="isCabinet" />
  <main class="main" :class="{ 'main--cabinet': isCabinet }">
    <RouterView />
  </main>
  <AppFooter v-if="!isCabinet" />
</template>

<style scoped lang="scss">
.main {
  flex: 1;

  &--cabinet {
    padding-top: var(--header-h);
  }
}
</style>
