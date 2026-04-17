import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Branch, EntiteOnTree, Tree } from '~/types/genealogie.types'

export const useGenealogieStore = defineStore('genealogie', () => {
  const tree = ref<Tree>({ souche: [], branches: { invisible: [], morte: [], maitresse: [] } })
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref('')

  const getEntitesOnTree = async () => {
    isLoading.value = true
    isError.value = false

    try {
      const data = await $fetch<Tree>(`/api/genealogie/families`)
      tree.value = data
    } catch (e) {
      const err = e as Error
      isError.value = true
      errorMessage.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const souche = computed(() => tree.value?.souche)

  const branchs = computed<Branch>(() => tree.value?.branches as Branch)

  const invisibleBranch = computed<EntiteOnTree[][]>(() => branchs.value?.invisible || [])

  const deadBranch = computed<EntiteOnTree[][]>(() => branchs.value?.morte || [])

  const masterBranch = computed<EntiteOnTree[][]>(() => branchs.value?.maitresse || [])

  const loadTree = async () => {
    await getEntitesOnTree()
  }

  return {
    getEntitesOnTree,
    isError,
    isLoading,
    errorMessage,
    tree,
    souche,
    branchs,
    invisibleBranch,
    deadBranch,
    masterBranch,
    loadTree,
  }
})
