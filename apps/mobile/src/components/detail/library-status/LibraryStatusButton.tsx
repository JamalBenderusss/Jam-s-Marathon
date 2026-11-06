import type {DiscoverDetailsResponseType} from "@app/api";
import { Platform } from "react-native";
import {LibraryIOSButton} from "@/components/detail/library-status/LibraryIOSButton";
import {LibraryAndroidButton} from "@/components/detail/library-status/LibraryAndroidButton";

interface Props {
  titleKey: string,
  titleType: DiscoverDetailsResponseType
}

export function LibraryStatusButton({titleKey, titleType}: Props) {
  if(Platform.OS === 'ios') return <LibraryIOSButton titleKey={titleKey} />

  return <LibraryAndroidButton titleKey={titleKey} titleType={titleType} />

}