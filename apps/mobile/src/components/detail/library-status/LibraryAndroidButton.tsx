import {useLibraryStatus} from "@/hooks/useLibraryStatus";
import {router} from "expo-router";
import {Button} from "@/components/ui";
import {Star} from "lucide-react-native";
import {ADD_TO_LIBRARY_ACTION, LIBRARY_STATUS_ACTIONS, REVIEW_RATING} from "@app/constants";
import {LIBRARY_ACTION_ICON} from "@/components/detail/library-status/library-status.data";
import {CARD_CONFIG} from "@/components/elements";
import type {DiscoverDetailsResponseType} from "@app/api";
import {StyleSheet, Text, View} from "react-native";
import {colors, fontSize, space} from "@app/tokens";

interface Props {
    titleKey: string,
    titleType: DiscoverDetailsResponseType
}

export function LibraryAndroidButton({titleKey, titleType}: Props) {
    const {isAuthorized, status, rating, setStatus, progress} = useLibraryStatus(titleKey)

    const openReview = () => router.push(`/review/${titleKey}`)

    if (status === 'COMPLETED') {
        return (
            <Button
                variant='secondary'
                size='lg'
                icon={Star}
                onPress={openReview}
            >
                {rating ? `Rated ${rating}/${REVIEW_RATING.max}` : 'Rate'}
            </Button>
        )
    }

    const action = status ? LIBRARY_STATUS_ACTIONS[status] : ADD_TO_LIBRARY_ACTION

    const onPress = () => {
        if (!isAuthorized) {
            router.push('/login')
            return
        }

        setStatus(action.nextStatus)

        if(action.nextStatus === 'COMPLETED') openReview()
    }

    return (
    <View style={styles.root}>
        <Button
            size='lg'
            variant='secondary'
            icon={LIBRARY_ACTION_ICON[action.nextStatus]}
            style={{backgroundColor: CARD_CONFIG[titleType].color}}
            onPress={onPress}
        >
            {action.label}
        </Button>
    {status === 'IN_PROGRESS' && !!progress && (
        <Text style={styles.progress}>Progress: {progress}</Text>
    )}
    </View>
    )
}

const styles = StyleSheet.create({
    root: { gap: space[2]},
    progress: {
        color: colors.text.muted,
        fontSize: fontSize.xs,
        textAlign: 'center'
    }
})