import type {DiscoverItemResponse} from "@app/api";
import type {ReactNode} from "react";
import {router} from "expo-router";
import {StyleSheet, Text, View} from "react-native";
import {TitleCard} from "@/components/elements";
import {colors, fontSize, fontWeight, space} from "@app/tokens";

interface Props {
  title: Pick<DiscoverItemResponse, 'name' | 'coverUrl' | 'type'> & {
    key: string | null
  }
  width: number
  badge?: ReactNode
}

export function PosterCard({title, width, badge}: Props) {
    const openTitle = () => {
      if(title.key) router.push(`/title/${title.key}`)
    }

    return (
        <View style={[styles.root, {width}]}>
            <TitleCard
                title={title}
                badge={badge}
                onPress={openTitle}
            />

            <Text
              style={styles.name}
              numberOfLines={1}
            >
                {title.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: { gap: space[2]},
    name: {
      color: colors.text.primary,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium
    }
})