import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID manquant',
    })
  }

  const { data, error } = await supabase.from('entites').select('*').eq('id', id).single()

  if (error) {
    throw createError({
      statusCode: 404,
      message: 'Entité non trouvée',
    })
  }

  return data
})
