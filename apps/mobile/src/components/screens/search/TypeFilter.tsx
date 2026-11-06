import {type TTitleType, TYPE_LABELS} from "@app/constants";
import {ChipFilter, type TChipOption} from "@/components/ui";
import {CARD_CONFIG} from "@/components/elements";
import {LayoutGrid} from "lucide-react-native";

const TYPES = Object.keys(TYPE_LABELS) as TTitleType[]

interface Props {
  value: TTitleType | null
  onChange: (type: TTitleType | null ) => void
}

export function TypeFilter({value, onChange}: Props) {
  const options: TChipOption<TTitleType>[] = [
    { value: null, label: 'ALL', icon: LayoutGrid},
    ...TYPES.map(type => ({
      value: type,
      label: TYPE_LABELS[type],
      icon: CARD_CONFIG[type].icon
    }))
  ]

  return (
    <ChipFilter
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}