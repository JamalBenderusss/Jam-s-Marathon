import {router, useLocalSearchParams} from "expo-router";
import {useDiscoverFindByKey, useDiscoverFindMyState} from "@app/api";
import {useSaveReview} from "@/hooks/useSaveReview";
import {Controller, useForm} from "react-hook-form";
import {reviewSchema, type TReviewSchema} from "@app/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Text, View, StyleSheet} from "react-native";
import {Input, ScreenTitle, SheetFooter} from "@/components/ui";
import {RatingSlider} from "@/components/detail";
import {colors, fontSize, space} from "@app/tokens";

export default function ReviewSheet() {
  const {key} = useLocalSearchParams<{ key: string }>()
  const { data: title } = useDiscoverFindByKey(key)
  const { data: myState } = useDiscoverFindMyState(key)

  const review = myState?.data.review ?? null
  const titleName = title?.status === 200 ? title.data.name : null

  const {saveReview, isSaving} = useSaveReview(key, review?.id ?? null)

   const {
     control,
     handleSubmit,
     formState: {isValid, errors},
     setError
   } = useForm<TReviewSchema>({
     resolver: zodResolver(reviewSchema),
     mode: 'onChange',
     defaultValues: {
       rating: review?.rating,
       text: review?.text ?? ''
     }
   })

   const onSubmit = handleSubmit((values => {
     saveReview(values, router.back, errorMessage => {
       setError('root', {
         message: errorMessage ?? 'Could not save your review. Please try again later'
       })
     })
   }))

   return (
     <View style={styles.root}>
       <ScreenTitle> How was it?</ScreenTitle>

       {!!titleName && <Text style={styles.subtitle}> {titleName} </Text>}

       <Controller
         control={control}
         name='rating'
         render={({field}) => (
           <RatingSlider
             value={field.value ?? null}
             onChange={field.onChange}
           />
         )}
       />

       <Controller
         control={control}
         name='text'
         render={({field, fieldState}) => (
           <Input
             multiline
             placeholder='Share your thoughts (optional)'
             value={field.value}
             onChangeText={field.onChange}
             onBlur={field.onBlur}
             error={fieldState.error?.message}
           />
         )}
       />

         {!!errors.root && <Text style={styles.error}>{errors.root.message} </Text>}

       <SheetFooter
         submitLabel={review ? 'Save' : 'Send'}
         isSubmitDisabled={!isValid || isSaving}
         onCancel={router.back}
         onSubmit={onSubmit}
       />
     </View>
   )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: space[4],
    paddingTop: space[6],
    paddingHorizontal: space[3]
  },
  subtitle: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm
  }
})