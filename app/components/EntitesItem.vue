<template>
  <NuxtLink
    v-for="entite in props.entites"
    :key="entite.id"
    :to="formateLink(entite.id)"
    class="border border-primary rounded-lg p-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex gap-2"
  >
    <div v-if="entite.image_url" class="w-20 h-20 rounded-full overflow-hidden shrink-0">
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
        <h3 class="font-bold text-lg text-black leading-none">{{ entite.nom }}</h3>
        <span class="text-xs bg-secondary text-white px-2 py-1 rounded capitalize">
          {{ entite.type }}
        </span>
      </div>

      <div v-if="entite.description">
        <p class="text-gray-600 text-sm mb-3 leading-4">
          {{ entite.description?.substring(0, 50) }}...
          <a href="#" class="font-bold text-primary hover:text-secondary">Lire la suite</a>
        </p>
      </div>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in entite.tags"
          :key="tag"
          class="text-xs bg-gray-300 text-black px-2 py-1 rounded"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import type { Entite } from '../types/database.types'

  const props = defineProps<{
    entites: Entite[]
  }>()

  const formateLink = (id: string) => {
    return `/entites/${id}`
  }
</script>
