export type EntiteType = 'personnage' | 'lieu' | 'creature'

export type typeFilter = 'tous' | 'personnage' | 'lieu' | 'creature' | 'peuple'

export type Entite = {
  id: string
  created_at: string
  nom: string
  type: EntiteType
  description?: string
  image_url?: string
  tags?: string[]
  espece?: string
  vivant?: boolean
  dangereux?: boolean
  hostile?: boolean
  tomes?: string[]
  relations?: string[]
  lieu_id?: string
}

export interface EntiteTree {
  id: string
  nom: string
  espece?: string
  type?: string
  highlight?: boolean
}
