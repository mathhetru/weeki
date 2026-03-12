<template>
  <div
    v-if="data"
    class="mx-auto w-[90vw] lg:w-[75%] max-w-7xl flex flex-col lg:flex-row gap-4 backdrop-blur-xs rounded-4xl bg-white/30 p-5 sm:p-10 shadow-lg items-center"
  >
    <div
      class="w-full sm:w-[80%] lg:w-[30%] flex flex-col gap-4 text-center justify-center lg:mx-12 py-6 lg:py-0 lg:h-150"
    >
      <h1 class="text-3xl lg:text-4xl font-semibold font-heading golden">
        {{ data?.hero?.heading }}
      </h1>
      <p>{{ data?.hero?.description }}</p>
    </div>
    <div
      class="w-full sm:w-[80%] lg:w-[70%] grid grid-rows-2 grid-cols-3 gap-3 lg:gap-6 h-80 sm:h-100 lg:h-150"
    >
      <NuxtLink
        v-for="(feature, index) in data.features"
        :key="feature.title"
        :to="searchItem(feature?.search)"
        :class="getGridClass(index)"
        class="group"
        @click="addTypeFilter(feature?.search as typeFilter)"
      >
        <div class="absolute inset-0 overflow-hidden">
          <NuxtImg
            :provider="providerToUse(feature?.img)"
            :src="feature?.img"
            :alt="`Image de ${feature?.title}`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div
          class="absolute inset-x-0 top-0 h-16 lg:h-30 bg-linear-to-b from-black/70 to-transparent z-10"
        />
        <h3 class="absolute z-20 text-white p-2 lg:p-6 text-xs lg:text-lg drop-shadow-lg">
          {{ feature?.title }}
        </h3>
      </NuxtLink>
    </div>
  </div>
  <div v-else>No data available</div>
</template>

<script setup lang="ts">
  import { useEntitesStore } from '../stores/entites.store'
  import type { typeFilter } from '../types/database.types'

  const entitesStore = useEntitesStore()

  const { data } = await useAsyncData('home-hero', () => queryCollection('pages').first())

  const getGridClass = (index: number) => {
    const baseClass = 'relative rounded-3xl overflow-hidden'
    const gridClasses: Record<number, string> = {
      0: 'row-span-1 col-start-1 row-start-1 mt-24',
      1: 'row-span-3 col-start-2 row-start-1',
      2: 'row-span-1 col-start-3 row-start-1 mt-24',
      3: 'row-span-2 col-start-1 row-start-2 mb-24',
      4: 'row-span-1 col-start-3 row-start-2 mb-24',
    }
    return `${baseClass} ${gridClasses[index] || ''}`
  }

  const addTypeFilter = (filterToAdd: typeFilter) => {
    if (filterToAdd !== ('genealogie' as typeFilter)) {
      entitesStore.typeFilter = filterToAdd
    }
  }

  const searchItem = (item: string) => {
    if (item === 'genealogie') {
      return '/genealogie'
    }
    return '#weekipedia'
  }

  const providerToUse = (img: string) => (img.includes('/images/') ? undefined : 'cloudinary')
</script>
