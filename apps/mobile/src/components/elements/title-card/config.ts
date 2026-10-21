import type { TitleListItemResponseType } from '../../../../../../packages/api/src/generated/models'
import {
  BookOpen,
  Film,
  Gamepad2,
  type LucideIcon,
  Sparkles,
  Tv
} from 'lucide-react-native'

import { radius } from '@app/tokens'

interface ICardConfig {
  radius: number
  icon: LucideIcon
  stacked?: boolean
  spine?: boolean
  glow?: string
  color?: string
}

export const CARD_CONFIG: Record<TitleListItemResponseType, ICardConfig> = {
  MOVIE: { radius: radius.md, icon: Film, color: 'rgba(255, 0, 0, 0.6)' },
  TV_SHOW: {
    radius: radius.md,
    icon: Tv,
    stacked: true,
    color: 'rgba(0, 255, 0, 0.6)'
  },
  ANIME: {
    radius: radius.md,
    icon: Sparkles,
    glow: 'rgba(129, 65, 248, 0.6)',
    color: 'rgba(129, 65, 248, 0.6)',
  },
  BOOK: {
    radius: radius.sm,
    icon: BookOpen,
    spine: true,
    color: 'rgba(255, 255, 0, 0.6)'
  },
  GAME: { radius: radius.lg, icon: Gamepad2, color: 'rgba(0, 0, 255, 0.6)' }
}
