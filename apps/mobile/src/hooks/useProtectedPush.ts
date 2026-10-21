import { type Href, router} from 'expo-router'

import {useAuth} from "@/hooks/useAuth";


export function useProtectedPush() {
  const { isAuthorized} = useAuth()

  return (href: Extract<Href, string>) => {
    if (isAuthorized) {
      router.push(href)
      return
    }

    router.push({ pathname: '/login', params: { redirect: href} })
  }
}