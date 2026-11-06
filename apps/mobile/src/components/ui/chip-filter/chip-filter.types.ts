import type {LucideIcon} from "lucide-react-native";

export type TChipOption <T extends string> = {
    value: T | null
    label: string
    icon: LucideIcon
    count?: number
}
