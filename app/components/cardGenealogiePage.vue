<template>
  <NuxtLink
    v-for="entite in props.couple"
    :key="entite.id"
    :to="`/entites/${entite.id}`"
    class="h-23.5 relative border border-primary rounded-lg px-1 py-2 sm:px-2.5 sm:py-4 backdrop-blur-xs hover:shadow-lg hover:bg-white transition flex flex-col md:flex-row gap-2"
    :class="[`col-start-${entite.place}`, couple.length === 1 ? 'w-1/2' : 'w-full']"
  >
    <div
      v-if="entite.image_url"
      class="w-7 h-7 sm:w-10 sm:h-10 lg:w-15 lg:h-15 rounded-full overflow-hidden shrink-0"
    >
      <NuxtImg
        format="webp"
        provider="cloudinary"
        :src="entite.image_url"
        :alt="`Image de${entite.nom}`"
        class="object-cover w-full h-full"
      />
    </div>
    <div
      class="overflow-hidden text-ellipsis flex w-full flex-col sm:flex-row md:flex-col justify-between"
    >
      <div class="flex justify-between items-start mb-2">
        <h3
          class="overflow-hidden text-ellipsis font-bold text-xs lg:text-sm 2xl:text-base text-black leading-none"
        >
          {{ entite.nom }}
        </h3>
      </div>
      <div
        v-if="entite.gender === 'Féminin'"
        class="text-lg lg:text-2xl font-bold flex items-center"
      >
        <UIcon name="gg:gender-female" />
      </div>
      <div
        v-else-if="entite.gender === 'Masculin'"
        class="text-lg lg:text-2xl font-bold flex items-center"
      >
        <UIcon name="gg:gender-male" />
      </div>
    </div>
    <div
      v-if="firstLine(entite)"
      class="absolute left-1/2 right-1/2 -top-19 h-19 w-px bg-primary pointer-events-none"
    />
  </NuxtLink>
  <div
    v-if="couple.length === 2 && !props.couple.some((e) => e.nom.includes('Morckoor'))"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 h-16 w-px bg-primary pointer-events-none"
  />
  <div
    v-if="secondLine"
    class="absolute right-1/2 top-27.5 h-px w-[26%] bg-primary pointer-events-none"
  />
  <div
    v-if="thirdLine"
    class="absolute left-1/2 top-27.5 -translate-x-1/2 h-px w-[52%] bg-primary pointer-events-none"
  />
</template>

<script setup lang="ts">
  import type { EntiteOnTree } from '~/types/genealogie.types'

  const props = defineProps<{
    couple: EntiteOnTree[]
  }>()

  const firstLine = (entite: EntiteOnTree) => {
    const firstLineNames = [
      'Skoor',
      'Noor',
      'Tengoor',
      'Golja',
      "Ot'Skoor",
      'Galdec',
      "Ot'Tengoor",
      'Queënzy',
      'Morckoor',
      'Olja',
      'Weëna',
      'Armskoor',
    ]
    return firstLineNames.includes(entite.nom)
  }

  const secondLine = computed(() =>
    props.couple.some((e) => e.nom.includes('Naounë') || e.nom.includes('Noor'))
  )

  const thirdLine = computed(() => props.couple.some((e) => e.nom.includes('Tengoor')))
</script>
