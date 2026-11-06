import {LIBRARY_STATUES, STATUS_LABELS} from "@app/constants";
import type {TLibraryStatus} from "@app/types";
import {Bookmark, Check, LayoutGrid, type LucideIcon, Pause, Play, X} from "lucide-react-native";
import {ChipFilter, type TChipOption} from "@/components/ui";

const STATUS_ICONS: Record<TLibraryStatus, LucideIcon> = {
  PLANNED: Bookmark,
  IN_PROGRESS: Play,
  COMPLETED: Check,
  ON_HOLD: Pause,
  DROPPED: X
}

interface Props {
  counts: Partial<Record<TLibraryStatus, number>>
  total: number
  value: TLibraryStatus | null
  onChange: (status: TLibraryStatus | null) => void
}

export function StatusFilter({value, onChange, counts, total}: Props) {
  const options: TChipOption<TLibraryStatus>[] =[
    {value: null, label: 'ALL', icon: LayoutGrid, count: total},
    ...LIBRARY_STATUES.map(status => ({
      value: status,
      label: STATUS_LABELS[status],
      icon: STATUS_ICONS[status],
      count: counts[status] ?? 0
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