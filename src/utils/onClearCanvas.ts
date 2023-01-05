import { IColorHistory } from "../models/IColorHistory";
import { startCanvas } from "./startCanvas";

export const onClearCanvas = (
  canvas: HTMLCanvasElement,
  cellLength: number,
  history: IColorHistory,
  setHistory: React.Dispatch<React.SetStateAction<IColorHistory>>
) => {
  if (!window.confirm("Do you want to clear the canvas?")) {
    return;
  } else {
    const gridCoordinatesArray = Object.keys(history).map((key) =>
      key.split("*").map((stringNum) => parseInt(stringNum))
    );
    const colorHistoryObject = startCanvas(
      canvas,
      gridCoordinatesArray,
      cellLength
    );
    setHistory(colorHistoryObject);
  }
};
