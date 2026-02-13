import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Entite } from '~/types/database.types'

export const useEntitesStore = defineStore('entites', () => {
  const entites = ref<Entite[]>([])
  const typeFilter = ref<'tous' | 'personnage' | 'lieu' | 'creature'>('tous')
  const searchValue = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  //TODO rework types and error types
  const loadEntites = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Entite[]>('/api/entites', {
        params: typeFilter.value !== 'tous' ? { type: typeFilter.value } : {},
      })

      entites.value = data || []
    } catch (e) {
      const err = e as Error
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getEntiteById = async (id: string) => {
    try {
      return await $fetch<Entite>(`/api/entites/${id}`)
    } catch (e) {
      const err = e as Error
      error.value = err.message
      throw error
    }
  }

  const searchEntites = async (terme: string) => {
    if (!terme) {
      await loadEntites()
      return
    }

    loading.value = true
    error.value = null

    try {
      entites.value = await $fetch<Entite[]>('/api/entites/search', {
        params: { q: terme },
      })
    } catch (e) {
      const err = e as Error
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const entitesFilter = computed(() => {
    if (!searchValue.value) return entites.value

    return entites.value.filter((e) =>
      e.nom.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  })

  // // Ajouter une entité
  // const ajouterEntite = async (entite: Partial<Entite>) => {
  //   try {
  //     const nouvelleEntite = await $fetch('/api/entites', {
  //       method: 'POST',
  //       body: entite
  //     })

  //     await loadEntites() // Recharger la liste
  //     return nouvelleEntite
  //   } catch (e: any) {
  //     error.value = e.message
  //     throw e
  //   }
  // }

  // // Mettre à jour
  // const mettreAJourEntite = async (id: string, updates: Partial<Entite>) => {
  //   try {
  //     const entiteMaj = await $fetch(`/api/entites/${id}`, {
  //       method: 'PATCH',
  //       body: updates
  //     })

  //     await loadEntites() // Recharger la liste
  //     return entiteMaj
  //   } catch (e: any) {
  //     error.value = e.message
  //     throw e
  //   }
  // }

  // // Supprimer
  // const supprimerEntite = async (id: string) => {
  //   try {
  //     await $fetch(`/api/entites/${id}`, {
  //       method: 'DELETE'
  //     })

  //     await loadEntites() // Recharger la liste
  //   } catch (e: any) {
  //     error.value = e.message
  //     throw e
  //   }
  // }

  return {
    entites,
    typeFilter,
    searchValue,
    loading,
    error,
    entitesFilter,
    loadEntites,
    getEntiteById,
    searchEntites,
    // ajouterEntite,
    // mettreAJourEntite,
    // supprimerEntite
  }
})
