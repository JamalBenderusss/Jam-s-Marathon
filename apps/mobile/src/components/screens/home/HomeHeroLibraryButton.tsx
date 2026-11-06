import {useLibraryStatus} from "@/hooks";
import {router} from "expo-router";
import * as Haptics from "expo-haptics";
import {Check, Plus} from "lucide-react-native";
import {GlassIconButton} from "@/components/ui";
import {colors} from "@app/tokens";

interface Props {
  titleKey: string
}

export function HomeHeroLibraryButton({titleKey}: Props) {
  const {isAuthorized, status, setStatus, removeFromLibrary} = useLibraryStatus(titleKey)

  const onPress = ()=> {
    if (!isAuthorized) {
      router.push('/login')
      return
    }

    if(!status) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setStatus('PLANNED')
      return
    }

    if(status === 'PLANNED') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      removeFromLibrary()
    }
  }

  return (
    <GlassIconButton
      icon={status ? Check : Plus}
      accessibilityLabel={status ? 'Remove from library' : 'Add to library'}
      tintColor={colors.secondary}
      onPress={onPress}
    />
  )
}