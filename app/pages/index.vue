<template>
  <div v-if="data">
    <HeroItem />
    <SearchItem />
  </div>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('home', () => queryCollection('home').first())

  // TODO SEO optimization
</script>
