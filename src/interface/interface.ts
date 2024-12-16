export interface CellInterface {
  cells: { id: number; value: string }[];
  numberOrderArray: number[];
  setClickedCell: (clickedCell: number) => void;
}

export interface TextLevel {
  failLevelText: boolean;
  activeLevel: number;
  nextLevelButton: () => void;
  tryAgainButton: () => void;
}
