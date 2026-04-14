<template>
  <div class="w-full grid grid-cols-1 grid-row-3 gap-4">
    <p class="text-center font-bold text-lg">{{ branchName }}</p>
    <div
      v-for="(couple, index) in branch"
      :key="index"
      class="w-full grid grid-rows-1 gap-4 justify-items-center"
      :class="couple.length === 1 ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <cardGenealogiePage :couple="couple" />
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
