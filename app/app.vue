<template>
  <UApp :locale="fr">
    <div class="flex flex-col min-h-screen img-background bg-default" data-vaul-drawer-wrapper>
      <HeaderItem />
      <NuxtLayout>
        <div class="pt-28 px-4 flex-1">
          <NuxtPage />
        </div>
      </NuxtLayout>
      <FooterItem />
    </div>
  </UApp>
</template>

<script setup="ts">
  import HeaderItem from '~/components/HeaderItem.vue'
  import FooterItem from '~/components/FooterItem.vue'
  import { fr } from '@nuxt/ui/locale'
</script>
