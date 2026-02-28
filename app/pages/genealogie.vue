<template>
  <div class="pt-15 pb-50 max-w-7xl mx-auto">
    <h1 class="text-5xl mb-6 font-heading">Généalogie</h1>
    <h2 class="text-1xl mb-6">Retrouvez les arbres généalogiques des personnages principaux</h2>

    <div class="my-15">
      <div v-if="pending" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary" />
      </div>

      <div v-else-if="error" class="text-red-600 text-center py-20">
        Erreur lors du chargement de l'arbre généalogique
      </div>

      <div v-else-if="entite" class="flex flex-col items-center gap-8 p-5">
        <!-- SOUCHE EN HAUT -->
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">La Souche</h3>
          <div class="flex gap-8 justify-center">
            <template v-for="(generation, index) in entite.souche" :key="index">
              <div class="flex gap-1.5 relative items-start">
                <NuxtLink
                  v-for="personne in generation"
                  :key="personne.id"
                  :to="`/entites/${personne.id}`"
                  class="person-card"
                  :class="{ feminine: personne.espece === 'feminine' }"
                >
                  <div class="name">{{ personne.nom }}</div>
                  <div class="role">{{ personne.espece || personne.type }}</div>
                </NuxtLink>
                <div v-if="generation.length === 2" class="marriage-line" />
              </div>
            </template>
          </div>
        </div>

        <!-- LIGNE DE CONNEXION -->
        <div class="connection-line-vertical" />

        <!-- LES 3 BRANCHES CÔTE À CÔTE -->
        <div class="flex gap-8 items-start justify-center">
          <div
            v-for="(branche, brancheNom) in entite.branches"
            :key="brancheNom"
            class="flex flex-col items-center gap-4"
          >
            <h3 class="text-xl font-bold capitalize">Branche {{ brancheNom }}</h3>

            <template v-for="(generation, index) in branche" :key="index">
              <div class="flex gap-8 content-center flex-wrap justify-center">
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
                    :class="{ feminine: personne.espece === 'feminine' }"
                  >
                    <div class="name">{{ personne.nom }}</div>
                    <div class="role">{{ personne.espece || personne.type }}</div>
                  </NuxtLink>
                  <div v-if="groupe.length === 2" class="marriage-line" />
                </div>
              </div>
              <div v-if="index < branche.length - 1" class="connection-line" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    data: entite,
    error,
    pending,
  } = await useAsyncData('tree', () => $fetch(`/api/genealogie/families`))
</script>

<style scoped>
  .person-card {
    width: 150px;
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

  .person-card.feminine {
    border-color: #a855f7;
    background: #faf5ff;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 5px;
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
    height: 30px;
    background: #9ca3af;
  }

  .connection-line-vertical {
    width: 2px;
    height: 50px;
    background: #9ca3af;
  }
</style>
