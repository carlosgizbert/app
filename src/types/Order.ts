interface OrderProduct {
  product: string,
  quantity: number
}

export interface Order {
	table: number
	products: OrderProduct[]
}
