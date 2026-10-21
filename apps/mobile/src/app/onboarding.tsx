import {useDiscoverGetTrending} from "@app/api";
import {useOnboarding} from "@/providers/OnboardingProvider";
import {router} from "expo-router";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Sparkles} from "lucide-react-native";
import {colors, fontSize, fontWeight, radius, space} from "@app/tokens";
import {Button} from "@/components/ui";
import {PosterWall} from "@/components/onboarding/PosterWall";


export default function Onboarding() {
  const {data} = useDiscoverGetTrending({take: 24})
  const { completeOnboarding } = useOnboarding()

  const coverUrls = (data?.data ?? []).flatMap(({coverUrl}) =>
    coverUrl ? [coverUrl] : []
  )

  const onGetStarted = async ( route: 'login' | 'register') => {
    await completeOnboarding()
    router.push(`/${route}`)
  }

  return (
    <View style={styles.root}>
      <PosterWall coverUrls={coverUrls} />
      <SafeAreaView
        edges={['bottom']}
        style={styles.content}
      >
        <View style={styles.logo}>
          <Sparkles
            size={32}
            color={(colors.text.primary)}
          />
        </View>

        <Text style={styles.title}>Track Everything You Love</Text>
        <Text style={styles.description}>
          Movies, series, anime, books and games in one place.
          Rate what you finish and discover your Taste DNA
        </Text>

        <View style={styles.actions}>
          <Button
            size='lg'
            onPress={() => onGetStarted('register')}
          >
            Get Started
          </Button>

          <Button
            size='lg'
            variant='secondary'
            onPress={completeOnboarding}
          >
            Explore first
          </Button>
        </View>

        <Pressable
          hitSlop={12}
          onPress={() => onGetStarted('login')}
        >
          <Text style={styles.login}>
            Already have an account? {` `}
            <Text style={styles.loginAccent}>Log in</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    gap: space[4],
    paddingHorizontal: space[3],
    paddingBottom: space[4]
  },
  logo: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.status.success
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: space[4],
  },
  actions: { gap: space[3]},
  login: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  loginAccent: {
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'underline'
  }
})