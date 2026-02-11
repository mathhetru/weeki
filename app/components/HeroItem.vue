<template>
  <div
    v-if="data"
    class="mx-auto w-[75%] flex flex-row gap-4 rounded-4xl bg-white/30 p-10 shadow-lg items-center mt-15 h-150"
  >
    <div class="w-[30%] h-full flex flex-col gap-4 text-center justify-center mx-12">
      <h1 class="text-4xl font-heading">{{ data?.hero?.heading }}</h1>
      <p>{{ data?.hero?.description }}</p>
    </div>
    <div class="w-[70%] grid grid-rows-2 grid-cols-3 gap-6 h-full">
      <NuxtLink
        v-for="(feature, index) in data.features"
        :key="feature.title"
        :to="`#${feature?.title.toLowerCase()}`"
        :class="getGridClass(index)"
      >
        <div class="absolute inset-0">
          <NuxtImg
            :src="feature?.img"
            :alt="`Image de ${feature?.title}`"
            class="w-full h-full object-cover"
          />
        </div>
        <h3 class="absolute z-10 text-white p-6 text-lg drop-shadow-lg">
          {{ feature?.title }}
        </h3>
      </NuxtLink>
    </div>
  </div>
  <div v-else>No data available</div>
</template>

<script setup="ts">
  const { data } = await useAsyncData('home-hero', () => queryCollection('pages').first())

  const getGridClass = (index) => {
    const baseClass = 'relative rounded-3xl overflow-hidden'
    const gridClasses = {
      0: 'row-span-1 col-start-1 row-start-1 mt-24',
      1: 'row-span-3 col-start-2 row-start-1',
      2: 'row-span-1 col-start-3 row-start-1 mt-24',
      3: 'row-span-2 col-start-1 row-start-2 mb-24',
      4: 'row-span-1 col-start-3 row-start-2 mb-24',
    }
    return `${baseClass} ${gridClasses[index] || ''}`
  }
</script>
