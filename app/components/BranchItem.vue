<template>
  <div class="w-full grid grid-cols-1 grid-row-3 gap-2 sm:gap-4 gap-y-23 sm:gap-y-23">
    <div
      v-for="(couple, index) in branch"
      :key="index"
      class="w-full grid grid-rows-1 gap-2 sm:gap-4 justify-items-center relative"
      :class="couple.length === 1 ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <cardGenealogiePage :couple="couple" />
      <div
        v-if="couple.length === 2"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-2 sm:w-4 bg-primary pointer-events-none"
      />
    </div>
    <p class="text-center font-heading text-1xl md:text-2xl lg:text-3xl -mt-20 lg:-mt-13">
      {{ branchName }}
    </p>
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
