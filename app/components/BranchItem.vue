<template>
  <div class="w-full grid grid-cols-1 grid-row-3 gap-4">
    <p class="text-center font-bold text-lg">{{ branchName }}</p>
    <div
      v-for="(couple, index) in branch"
      :key="index"
      class="w-full grid grid-cols-2 grid-rows-1 gap-4 justify-self-center"
    >
      <NuxtLink
        v-for="entite in couple"
        :key="entite.id"
        :to="`/entites/${entite.id}`"
        class="border border-primary rounded-lg p-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex gap-2"
      >
        <div v-if="entite.image_url" class="w-20 h-20 rounded-full overflow-hidden shrink-0">
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
</template>

<script setup lang="ts">
  import type { EntiteOnTree } from '~/types/genealogie.types'

  type Branch = EntiteOnTree[][]

  defineProps<{
    branch: Branch
    branchName: string
  }>()
</script>
