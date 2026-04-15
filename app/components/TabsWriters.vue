<template>
  <UTabs v-model="active" size="xl" :items="writers" class="mt-20 w-[90vw] md:max-w-7xl mx-auto">
    <template v-for="writer in data?.writers" :key="writer.slot" #[writer.slot]>
      <div class="pt-10 px-20 pb-30 bg-white/50 rounded-lg shadow-lg">
        <h2 class="text-center text-8xl mb-20 font-heading">{{ writer.name }}</h2>

        <p class="whitespace-pre-line">{{ writer.text }}</p>
      </div>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
  import type { TabsItem } from '@nuxt/ui'
  const { data } = useNuxtData('auteurs')

  const route = useRoute()
  const router = useRouter()

  const writers: TabsItem[] = [
    { label: 'Alice Picard', slot: 'alice-picard' },
    { label: 'Corbeyran', slot: 'corbeyran' },
    { label: 'Elsa Brants', slot: 'elsa-brants' },
  ]

  const active = computed({
    get() {
      const tab = route.query.tab as string
      const index = writers.findIndex((w) => w.slot === tab)
      return index >= 0 ? String(index) : '0'
    },
    set(index: number) {
      const writer = writers[index]
      if (writer) {
        router.push({ query: { tab: writer.slot } })
      }
    },
  })
</script>
