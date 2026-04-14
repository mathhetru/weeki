<template>
  <div>
    <div class="pt-15 mb-10 max-w-7xl mx-auto">
      <h1 class="text-5xl mb-6 font-heading">Généalogie</h1>
      <h2 class="text-1xl mb-6">Retrouvez les arbres généalogiques des personnages principaux</h2>
    </div>

    <div class="w-full h-full bg-white/20 backdrop-blur-xs rounded-4xl py-10 shadow-lg">
      <div class="w-360 mx-auto">
        <div v-if="isLoading" class="flex justify-center py-20">
          <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary" />
        </div>

        <div v-else-if="isError" class="text-red-600 text-center py-20">
          Erreur lors du chargement de l'arbre généalogique : {{ errorMessage }}
        </div>

        <div v-else-if="tree" class="flex flex-col items-center gap-8 scroll-auto">
          <div class="w-full">
            <!-- premier bloc : SOUCHE -->
            <h3 class="text-center text-2xl font-bold mb-4">La Souche</h3>
            <div class="grid grid-cols-6 gap-4">
              <NuxtLink
                v-for="entite in souche"
                :key="entite.id"
                :to="`/entites/${entite.id}`"
                class="border border-primary rounded-lg p-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex gap-2"
                :class="`col-start-${entite.place}`"
              >
                <div
                  v-if="entite.image_url"
                  class="w-20 h-20 rounded-full overflow-hidden shrink-0"
                >
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
                  </div>
                  <div
                    v-if="entite.gender === 'Féminin'"
                    class="text-2xl font-bold flex items-center gap-1.5"
                  >
                    <UIcon name="gg:gender-female" />
                  </div>
                  <div
                    v-else-if="entite.gender === 'Masculin'"
                    class="text-2xl font-bold flex items-center gap-1.5"
                  >
                    <UIcon name="gg:gender-male" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="w-full flex flex-row justify-between gap-4">
            <!-- second bloc : LES 3 BRANCHES -->
            <BranchItem :branch="masterBranch" :branch-name="'Branche Maitresse'" />
            <BranchItem :branch="invisibleBranch" :branch-name="'Branche Invisible'" />
            <BranchItem :branch="deadBranch" :branch-name="'Branche Morte'" />
          </div>
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
