export type Item = {
  description: string
  quantity: string
}

export type OrderType = {
  id: string | number[]
  items: Item[]
  build: string
  createAt: string
  status: string
}


