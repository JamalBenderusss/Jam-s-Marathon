import { NativeTabs } from 'expo-router/unstable-native-tabs'

import { colors } from '@app/tokens'

export default function TabsLayout() {
  return (
    <NativeTabs
      minimizeBehavior='onScrollDown'
      tintColor={colors.primary}
      iconColor={{
        default: colors.text.secondary,
        selected: colors.text.primary
      }}
      labelStyle={{ color: colors.text.secondary }}
    >
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md={{ default: 'home', selected: 'home_filled' }}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='library'>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'heart', selected: 'heart.fill' }}
          md={{ default: 'diamond_shine', selected: 'family_star' }}
        />
        <NativeTabs.Trigger.Label>My watchlist</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='profile'>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.circle', selected: 'person.circle.fill' }}
          md={{ default: 'wc', selected: 'person_remove' }}
        />
        <NativeTabs.Trigger.Label>Account</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name='search'
        role='search'
      >
        <NativeTabs.Trigger.Icon md='search' />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
