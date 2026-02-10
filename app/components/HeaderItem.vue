<template>
  <header
    v-if="data"
    class="fixed inset-x-0 w-[90vw] mx-auto bg-white/30 rounded-full mt-4 backdrop-blur-sm z-50 shadow-lg"
  >
    <nav class="flex items-center justify-between p-4">
      <NuxtLink
        :to="data.title.link"
        :aria-label="data.title.ariaLabel"
        class="font-heading text-2xl flex items-center gap-2"
      >
        <UIcon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" />
        {{ data.title.text }}
      </NuxtLink>
      <div class="flex items-center gap-6">
        <NuxtLink
          v-for="page in data.pages"
          :key="page.text"
          :to="page.link"
          :aria-label="page.text"
          class=""
        >
          {{ page.text }}
        </NuxtLink>
      </div>
      <NuxtLink
        :to="data.contact.link"
        :aria-label="data.contact.ariaLabel"
        class="flex items-center gap-1 rounded-full px-8 py-2 bg-black text-white"
      >
        <!-- <UIcon name="line-md:chat-round-dots-filled" /> -->
        {{ data.contact.text }}
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('header', () => queryCollection('header').first())
</script>
