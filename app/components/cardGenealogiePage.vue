<template>
  <NuxtLink
    v-for="entite in couple"
    :key="entite.id"
    :to="`/entites/${entite.id}`"
    class="border border-primary rounded-lg p-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex gap-2"
    :class="[`col-start-${entite.place}`, couple.length === 1 ? 'w-1/2' : 'w-full']"
  >
    <div v-if="entite.image_url" class="w-15 h-15 rounded-full overflow-hidden shrink-0">
      <NuxtImg
        format="webp"
        provider="cloudinary"
        :src="entite.image_url"
        :alt="`Image de${entite.nom}`"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="flex w-full flex-col justify-between">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-md text-black leading-none">{{ entite.nom }}</h3>
      </div>
      <div v-if="entite.gender === 'Féminin'" class="text-2xl font-bold flex items-center">
        <UIcon name="gg:gender-female" />
      </div>
      <div v-else-if="entite.gender === 'Masculin'" class="text-2xl font-bold flex items-center">
        <UIcon name="gg:gender-male" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import type { EntiteOnTree } from '~/types/genealogie.types'

  defineProps<{
    couple: EntiteOnTree[]
  }>()
</script>
