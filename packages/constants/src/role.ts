// pnpm --filter @app/constants add @app/api

import type {CreatorRole} from "@app/api";

export const CREATOR_ROLE_LABEL: Record<CreatorRole, string> = {
  DIRECTOR: 'Director',
  CREATOR: 'Created by',
  STUDIO: 'Studio',
  AUTHOR: 'Author'
}