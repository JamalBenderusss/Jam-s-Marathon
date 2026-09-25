import {useAuthMobileLogout, useUserFindMe} from "@app/api";
import {useQueryClient} from "@tanstack/react-query";
import {clearTokens, getRefreshToken, } from "@/lib/token";
import {Redirect, router} from "expo-router";
import {Screen} from '@/components/ui/Screen'
import {View, Text, ScrollView} from "react-native";
import {colors, fontSize, space} from "@app/tokens";

import {ProfileHeader} from "@/components/profile/ProfileHeader";
import {PROFILE_MENU} from "@/components/profile/profile-menu.data";
import {ProfileMenuItem} from "@/components/profile/ProfileMenuItem";
import {LogOut} from "lucide-react-native";

export default function Profile() {
  const queryClient = useQueryClient()
  const {data, isPending: isLoading, isError} = useUserFindMe()

  const {mutate: logout, isPending} = useAuthMobileLogout({
    mutation: {
      onSettled: async() => {
        await clearTokens()
        queryClient.clear()
        router.replace('/login')
      }
    }
  })

  const handleLogout = async() => {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) return
    logout({data: {refreshToken} })
  }

  if(isLoading) return <Screen />

  if(isError || !data) return <Redirect href='/login' />

  return <Screen edges={[]}>

    <ProfileHeader
      name={data.data.username}
      avatarUrl={data.data.profile?.avatarUrl || ''}
    />

    <ScrollView showsVerticalScrollIndicator={false} style={{
      paddingHorizontal: space[3]
    }}>

      {PROFILE_MENU.map((item, index) => (
        <ProfileMenuItem
          key={item.label}
          {...item}
          isLast={index === PROFILE_MENU.length - 1} />
      ))}

    <ProfileMenuItem
      icon={LogOut}
      label={isPending ? 'Logging out...' : 'Sign out'}
      onPress={handleLogout}
      isLast />
    </ScrollView>
  </Screen>
}
