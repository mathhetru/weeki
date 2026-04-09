<template>
  <footer v-if="data" class="w-full mx-auto bg-white/30 shadow-lg">
    <nav
      class="flex items-center flex-col lg:flex-row justify-between p-4 text-center gap-3 sm:gap-0"
    >
      <div class="flex flex-col lg:items-start">
        <p class="text-xs sm:text-sm text-gray-700">
          {{ new Date().getFullYear() }} {{ data.copyright }}
        </p>
        <div class="flex sm:gap-4 gap-2 justify-center">
          <NuxtLink
            v-for="(link, index) in data.legalLinks"
            :key="index"
            :href="link.url"
            rel="noopener noreferrer"
            class="text-xs sm:text-sm text-gray-700 hover:text-primary transition-colors duration-200"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
      <div class="flex sm:gap-4 gap-2">
        <NuxtLink
          v-for="(link, index) in data.links"
          :key="index"
          :href="link.url"
          rel="noopener noreferrer"
          class="text-xs sm:text-sm text-gray-700 hover:text-primary transition-colors duration-200"
        >
          {{ link.text }}
        </NuxtLink>
      </div>
    </nav>
  </footer>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('footer', () => queryCollection('footer').first())
</script>
