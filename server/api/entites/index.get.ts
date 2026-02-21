import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const query = getQuery(event)
  const type = query.type as string | undefined
  const page = parseInt(query.page as string) || 1
  const pageSize = 9
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let supabaseQuery = supabase
    .from('entites')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('nom')

  if (type && type !== 'tous') {
    supabaseQuery = supabaseQuery.eq('type', type)
  }

  const { data, error, count } = await supabaseQuery

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return {
    data: data || [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  }
})
