import { z } from 'zod'
import {REVIEW_RATING, REVIEW_TEXT} from '@app/constants'

export const reviewSchema = z.object({
  rating: z
    .number({error: 'Rate the title'})
    .int()
    .min(REVIEW_RATING.min)
    .max(REVIEW_RATING.max),
  text: z
    .string()
    .trim()
    .max(REVIEW_TEXT.max, {
      message: `Up to ${REVIEW_TEXT.max} characters`
    })
    .refine(text => !text || text.length >= REVIEW_TEXT.min, {
      message: `At least ${REVIEW_TEXT.min} characters or leave it empty`
    })
})

export type TReviewSchema = z.infer<typeof reviewSchema>
