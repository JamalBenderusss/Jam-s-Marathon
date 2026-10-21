import {StyleSheet, View} from "react-native";
import {LibraryStatusButton} from "@/components/detail/library-status/LibraryStatusButton";
import {TitleInfo} from "@/components/elements";
import {CreditLine} from "@/components/detail/CreditLine";
import {CREATOR_ROLE_LABEL} from "@app/constants";
import {space} from "@app/tokens";
import type {DiscoverDetailsResponse} from "@app/api";
import {formatTitleMeta, joinNames} from "@app/utils";

interface Props {
  title: DiscoverDetailsResponse
}

export function TitleContent({ title}: Props) {

  const [firstCreator] = title.creators

  return (
    <View style={styles.content}>
      <TitleInfo
        name={title.name}
        meta={formatTitleMeta(title)}
        description={title.description}
        descriptionLines={4}
      />
      <LibraryStatusButton
        titleKey={title.key}
        titleType={title.type}
      />
      {!!title.cast.length && (
        <CreditLine
          label= 'Cast'
          names={joinNames(title.cast)}
        />
       )}
      {!!firstCreator && (
        <CreditLine
          label={CREATOR_ROLE_LABEL[firstCreator.role]}
          names={joinNames(title.cast)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: space[3],
    gap: space[4]
  },
})