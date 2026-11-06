import {space} from "@app/tokens";

interface IOption {
  contentInsetAdjustmentBehavior?:
    | 'automatic'
    | 'scrollableAxes'
    | 'never'
    | 'always'
    | undefined;
  contentContainerStyle?: {
    paddingBottom: number
  }
}

export const paddingBottomBeforeTabs: IOption = {
  contentInsetAdjustmentBehavior: 'automatic',
}