export type EntiteType = 'personnage' | 'lieu' | 'creature'

export type typeFilter = 'tous' | 'personnage' | 'lieu' | 'creature' | 'peuple'

export type Entite = {
  id: string
  created_at: string
  nom: string
  type: EntiteType
  type2?: string
  description?: string
  image_url?: string
  tags?: string[]
  espece?: string
  vivant?: boolean
  dangereux?: boolean
  tomes?: string[]
  relations?: string[]
  lieu_id?: string
  gender?: string
}
