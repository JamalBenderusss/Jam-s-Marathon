import {GlassBadge} from "@/components/ui/GlassBadge";
import {Search} from "lucide-react-native";
import {colors, fontSize, space} from "@app/tokens";
import {StyleSheet, TextInput} from "react-native";


interface Props {
  value: string
  placeholder: string
  onChangeText: (value: string) => void
}

export function SearchField({value, placeholder, onChangeText}:Props) {
  return (
    <GlassBadge
      size='md'
      style={styles.root}
    >
      <Search
        size={18}
        color={colors.text.muted}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType='search'
        clearButtonMode='while-editing'
        accessibilityLabel={placeholder}
        style={styles.input}
      />
    </GlassBadge>
  )
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  input: {
    flex: 1,
    height: '100%',
    paddingTop: space[2],
    color: colors.text.primary,
    fontSize: fontSize.sm
  }
})