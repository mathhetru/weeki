import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { data: personnages, error } = await supabase
    .from('entites')
    .select('id, nom, gender, type, image_url')
    .eq('type', 'personnage')

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des personnages',
    })
  }

  const findByName = (nom: string) => {
    return personnages?.find((p) => p.nom.toLowerCase() === nom.toLowerCase())
  }

  return {
    // Souche = génération 0
    souche: [
      { ...findByName('Zaboor'), place: '3' },
      {
        ...findByName('Toolja'),
        place: '4',
      },
    ].filter((p) => p?.id),

    branches: {
      invisible: [
        // Génération 1 : Parents
        [{ ...findByName('Noor') }, { ...findByName('Brunilla') }].filter((p) => p?.id),
        // Génération 2 : Enfants
        [{ ...findByName('Galdec') }, { ...findByName('Kheëna') }].filter((p) => p?.id),
        // Génération 3 : Petits-enfants
        [{ ...findByName('Weëna') }].filter((p) => p?.id),
      ],

      maitresse: [
        [
          { ...findByName('Skoor'), place: '1' },
          { ...findByName('Naounë'), place: '2' },
        ].filter((p) => p?.id),
        [
          { ...findByName("Ot'Skoor"), place: '3' },
          { ...findByName('Eda'), place: '4' },
        ].filter((p) => p?.id),
        [{ ...findByName('Armskoor'), place: '5' }].filter((p) => p?.id),
      ],

      morte: [
        [{ ...findByName('Tengoor') }, { ...findByName('Golja') }].filter((p) => p?.id),
        [{ ...findByName("Ot'Tengoor") }, { ...findByName('Queënzy') }].filter((p) => p?.id),
        [{ ...findByName('Morckoor') }, { ...findByName('Olja') }].filter((p) => p?.id),
      ],
    },
  }
})
