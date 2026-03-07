<template>
  <footer v-if="data" class="w-full mx-auto bg-white/30 shadow-lg">
    <nav class="flex items-center justify-between p-4">
      <p class="text-sm text-gray-700">
        {{ new Date().getFullYear() }} - Weena et la légende de Noor. Tous droits réservés.
      </p>
      <div class="flex gap-4">
        <a
          v-for="(link, index) in data.links"
          :key="index"
          :href="link.url"
          rel="noopener noreferrer"
          class="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          {{ link.text }}
        </a>
      </div>
    </nav>
  </footer>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('footer', () => queryCollection('footer').first())
</script>
