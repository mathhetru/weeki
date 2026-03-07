<template>
  <!-- TODO add breadcrumbs -->
  <div class="mx-auto w-[75%] max-w-7xl">
    <p v-if="pending">Chargement...</p>
    <div v-else-if="entite" class="flex flex-col gap-1.5">
      <h1 class="text-4xl font-heading mb-4">{{ entite.nom }}</h1>
      <div v-if="entite.gender === 'Féminin'" class="text-2xl font-bold flex items-center gap-1.5">
        <UIcon name="gg:gender-female" />
      </div>
      <div
        v-else-if="entite.gender === 'Masculin'"
        class="text-2xl font-bold flex items-center gap-1.5"
      >
        <UIcon name="gg:gender-male" />
      </div>
      <p class="capitalize">{{ entite.type }}</p>
      <p>Description : {{ entite.description }}</p>
      <p v-if="entite.vivant">Espèce vivante</p>
      <p v-if="entite.dangereux">Espèce dangeureuse</p>
      <p v-if="entite.hostile">Espèce hostile</p>
      <div v-if="entite.tomes" class="flex flex-row gap-1.5">
        <p v-if="entite.tomes.length > 1">Apparait dans les :</p>
        <p v-if="entite.tomes.length == 1">Apparait dans le :</p>
        <p v-for="(tome, index) in entite.tomes" :key="index">Tome {{ tome }}</p>
      </div>
      <p v-for="(relation, index) in entite.relations" :key="index">
        {{ relation }}
      </p>
      <p v-if="entite.lieu_id">Lieu : {{ entite.lieu_id }}</p>
      <NuxtImg
        v-if="entite.image_url"
        format="webp"
        provider="cloudinary"
        :src="entite.image_url"
        :alt="`Image de${entite.nom}`"
        class="w-75 h-auto rounded-lg object-cover"
      />
    </div>
    <div v-else-if="error">"Entitée non trouvée !"</div>
    <UButton
      aria-label="Retourner sur la page précédente"
      class="mt-10 mx-auto"
      @click="$router.back()"
    >
      <p>Retour</p>
    </UButton>
  </div>
</template>

<script setup lang="ts">
  import { useEntitesStore } from '../../stores/entites.store'
  import type { Entite } from '../../types/database.types'

  const route = useRoute()
  const idEntite = route.params.id
  const entitesStore = useEntitesStore()

  const {
    data: entite,
    error,
    pending,
  } = await useAsyncData<Entite>(`entite-${idEntite}`, () =>
    entitesStore.getEntiteById(idEntite as string)
  )
</script>
