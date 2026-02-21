<template>
  <div class="pt-15 pb-50 max-w-7xl mx-auto">
    <h1 class="text-5xl mb-6 font-heading">Généalogie</h1>
    <h2 class="text-1xl mb-6">Retrouvez les arbres généalogiques des personnages principaux</h2>

    <div class="my-15">
      <div class="my-8 flex flex-row gap-3 items-center">
        <label class="block m-0 font-semibold">Choisir une famille :</label>
        <USelect
          v-model="selectedFamilyRoot"
          icon="i-lucide-search"
          :items="families"
          class="border px-4 py-2 rounded min-w-60"
        />
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary" />
      </div>

      <div v-else-if="error" class="text-red-600 text-center py-20">
        Erreur lors du chargement de l'arbre généalogique
      </div>

      <div v-else-if="entite" class="flex flex-col items-center gap-4 p-5">
        <template v-for="(generation, index) in entite" :key="index">
          <div class="flex gap-8 content-center flex-wrap">
            <div
              v-for="(groupe, gIndex) in generation"
              :key="gIndex"
              class="flex gap-1.5 relative items-start"
            >
              <NuxtLink
                v-for="personne in groupe"
                :key="personne.id"
                :to="`/entites/${personne.id}`"
                class="person-card"
                :class="{ highlight: personne.highlight }"
              >
                <div class="name">{{ personne.nom }}</div>
                <div class="role">{{ personne.espece || personne.type }}</div>
              </NuxtLink>

              <div v-if="groupe.length === 2" class="marriage-line" />
            </div>
          </div>

          <div v-if="index < entite.length - 1" class="connection-line" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { EntiteTree } from '../types/database.types'

  const selectedFamilyRoot = ref("Famille d'Abraracourcix")
  const families = ref(["Famille d'Abraracourcix", 'Famille de Panoramix', "Famille d'Astérix"])

  const {
    data: entite,
    error,
    pending,
  } = await useAsyncData<EntiteTree[][][]>(
    () => `tree-${selectedFamilyRoot.value}`,
    () => $fetch(`/api/genealogie/${selectedFamilyRoot.value}`)
  )
</script>

<style scoped>
  .person-card {
    width: 180px;
    padding: 20px;
    background: white;
    border: 3px solid #3b82f6;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    text-decoration: none;
    color: inherit;
  }

  .person-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .person-card.highlight {
    border-color: #a855f7;
    background: #faf5ff;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .role {
    font-size: 14px;
    color: #6b7280;
    font-style: italic;
  }

  .marriage-line {
    position: absolute;
    width: 10px;
    height: 3px;
    background: #ef4444;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .connection-line {
    width: 2px;
    height: 40px;
    background: #9ca3af;
    position: relative;
  }

  .connection-line::before,
  .connection-line::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 2px;
    background: #9ca3af;
    top: 0;
  }

  .connection-line::before {
    left: -150px;
  }

  .connection-line::after {
    right: -150px;
  }
</style>
