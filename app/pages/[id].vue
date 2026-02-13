<template>
  <div>
    <p>id: {{ idEntite }}</p>
  </div>
</template>

<script setup lang="ts">
  // import { useEntitesStore } from '../stores/entites.store'
  const route = useRoute()
  const idEntite = ref<string>(route.params.id as string)
  // const entitesStore = useEntitesStore()

  // console.log(entitesStore.getEntiteById(idEntite))
</script>
