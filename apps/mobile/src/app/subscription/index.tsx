import {Text, View} from "react-native";
import {Screen} from "@/components/ui/Screen";
import {FloatingButton} from "@/components/ui/FloatingButton";
import {router} from "expo-router";
import {ChevronLeft} from "lucide-react-native";


export default function Subscription() {
    return <Screen>
        <FloatingButton
            onPress={() => { router.back()}}
            side='left'
            icon={ChevronLeft}
            iconOffset={-2}
        />
        <Text>
            Subscription
        </Text>
    </Screen>
}