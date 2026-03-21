<template>
  <header
    v-if="data"
    class="fixed inset-x-0 w-[90vw] mx-auto bg-white/70 md:bg-white/50 rounded-full mt-4 backdrop-blur-xs z-50 shadow-lg"
  >
    <nav class="flex items-center justify-between p-4">
      <NuxtLink
        :to="data.title.link"
        :aria-label="data.title.ariaLabel"
        class="font-heading text-xl lg:text-2xl flex items-center gap-2 hover:text-primary transition-colors"
      >
        <UIcon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" />
        {{ data.title.text }}
      </NuxtLink>

      <div class="hidden md:flex items-center gap-6 lg:gap-9">
        <NuxtLink
          v-for="page in data.pages"
          :key="page.text"
          :to="page.link"
          :aria-label="page.text"
          class="hover:text-primary text-sm lg:text-base transition-colors"
          `
        >
          {{ page.text }}
        </NuxtLink>
      </div>

      <NuxtLink
        :to="data.contact.link"
        :aria-label="data.contact.ariaLabel"
        class="hidden md:flex items-center text-xs rounded-full px-4 py-1 bg-black hover:bg-primary text-white lg:text-sm lg:px-6 transition-colors"
      >
        {{ data.contact.text }}
      </NuxtLink>
      <button
        class="mr-2 md:hidden h-10 w-10 flex items-center justify-center rounded-md hover:bg-black/10 transition-colors"
        @click="openDrawer"
      >
        <UIcon name="line-md:align-justify" class="text-2xl" />
      </button>
    </nav>
  </header>

  <DrawerHeader v-if="data" :data="data" />
</template>

<script setup lang="ts">
  import { useEntitesStore } from '../stores/entites.store'
  import DrawerHeader from './DrawerHeader.vue'

  const { data } = await useAsyncData('header', () => queryCollection('header').first())
  const entitesStore = useEntitesStore()

  const openDrawer = () => {
    entitesStore.isOpenDrawer = true
  }

  defineShortcuts({
    o: () => (entitesStore.isOpenDrawer = !entitesStore.isOpenDrawer),
  })
</script>
