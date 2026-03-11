<template>
  <NuxtLink
    v-for="entite in props.entites"
    :key="entite.id"
    :to="formateLink(entite.id)"
    class="border rounded-lg p-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex gap-2"
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
        <h3 class="font-bold text-lg">{{ entite.nom }}</h3>
        <span class="text-xs bg-indigo-400 text-white px-2 py-1 rounded">
          {{ entite.type }}
        </span>
      </div>

      <div v-if="entite.description">
        <p class="text-gray-600 text-sm mb-3">
          {{ entite.description?.substring(0, 60) }}...
          <a href="#" class="font-bold text-indigo-900 hover:text-indigo-400">Lire la suite</a>
        </p>
      </div>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in entite.tags"
          :key="tag"
          class="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded"
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
