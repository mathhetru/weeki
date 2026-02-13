import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  //TODO pagination
  const query = getQuery(event)
  const type = query.type as string | undefined

  let supabaseQuery = supabase.from('entites').select('*').order('created_at', { ascending: false })

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
