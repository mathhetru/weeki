<template>
  <div id="search" class="pt-30 pb-50 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Encyclopédie</h1>

    <div class="mb-6 space-y-4">
      <input
        v-model="searchValue"
        type="text"
        placeholder="Rechercher..."
        class="border px-4 py-2 rounded w-full"
      />

      <div class="flex gap-2">
        <UButton
          :color="typeFilter === 'tous' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="typeFilter = 'tous'"
        >
          Tous
        </UButton>
        <UButton
          :color="typeFilter === 'personnage' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="typeFilter = 'personnage'"
        >
          Personnages
        </UButton>
        <UButton
          :color="typeFilter === 'lieu' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="typeFilter = 'lieu'"
        >
          Lieux
        </UButton>
        <UButton
          :color="typeFilter === 'creature' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="typeFilter = 'creature'"
        >
          Créatures
        </UButton>
        <UButton
          :color="typeFilter === 'peuple' ? 'primary' : 'secondary'"
          class="text-white px-4 py-2 rounded"
          @click="typeFilter = 'peuple'"
        >
          Peuples
        </UButton>
      </div>
    </div>

    <div v-if="isError" class="border border-red-300 bg-red-50 rounded-lg p-4 mb-6">
      <div class="flex items-start gap-3">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600 shrink-0" />
        <div class="flex-1">
          <h3 class="font-bold text-red-800">Erreur de chargement</h3>
          <p class="text-red-700 text-sm mt-1">{{ errorMessage }}</p>
        </div>
        <button
          class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          @click="entitesStore.resetAndLoad()"
        >
          Réessayer
        </button>
      </div>
    </div>

    <div v-if="hasNoResults" class="flex flex-col items-center justify-center py-20">
      <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Aucun résultat</h3>
      <p class="text-gray-500">Aucune entité ne correspond à vos critères de recherche.</p>
    </div>

    <div
      v-if="entitesFilter.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <NuxtLink
        v-for="entite in entitesFilter"
        :key="entite.id"
        :to="formateLink(entite.id)"
        class="border rounded-lg p-4 hover:shadow-lg hover:bg-white transition"
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

    <div ref="loadMoreTrigger" class="h-20 flex items-center justify-center">
      <UIcon
        v-if="isLoading"
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEntitesStore } from '../stores/entites.store'
  import { storeToRefs } from 'pinia'

  const entitesStore = useEntitesStore()
  const { typeFilter, searchValue, entitesFilter, isLoading, isError, errorMessage } =
    storeToRefs(entitesStore)

  const loadMoreTrigger = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(async () => {
    await entitesStore.loadEntites()

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        isVisible.value = entry.isIntersecting
      }
    })

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  watch(isVisible, async (visible) => {
    if (visible && !isLoading.value) {
      await entitesStore.loadMore()
    }
  })

  watch(typeFilter, async () => {
    await entitesStore.resetAndLoad()
  })

  const formateLink = (id: string) => `/entites/${id}`

  const hasNoResults = computed(() => {
    return !isLoading.value && !isError.value && entitesFilter.value.length === 0
  })
</script>
