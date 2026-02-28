<template>
  <div v-if="data">
    <HeroItem />
    <SearchItem />
  </div>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('home', () => queryCollection('pages').first())

  // TODO responsive design
  // TODO SEO optimization
</script>
