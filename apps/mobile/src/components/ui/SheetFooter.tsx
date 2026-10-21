import {StyleSheet, View} from "react-native";
import {router} from "expo-router";
import {Button} from "@/components/ui/Button";
import {colors, space} from "@app/tokens";
import {onSubmit, submitLabel} from "@expo/ui/swift-ui/modifiers";

interface Props {
  submitLabel: string
  isSubmitDisabled?: boolean
  onCancel: () => void
  onSubmit: () => void
}

export function SheetFooter({
  submitLabel,
  isSubmitDisabled,
  onCancel,
  onSubmit
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.divider} />

      <View style={ styles.buttons}>
        <View style={styles.button}>
          <Button
            variant='secondary'
            onPress={onCancel}
          >
            Cancel
          </Button>
        </View>
      <View style={styles.button}>
        <Button
          onPress={onSubmit}
          isDisabled={isSubmitDisabled}
        >
          {submitLabel}
        </Button>
      </View>
      </View>
    </View>
  )
}



const styles= StyleSheet.create({
  root: {
    marginTop: 'auto',
    gap: space[4],
    paddingBottom: space[4],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  buttons: {
    flexDirection: 'row',
    gap: space[3]
  },
  button: {
    flex: 1
  }
})