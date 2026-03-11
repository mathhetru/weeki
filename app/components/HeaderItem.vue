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

  <Teleport v-if="data" to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
        @click="closeDrawer"
      />
    </Transition>

    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-75 bg-white z-50 shadow-xl p-6 flex flex-col gap-8"
      >
        <button
          class="self-end h-10 w-10 flex items-center justify-center rounded-md hover:bg-black/10 transition-colors"
          @click="closeDrawer"
        >
          <UIcon name="line-md:close" class="text-2xl" />
        </button>

        <NuxtLink
          :to="data.title.link"
          class="font-heading text-2xl flex items-center gap-2"
          @click="closeDrawer"
        >
          <UIcon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" />
          {{ data.title.text }}
        </NuxtLink>

        <nav class="flex flex-col gap-6 text-lg">
          <NuxtLink
            v-for="page in data.pages"
            :key="page.text"
            :to="page.link"
            class="w-full text-center"
            @click="closeDrawer"
          >
            {{ page.text }}
          </NuxtLink>
        </nav>

        <NuxtLink
          :to="data.contact.link"
          class="mt-auto rounded-full bg-black text-white text-center py-2 px-4 hover:bg-gray-600 transition-colors"
          @click="closeDrawer"
        >
          {{ data.contact.text }}
        </NuxtLink>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const { data } = await useAsyncData('header', () => queryCollection('header').first())

  const isOpen = ref(false)

  const closeDrawer = () => {
    isOpen.value = false
  }

  const openDrawer = () => {
    isOpen.value = true
  }

  defineShortcuts({
    o: () => (isOpen.value = !isOpen.value),
  })
</script>

<style lang="css">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
