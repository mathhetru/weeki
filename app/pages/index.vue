<template>
  <div v-if="data">
    <p>{{ data.title }}</p>
    <HeroItem />
    <SearchItem />
  </div>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('home', () => queryCollection('pages').first())
</script>
