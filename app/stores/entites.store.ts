import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Entite, EntiteTree, typeFilter } from '~/types/database.types'

export const useEntitesStore = defineStore('entites', () => {
  const entites = ref<Entite[]>([])
  const typeFilter = ref<typeFilter>('tous')
  const searchValue = ref<string>('')
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref('')
  const currentPage = ref(1)
  const hasMore = ref(true)
  const tree = ref<EntiteTree[][][]>([])

  const getEntites = async () => {
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
      return getEntites()
    }
  }

  const resetAndLoad = () => {
    entites.value = []
    currentPage.value = 1
    hasMore.value = true
    return getEntites()
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
      await getEntites()
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

  const getEntitesOnTree = async (selectedFamilyRoot: string) => {
    isLoading.value = true
    isError.value = false

    try {
      const data = await $fetch<EntiteTree[][][]>(`/api/genealogie/${selectedFamilyRoot}`)
      tree.value = data
    } catch (e) {
      const err = e as Error
      isError.value = true
      errorMessage.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const resetFilters = () => {
    typeFilter.value = 'tous'
    searchValue.value = ''
    currentPage.value = 1
    hasMore.value = true
    entites.value = []
  }

  return {
    entites,
    typeFilter,
    searchValue,
    isLoading,
    isError,
    errorMessage,
    entitesFilter,
    loadMore,
    getEntites,
    resetAndLoad,
    getEntiteById,
    searchEntites,
    getEntitesOnTree,
    resetFilters,
  }
})
