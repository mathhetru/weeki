import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const query = getQuery(event)
  const searchTerm = query.q as string

  if (!searchTerm) {
    throw createError({
      statusCode: 400,
      message: 'Terme de recherche manquant',
    })
  }

  const { data, error } = await supabase.from('entites').select('*').ilike('nom', `%${searchTerm}%`)

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return data
})
