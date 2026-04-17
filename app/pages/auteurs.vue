<template>
  <div>
    <div class="w-[90vw] md:max-w-7xl mx-auto flex flex-col items-center">
      <h1 class="text-5xl mb-6 font-heading">{{ data?.title }}</h1>
      <h2 class="text-1xl mb-12">{{ data?.subtitle }}</h2>

      <div class="w-full lg:w-[70%] flex gap-12 lg:gap-14 h-80 sm:h-100 lg:h-100">
        <NuxtLink
          v-for="writer in data?.writers"
          :key="writer.slot"
          :to="applySlot(writer?.slot)"
          class="relative rounded-lg lg:rounded-2xl overflow-hidden w-full h-full transition-transform duration-500"
          :class="route.query.tab === `${writer.slot}` ? 'scale-110' : 'scale-100'"
        >
          <div class="absolute inset-0 overflow-hidden">
            <NuxtImg
              provider="cloudinary"
              format="webp"
              :src="writer?.img"
              :alt="`Image de ${writer?.name}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div
            class="absolute inset-x-0 top-0 h-16 lg:h-30 bg-linear-to-b from-black/70 to-transparent z-10"
          />
          <h3
            class="absolute z-20 text-white px-2 py-3 lg:px-6 lg:py-6 text-xs lg:text-lg drop-shadow-lg"
          >
            {{ writer?.name }}
          </h3>
        </NuxtLink>
      </div>
    </div>
    <TabsWriter ref="tabsRef" />
  </div>
</template>

<script setup lang="ts">
  import TabsWriter from '../components/TabsWriters.vue'
  const { data } = await useAsyncData('auteurs', () => queryCollection('auteurs').first())
  const route = useRoute()

  const tabsRef = ref<InstanceType<typeof TabsWriter> | null>(null)

  const applySlot = (slot: string) => {
    return `/auteurs?tab=${slot}`
  }

  watch(
    () => route.query.tab,
    () => {
      nextTick(() => {
        tabsRef.value?.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  )
</script>
