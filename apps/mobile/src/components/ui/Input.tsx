import {Text, StyleSheet, TextInput, type TextInputProps, View, Pressable} from "react-native";
import {colors, fontSize, radius, space} from "@app/tokens";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react-native";


interface Props extends TextInputProps {
  error?: string
  isPassword?: boolean
}

export function Input({error, isPassword, multiline, value, onChangeText, ...props}: Props) {
  const [isHidden, setIsHidden] = useState(isPassword)
  const [inner, setInner] = useState('')

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : inner

  const handleChange = (text: string) => {
    if (!isControlled) setInner(text)
    onChangeText?.(text)
  }

  return (
    <View style={styles.root}>
      <View style={[styles.field, !!error && styles.fieldError, multiline && styles.fieldMultiline]}>
        <TextInput
          style={ [styles.input, multiline && styles.fieldMultiline] }
          placeholderTextColor={colors.text.muted}
          secureTextEntry={isPassword && isHidden}
          value={currentValue}
          onChangeText={handleChange}
          multiline={multiline}
          {...props}
        />

        {isPassword && (
          <Pressable
            hitSlop={12}
            onPress={() => setIsHidden(v => !v)}
          >
            {isHidden ? (
              <EyeOff
                size={20}
                color={colors.text.muted}
              />
            ) : (
              <Eye
                size={20}
                color={colors.text.muted}
              />
            )}
          </Pressable>
        )}

      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: space[2] },
  field: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[5],
    borderRadius: radius.full,
    borderWidth: 1,
    backgroundColor: colors.secondary,
  },
  fieldMultiline: {
    height: undefined,
    minHeight: 110,
    alignItems: 'flex-start',
    paddingHorizontal: space[4],
    paddingVertical: space[4],
    borderRadius: radius.md,
    borderColor: 'transparent',
    backgroundColor: colors.bg.card,
  },
  fieldError: { borderColor: colors.status.error },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: fontSize.base
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.status.error
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm,
    paddingHorizontal: space[2]
  },

})