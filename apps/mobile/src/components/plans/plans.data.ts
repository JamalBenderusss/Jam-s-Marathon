import type { TPlan, IPlanFeature } from '@app/types'

export const PLANS: TPlan[] = [
  {
    id: 'monthly',
    price: '$3.99',
    name: 'Monthly',
    period: 'Billed monthly'
  },
  {
    id: 'yearly',
    price: '$29.99',
    name: 'Yearly',
    period: 'Billed once a year',
    badge: 'Save 37%'
  }
]

export const PLAN_FEATURES: IPlanFeature[] = [
 {label: 'Movies, series, anime, books and games', isPremium: false},
 {label: 'Rating and reviews', isPremium: false},
 {label: 'Collections', isPremium: false},
 {label: 'AI Picker', isPremium: true},
 {label: 'Spoiler-free AI summaries', isPremium: true},
 {label: 'Full Taste DNA', isPremium: true},


]