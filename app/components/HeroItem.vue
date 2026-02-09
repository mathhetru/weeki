<template>
  <div v-if="data">
    <h1>{{ data?.hero?.heading }}</h1>
    <p>{{ data?.hero?.description }}</p>
    <div v-for="feature in data.features" :key="feature.title">
      <h3>{{ feature?.title }}</h3>
      <p>{{ feature?.text }}</p>
      <NuxtImg :src="feature?.img" :alt="`Image de ${feature?.title}`" height="200" />
    </div>
  </div>
  <div v-else>No data available</div>
</template>

<script setup="ts">
  const { data } = await useAsyncData('home-hero', () => queryCollection('pages').first())
</script>
