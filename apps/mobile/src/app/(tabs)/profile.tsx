import {useMobileLogout, useCurrentUser} from "@app/api";
import {useQueryClient} from "@tanstack/react-query";
import {clearTokens, getRefreshToken, } from "@/lib/token";
import {Redirect, router} from "expo-router";
import {LogOut} from "lucide-react-native";
import {ScrollView} from "react-native";
import {space} from "@app/tokens";


import {Screen} from '@/components/ui/Screen'
import {ProfileMenuItem} from "@/components/screens/profile/ProfileMenuItem";
import {PROFILE_MENU} from "@/components/screens/profile/profile-menu.data";
import {ProfileHeader} from "@/components/screens/profile/ProfileHeader";
import {DeleteAccount} from "@/components/screens/profile/DeleteAccount";
import {paddingBottomBeforeTabs} from "@/utils/padding-bottom-before-tabs.utils";

export default function Profile() {
  const queryClient = useQueryClient()
  const {data, isPending: isLoading, isError} = useCurrentUser()

  const {mutate: logout, isPending} = useMobileLogout({
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

    <ScrollView showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: space[3]}}
      contentContainerStyle={{paddingBottom: space[16]}}
    >

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

      <DeleteAccount />
    </ScrollView>
  </Screen>
}
