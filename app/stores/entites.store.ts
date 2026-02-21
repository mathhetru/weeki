import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Entite } from '~/types/database.types'

export const useEntitesStore = defineStore('entites', () => {
  const entites = ref<Entite[]>([])
  const typeFilter = ref<'tous' | 'personnage' | 'lieu' | 'creature' | 'peuple'>('tous')
  const searchValue = ref<string>('')
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref('')
  const currentPage = ref(1)
  const hasMore = ref(true)

  const loadEntites = async () => {
    if (!hasMore.value) return
    isError.value = false
    errorMessage.value = ''
    isLoading.value = true
    try {
      const response = await $fetch('/api/entites', {
        params: {
          type: typeFilter.value !== 'tous' ? typeFilter.value : undefined,
          page: currentPage.value,
        },
      })

      entites.value = [...entites.value, ...(response.data || [])]
      hasMore.value = currentPage.value < response.totalPages
    } catch (e) {
      const err = e as Error
      isError.value = true
      errorMessage.value = err.message || 'Une erreur est survenue'
    } finally {
      isLoading.value = false
    }
  }

  const loadMore = () => {
    if (hasMore.value && !isLoading.value) {
      currentPage.value++
      loadEntites()
    }
  }

  const resetAndLoad = () => {
    entites.value = []
    currentPage.value = 1
    hasMore.value = true
    loadEntites()
  }

  const getEntiteById = async (id: string) => {
    try {
      return await $fetch<Entite>(`/api/entites/${id}`)
    } catch (e) {
      const err = e as Error
      isError.value = true
      errorMessage.value = err.message
      throw err
    }
  }

  const searchEntites = async (terme: string) => {
    if (!terme) {
      await loadEntites()
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      entites.value = await $fetch<Entite[]>('/api/entites/search', {
        params: { q: terme },
      })
    } catch (e) {
      const err = e as Error
      isError.value = true
      errorMessage.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const entitesFilter = computed(() => {
    if (!searchValue.value) return entites.value

    return entites.value.filter((e) =>
      e.nom.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  })

  return {
    entites,
    typeFilter,
    searchValue,
    isLoading,
    isError,
    errorMessage,
    entitesFilter,
    loadMore,
    loadEntites,
    resetAndLoad,
    getEntiteById,
    searchEntites,
  }
})
