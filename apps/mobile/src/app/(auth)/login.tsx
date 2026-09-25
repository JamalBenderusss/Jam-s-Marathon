import {useAuthMobileLogin, useAuthMobileRegister} from "@app/api";
import {saveTokens} from "@/lib/token";
import {router} from "expo-router";
import {AuthForm} from "@/components/auth/AuthForm";
import {useQueryClient} from "@tanstack/react-query";

export default function Login () {
  const queryClient = useQueryClient()
  const {mutate, isPending, error} = useAuthMobileLogin({
    mutation: {
      onSuccess: async({data: {accessToken, refreshToken}}) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
        router.replace('/')
      },
      onError: (error) => {
        console.log('ERROR:', error)
      }
    }
  })
  return (
     <AuthForm
       type='login'
       error={error}
       isPending={isPending}
       onSubmit={data => mutate({ data})}
     />
  )
}