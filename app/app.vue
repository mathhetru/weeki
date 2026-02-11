<template>
  <UApp :locale="fr">
    <HeaderItem />
    <NuxtLayout>
      <div class="pt-28 px-4">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </UApp>
</template>

<script setup="ts">
  import HeaderItem from '~/components/HeaderItem.vue'
  import { fr } from '@nuxt/ui/locale'
</script>
