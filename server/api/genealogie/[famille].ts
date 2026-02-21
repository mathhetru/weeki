import { serverSupabaseClient } from '#supabase/server'

type characterInTree = {
  id: string
  nom: string
  espece: string
  type: string
  highlight?: boolean
}

export default defineEventHandler(async (event) => {
  const famille = getRouterParam(event, 'famille')
  const supabase = await serverSupabaseClient(event)

  const { data: personnages, error } = await supabase
    .from('entites')
    .select('id, nom, espece, type')
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

  const arbres: Record<string, characterInTree[][][]> = {
    abraracourcix: [
      // Génération 1 : Grands-parents (couples séparés)
      [
        [
          { ...findByName('Panoramix'), highlight: false },
          { ...findByName('Agecanonix'), highlight: false }, // Invente sa femme ou laisse seul
        ].filter((p) => p?.id),
      ],
      // Génération 2 : Parents (couple)
      [
        [
          { ...findByName('Abraracourcix'), highlight: true },
          // Tu peux ajouter Bonemine si tu l'as en BDD
        ].filter((p) => p?.id),
      ],
      // Génération 3 : Enfants (frères/sœurs séparés)
      [
        [{ ...findByName('Astérix'), highlight: false }].filter((p) => p?.id),
        [{ ...findByName('Obélix'), highlight: false }].filter((p) => p?.id),
      ],
    ],
    panoramix: [
      [[{ ...findByName('Panoramix'), highlight: true }].filter((p) => p?.id)],
      [[{ ...findByName('Astérix'), highlight: false }].filter((p) => p?.id)],
    ],
    asterix: [
      [[{ ...findByName('Panoramix'), highlight: false }].filter((p) => p?.id)],
      [
        [{ ...findByName('Astérix'), highlight: true }].filter((p) => p?.id),
        [{ ...findByName('Obélix'), highlight: false }].filter((p) => p?.id),
      ],
    ],
  }

  return arbres[famille as string] || arbres.abraracourcix
})
