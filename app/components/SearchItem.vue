<template>
  <div>
    <div id="search" class="pt-10 mb-10 max-w-7xl mx-auto">
      <h1 class="font-heading text-5xl mb-6">Encyclopédie</h1>
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
            @click="addTypeFilter('tous')"
          >
            Tous
          </UButton>
          <UButton
            :color="typeFilter === 'personnage' ? 'primary' : 'secondary'"
            class="text-white px-4 py-2 rounded"
            @click="addTypeFilter('personnage')"
          >
            Personnages
          </UButton>
          <UButton
            :color="typeFilter === 'lieu' ? 'primary' : 'secondary'"
            class="text-white px-4 py-2 rounded"
            @click="addTypeFilter('lieu')"
          >
            Lieux
          </UButton>
          <UButton
            :color="typeFilter === 'creature' ? 'primary' : 'secondary'"
            class="text-white px-4 py-2 rounded"
            @click="addTypeFilter('creature')"
          >
            Créatures
          </UButton>
          <UButton
            :color="typeFilter === 'peuple' ? 'primary' : 'secondary'"
            class="text-white px-4 py-2 rounded"
            @click="addTypeFilter('peuple')"
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
        <EntitesItem :entites="entitesFilter" />
      </div>
    </div>
    <div ref="loadMoreTrigger" class="flex items-center justify-center">
      <UIcon
        v-if="isLoading"
        name="i-heroicons-arrow-path"
        class="w-8 mb-10 animate-spin text-primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
  import { useEntitesStore } from '../stores/entites.store'
  import EntitesItem from './EntitesItem.vue'
  import type { typeFilter } from '../types/database.types'
  import { storeToRefs } from 'pinia'

  const entitesStore = useEntitesStore()
  const { typeFilter, searchValue, entitesFilter, isLoading, isError, errorMessage } =
    storeToRefs(entitesStore)

  const loadMoreTrigger = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const addTypeFilter = (filterToAdd: typeFilter) => {
    if (filterToAdd !== ('genealogie' as typeFilter)) {
      entitesStore.typeFilter = filterToAdd
    }
  }

  let observer: IntersectionObserver | null = null

  onMounted(async () => {
    await entitesStore.getEntites()

    observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry) {
        isVisible.value = entry.isIntersecting
      }
    })

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }

    await nextTick()
    if (isVisible.value && entitesStore.hasMore) {
      await entitesStore.loadMore()
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  watch(isVisible, async (visible) => {
    if (visible && !isLoading.value && entitesStore.hasMore) {
      await entitesStore.loadMore()
    }
  })

  watch(typeFilter, async () => {
    await entitesStore.resetAndLoad()
    await nextTick()
    if (isVisible.value && entitesStore.hasMore) {
      await entitesStore.loadMore()
    }
  })

  const hasNoResults = computed(() => {
    return !isLoading.value && !isError.value && entitesFilter.value.length === 0
  })
</script>
