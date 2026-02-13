import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  // Récupérer les paramètres de query (?type=personnage)
  const query = getQuery(event)
  const type = query.type as string | undefined

  let supabaseQuery = supabase.from('entites').select('*').order('created_at', { ascending: false })

  // Filtrer par type si fourni
  if (type && type !== 'tous') {
    supabaseQuery = supabaseQuery.eq('type', type)
  }

  const { data, error } = await supabaseQuery

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return data
})
