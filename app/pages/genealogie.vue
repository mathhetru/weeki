<template>
  <div class="pt-15 mb-10 max-w-7xl mx-auto">
    <h1 class="text-5xl mb-6 font-heading">Généalogie</h1>
    <h2 class="text-1xl mb-6">Retrouvez les arbres généalogiques des personnages principaux</h2>

    <div class="my-15">
      <div v-if="isLoading" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary" />
      </div>

      <div v-else-if="isError" class="text-red-600 text-center py-20">
        Erreur lors du chargement de l'arbre généalogique : {{ errorMessage }}
      </div>

      <div v-else-if="tree" class="flex flex-col items-center gap-8 p-5">
        <div class="w-full h-100 grid grid-rows-6 grid-cols-6 gap-3">
          <!-- SOUCHE -->
          <div class="text-center">
            <h3 class="text-2xl font-bold mb-4">La Souche</h3>
            <div class="flex gap-8 justify-center">
              <template v-for="(entite, index) in souche" :key="index">
                <div class="flex gap-1.5 relative items-start">
                  <NuxtLink :key="entite.id" :to="`/entites/${entite.id}`" class="person-card">
                    <p class="name">{{ entite.nom }}</p>
                    <p class="role">{{ entite.type }}</p>
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
                  </NuxtLink>
                </div>
              </template>
            </div>
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

  const { tree, souche, isError, isLoading, errorMessage } = storeToRefs(genealogieStore)
</script>

<style lang="css">
  v-down::after {
    content: '';
    display: block;
    width: 1px;
    height: 28px;
    background-color: #d1d5db; /* gray-300 */
    margin: 0 auto;
  }

  /* ① Ligne verticale courte qui monte de chaque enfant */
  ul.level > li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 28px;
    background-color: #d1d5db;
  }

  /* ② Barre horizontale sur toute la largeur du LI */
  ul.level > li::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #d1d5db;
  }

  /* Coupe le côté gauche du premier enfant */
  ul.level > li:first-child::after {
    left: 50%;
  }

  /* Coupe le côté droit du dernier enfant */
  ul.level > li:last-child::after {
    right: 50%;
  }

  /* Enfant unique : pas de barre */
  ul.level > li:first-child:last-child::after {
    display: none;
  }
</style>
