<script setup lang="ts">
  import { useEntitesStore } from '../stores/entites.store'
  import { storeToRefs } from 'pinia'
  const entitesStore = useEntitesStore()
  const { typeFilter } = storeToRefs(entitesStore)

  onMounted(() => {
    entitesStore.loadEntites()
  })

  watch(typeFilter, () => {
    entitesStore.loadEntites()
  })

  const formateLink = (id: string) => `/${id}`
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Encyclopédie</h1>

    <div class="mb-6 space-y-4">
      <input
        v-model="entitesStore.searchValue"
        type="text"
        placeholder="Rechercher..."
        class="border px-4 py-2 rounded w-full"
      >

      <div class="flex gap-2">
        <UButton
          :color="entitesStore.typeFilter === 'tous' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="entitesStore.typeFilter = 'tous'"
        >
          Tous
        </UButton>
        <UButton
          :color="entitesStore.typeFilter === 'personnage' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="entitesStore.typeFilter = 'personnage'"
        >
          Personnages
        </UButton>
        <UButton
          :color="entitesStore.typeFilter === 'lieu' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="entitesStore.typeFilter = 'lieu'"
        >
          Lieux
        </UButton>
        <UButton
          :color="entitesStore.typeFilter === 'creature' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="entitesStore.typeFilter = 'creature'"
        >
          Créatures
        </UButton>
      </div>
    </div>

    <!-- Liste des entités -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="entite in entitesStore.entitesFilter"
        :key="entite.id"
        :to="formateLink(entite.id)"
        class="border rounded-lg p-4 hover:shadow-lg transition"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg">{{ entite.nom }}</h3>
          <span class="text-xs bg-indigo-400 text-white px-2 py-1 rounded">
            {{ entite.type }}
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-3">{{ entite.description }}</p>

        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in entite.tags"
            :key="tag"
            class="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
