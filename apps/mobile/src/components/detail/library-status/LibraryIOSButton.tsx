import {useLibraryStatus} from "@/hooks/useLibraryStatus";
import {router} from "expo-router";
import {
    ADD_TO_LIBRARY_ACTION,
    LIBRARY_STATUS_ACTIONS,
    REVIEW_RATING,
    STATUS_LABELS
} from "@app/constants";
import type {TLibraryStatus, TNextLibraryStatus} from "@app/types";
import {colors, fontSize, space} from "@app/tokens";
import type {ComponentProps} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Host} from "@expo/ui";
import {HStack, Menu, Toggle, Image, Section, Button as MenuButton} from "@expo/ui/swift-ui";
import {font, frame, foregroundStyle, buttonStyle, buttonBorderShape} from "@expo/ui/swift-ui/modifiers";


type TSFSymbol = NonNullable<ComponentProps<typeof Toggle>['systemImage']>

const BUTTON_HEIGHT = 40

const MAIN_STATUSES: TLibraryStatus[] = ['PLANNED', 'IN_PROGRESS', 'COMPLETED']
const PAUSED_STATUSES: TLibraryStatus[] = ['ON_HOLD', 'DROPPED']

const STATUS_SYMBOLS: Record<TLibraryStatus, TSFSymbol> = {
    PLANNED: 'bookmark',
    IN_PROGRESS: 'play',
    COMPLETED: 'checkmark.circle',
    ON_HOLD: 'pause',
    DROPPED: 'xmark'
}

const ACTION_SYMBOLS: Record<TNextLibraryStatus, TSFSymbol> = {
    PLANNED: 'plus',
    IN_PROGRESS: 'play.fill',
    COMPLETED: 'checkmark'
}

interface Props {
    titleKey: string,
}

export function LibraryIOSButton({titleKey}: Props) {
    const {isAuthorized, status, rating, setStatus, removeFromLibrary, progress} = useLibraryStatus(titleKey)

    const isCompleted = status === 'COMPLETED'
    const ratingLabel = rating ? `Rated ${rating}/${REVIEW_RATING.max}` : 'Rate'

    const action = status && !isCompleted
        ? LIBRARY_STATUS_ACTIONS[status]
        : ADD_TO_LIBRARY_ACTION


    const openReview = () => router.push(`/review/${titleKey}`)

    const withAuth = (callback: () => void) => () => {
        if (!isAuthorized) {
            router.push('/login')
            return
        }

        callback()
    }

    const selectStatus = (nextStatus: TLibraryStatus) => {
        setStatus(nextStatus)

        if(nextStatus === 'COMPLETED') openReview()
    }

    const onPrimaryAction = withAuth(() =>
        isCompleted ? openReview() : selectStatus(action.nextStatus)
    )

    const renderStatus = (item: TLibraryStatus) =>(
        <Toggle
            key={item}
            label={STATUS_LABELS[item]}
            systemImage={STATUS_SYMBOLS[item]}
            isOn={item === status}
            onIsOnChange={withAuth(() => selectStatus(item))}
        />
    )

    return (
        <View style={styles.root}>
        <Host style={styles.host}>
            <Menu
                label={
                    <HStack
                        modifiers={[
                            frame({ maxWidth: Infinity, minHeight: BUTTON_HEIGHT }),
                            font({ size: fontSize.base, weight: 'semibold' }),
                            foregroundStyle(
                                isCompleted ? colors.text.primary : colors.text.secondary
                            )
                        ]}
                    >
                        <Image
                            systemName={
                                isCompleted ? 'star' : ACTION_SYMBOLS[action.nextStatus]
                            }
                        />
                        <Text>{isCompleted ? ratingLabel : action.label}</Text>

                    </HStack>
                }
                onPrimaryAction={onPrimaryAction}
                modifiers={[buttonStyle('glass'), buttonBorderShape('capsule')]}
            >
                <Section>{MAIN_STATUSES.map(renderStatus)}</Section>

                <Section>{PAUSED_STATUSES.map(renderStatus)}</Section>

                {!!status && (
                    <Section>
                        <MenuButton
                            label='Remove'
                            systemImage='trash'
                            role='destructive'
                            onPress={removeFromLibrary}
                        />
                    </Section>
                )}
            </Menu>
        </Host>
        {status === 'IN_PROGRESS' && !!progress && (
          <Text style={styles.progress}>Progress: {progress}</Text>
        )}
     </View>

    )
}

const styles = StyleSheet.create({
    host: {
        height: BUTTON_HEIGHT,
        marginVertical: space[2]
    },
    root: { gap: space[2]},
    progress: {
      color: colors.text.muted,
      fontSize: fontSize.xs,
      textAlign: 'center'
    }
})