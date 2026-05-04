export interface ArrayPair {
  values: string[]
  length: number
}

export interface Summary {
  provinces: ArrayPair
  dynasties: ArrayPair
  categories: ArrayPair
  total: number
}

export interface BuildingSlug {
  hash: string
  name: string
  desc: string
  provinces: string[]
  dynasties: string[]
  categories: string[]
}

export interface SplitPage {
  total: number
  page: number
  pageSize: number
  items: BuildingSlug[]
}
