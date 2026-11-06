export type TPlan = {
  id: string
  price: string
  name: string
  period: string
  badge?: string
}

export type TPlanFeature = {
  label: string
  isPremium: boolean
}