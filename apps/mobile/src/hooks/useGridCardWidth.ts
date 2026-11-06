import {useWindowDimensions} from "react-native";
import {space} from "@app/tokens";


export const GRID_COLUMNS = 3

export function useGridCardWidth( columns = GRID_COLUMNS) {
  const { width } = useWindowDimensions()

  return {
    width:
      (width - space[3] * 2 - space[3] * (columns - 1)) /
      columns
  }
}