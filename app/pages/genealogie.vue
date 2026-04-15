<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl mb-6 font-heading">Généalogie</h1>
      <h2 class="text-1xl mb-6">Retrouvez les arbres généalogiques des personnages principaux</h2>
    </div>

    <div class="w-full h-full max-w-7xl mx-auto relative">
      <div class="mx-auto">
        <div v-if="isLoading" class="flex justify-center py-20">
          <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary" />
        </div>

        <div v-else-if="isError" class="text-red-600 text-center py-20">
          Erreur lors du chargement de l'arbre généalogique : {{ errorMessage }}
        </div>

        <div v-else-if="tree" class="flex flex-col items-center gap-8 scroll-auto py-5">
          <div class="w-full">
            <!-- premier bloc : SOUCHE -->
            <h3 class="text-center font-heading text-3xl mb-10">La Souche</h3>
            <div class="grid grid-cols-6 gap-4 mb-15 relative">
              <CardGenealogiePage :couple="souche" />
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-4 bg-primary pointer-events-none"
              />
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 h-16 w-px bg-primary pointer-events-none"
              />
              <div
                class="absolute left-1/2 top-27.5 -translate-x-1/2 h-px w-[85%] bg-primary pointer-events-none"
              />
            </div>
          </div>
          <div class="w-full flex flex-row justify-between gap-8">
            <!-- second bloc : LES 3 BRANCHES -->
            <BranchItem :branch="masterBranch" :branch-name="'Branche Maitresse'" />
            <BranchItem :branch="invisibleBranch" :branch-name="'Branche Invisible'" />
            <BranchItem :branch="deadBranch" :branch-name="'Branche Morte'" />
          </div>
        </div>
      </div>
      <div
        class="absolute flex justify-center items-center w-full h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200/50 backdrop-blur-xs rounded-2xl"
      >
        <div>
          <p class="mx-auto text-center">Après plusieurs millénaires</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useGenealogieStore } from '../stores/genealogie.store'

  const genealogieStore = useGenealogieStore()
  await genealogieStore.loadTree()

  const {
    tree,
    souche,
    isError,
    isLoading,
    errorMessage,
    invisibleBranch,
    deadBranch,
    masterBranch,
  } = storeToRefs(genealogieStore)
</script>
