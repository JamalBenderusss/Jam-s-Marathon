import {Bell, CreditCard, Heart, Users} from "lucide-react-native";
import {router} from "expo-router";

export const PROFILE_MENU = [
  {
    icon: CreditCard,
    label: 'Subscription',
    value: 'Free',
    onPress: () => router.push('/plans')
  },
  {
    icon: Heart,
    label: 'WatchList',
    onPress: () => router.push('/(tabs)/library')
  },
  {
    icon: Users,
    label: 'Friends',
    onPress: () => {}
  },
  {
    icon: Bell,
    label: 'Notifications',
    onPress: () => {}
  },

]