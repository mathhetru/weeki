export type EntiteOnTree = {
  id: string
  nom: string
  type: string
  gender: string
}

export type Branch = {
  invisible: EntiteOnTree[][]
  morte: EntiteOnTree[][]
  maitresse: EntiteOnTree[][]
}

export type Tree = {
  souche: EntiteOnTree[]
  branches: Branch
}
