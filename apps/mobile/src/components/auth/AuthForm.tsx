import {AUTH_FORM_CONTENT} from "@app/constants";
import {authSchema, type TAuthForm} from "@app/schemas";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronLeft, ChevronRight} from "lucide-react-native";
import {Screen} from "@/components/ui/Screen";
import {Pressable, Text, View} from "react-native";
import {Input} from "@/components/ui/Input";
import {FloatingButton} from "@/components/ui/FloatingButton";
import {type Href, router, useLocalSearchParams} from "expo-router";
import {Button} from "@/components/ui/Button";
import {StyleSheet} from 'react-native'
import {ApiError, useAuthMobileLogin} from "@app/api";
import {colors, fontSize, fontWeight, space} from "@app/tokens";


interface Props {
  type: keyof typeof AUTH_FORM_CONTENT
  isPending: boolean
  error: unknown
  onSubmit: (data:TAuthForm) => void
}

export function AuthForm ({type, isPending, error, onSubmit}: Props) {

const content = AUTH_FORM_CONTENT[type]

const {control, handleSubmit} = useForm<TAuthForm>({
  resolver: zodResolver(authSchema)
})

const { redirect } = useLocalSearchParams<{ redirect?: Extract<Href, string> }>()


return (
  <Screen>
    <View style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.title}>{content.title}</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name='email'
          render={({field, fieldState})=> (
          <Input
            placeholder='Enter email:'
            autoCapitalize="none"
            keyboardType="email-address"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({field, fieldState})=> (
          <Input
            placeholder='Enter password:'
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
          )}
        />
        {error instanceof ApiError && (
          <Text style={styles.error}>{error.messages[0]}</Text>
        )}

        <Button
          size='lg'
          onPress={handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          {isPending ?  content.pending : content.submit}
        </Button>



        </View>
      </View>
      <FloatingButton
          icon={ChevronLeft}
          onPress={() => router.replace('/')}
          side='left'
      />
      <Pressable onPress={() =>
        router.replace({
          pathname: content.footerHref,
          params: {redirect}
      })}>
        <Text style={styles.link}>
          {content.footerText}{' '}
          <Text style={styles.linkAccent}>{content.footerAction}</Text>
        </Text>
      </Pressable>
    </View>

  </Screen>
)}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: space[3],
    paddingBottom: space[6]
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    gap: space[10]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  form: {
    gap: space[3]
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  link: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  linkAccent: {
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'underline'
  }
})
