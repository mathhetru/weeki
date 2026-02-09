<template>
  <header v-if="data">
    <nav>
      <NuxtLink :to="data.title.link" :aria-label="data.title.ariaLabel">
        <NuxtImg :src="data.title.img" :alt="data.title.ariaLabel" />
      </NuxtLink>
      <div v-for="page in data.pages" :key="page.text">
        <NuxtLink :to="page.link" :aria-label="page.text">
          <p>{{ page.text }}</p>
        </NuxtLink>
      </div>
      <NuxtLink :to="data.contact.link" :aria-label="data.contact.ariaLabel">
        <p>{{ data.contact.text }}</p>
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('header', () => queryCollection('header').first())
</script>
