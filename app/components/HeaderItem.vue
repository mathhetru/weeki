<template>
  <header
    v-if="data"
    class="fixed inset-x-0 w-[90vw] mx-auto bg-white/70 md:bg-white/50 rounded-full mt-4 backdrop-blur-xs z-50 shadow-lg"
  >
    <nav class="flex items-center justify-between p-4">
      <NuxtLink
        :to="data.title.link"
        :aria-label="data.title.ariaLabel"
        class="font-heading text-xl lg:text-2xl flex items-center gap-2"
      >
        <UIcon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" />
        {{ data.title.text }}
      </NuxtLink>

      <div class="hidden md:flex items-center text-sm lg:text-base gap-6 lg:gap-9">
        <NuxtLink
          v-for="page in data.pages"
          :key="page.text"
          :to="page.link"
          :aria-label="page.text"
        >
          {{ page.text }}
        </NuxtLink>
      </div>

      <NuxtLink
        :to="data.contact.link"
        :aria-label="data.contact.ariaLabel"
        class="hidden md:flex items-center text-xs rounded-full px-4 py-1 bg-black text-white lg:text-sm lg:px-6 hover:bg-gray-600 transition-colors"
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

  <UDrawer v-if="data" v-model:open="isOpen" direction="right" :handle="false" :auto-focus="isOpen">
    <template #content>
      <VisuallyHidden>
        <DialogTitle>Menu de navigation</DialogTitle>
        <DialogDescription>Menu de navigation mobile</DialogDescription>
      </VisuallyHidden>
      <div class="min-w-75 min-h-96 size-full m-4">
        <UButton
          color="neutral"
          variant="ghost"
          size="xl"
          trailing-icon="line-md:close"
          class="pt-4 h-10 w-10 hover:bg-black/10 hover:text-black transition-colors"
          @click="closeDrawer()"
        />
        <div class="flex flex-col items-center text-l gap-12 pt-12">
          <NuxtLink
            :to="data.title.link"
            :aria-label="data.title.ariaLabel"
            class="font-heading text-2xl flex items-center gap-2"
            @click="closeDrawer()"
          >
            <UIcon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" />
            {{ data.title.text }}
          </NuxtLink>
          <NuxtLink
            v-for="page in data.pages"
            :key="page.text"
            :to="page.link"
            :aria-label="page.text"
            class="w-full text-center text-l"
            @click="closeDrawer()"
          >
            {{ page.text }}
          </NuxtLink>
          <NuxtLink
            :to="data.contact.link"
            :aria-label="data.contact.ariaLabel"
            class="flex items-center w-full rounded-full bg-black hover:bg-gray-600 transition-colors"
            @click="closeDrawer()"
          >
            <p class="text-white text-l mx-6 my-2 w-full text-center">
              {{ data.contact.text }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
  import { DialogTitle, DialogDescription, VisuallyHidden } from 'reka-ui'
  const { data } = await useAsyncData('header', () => queryCollection('header').first())

  const isOpen = ref(false)

  const openDrawer = (e: MouseEvent) => {
    ;(e.currentTarget as HTMLElement).blur()
    isOpen.value = true
  }

  const closeDrawer = () => {
    isOpen.value = false
  }

  defineShortcuts({
    o: () => (isOpen.value = !isOpen.value),
  })
</script>
