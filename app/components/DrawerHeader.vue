<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="entitesStore.isOpenDrawer"
        class="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
        @click="closeDrawer"
      />
    </Transition>

    <Transition name="slide">
      <div
        v-if="entitesStore.isOpenDrawer"
        class="fixed top-0 right-0 h-full w-85 bg-white z-50 shadow-xl p-6 flex flex-col gap-8"
      >
        <button
          class="self-start h-10 w-10 flex items-center justify-center rounded-md hover:bg-black/10 transition-colors"
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
          {{ props.data.title.text }}
        </NuxtLink>

        <nav class="flex flex-col gap-8 text-lg">
          <NuxtLink
            v-for="page in props.data.pages"
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
          {{ props.data.contact.text }}
        </NuxtLink>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { useEntitesStore } from '../stores/entites.store'

  const entitesStore = useEntitesStore()

  const props = defineProps<{
    data: {
      title: {
        text: string
        link: string
        ariaLabel: string
      }
      pages: {
        text: string
        link: string
      }[]
      contact: {
        text: string
        link: string
        ariaLabel: string
      }
    }
  }>()

  const closeDrawer = () => {
    entitesStore.isOpenDrawer = false
  }

  defineShortcuts({
    o: () => (entitesStore.isOpenDrawer = !entitesStore.isOpenDrawer),
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
