<template>
  <UApp :locale="fr">
    <div class="flex flex-col min-h-screen img-background">
      <HeaderItem />
      <main class="pt-28 px-4 flex-1">
        <NuxtPage />
      </main>
      <FooterItem />
    </div>
  </UApp>
</template>

<script setup="ts">
  import HeaderItem from '~/components/HeaderItem.vue'
  import FooterItem from '~/components/FooterItem.vue'
  import { fr } from '@nuxt/ui/locale'
</script>
