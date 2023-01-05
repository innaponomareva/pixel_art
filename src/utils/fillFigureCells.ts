import { Coord } from "../models/Coord";
import { IColorHistory } from "../models/IColorHistory";
import { fillCell } from "./fillCell";

export const fillFigureCells = (
  figureCells: Coord[],
  cellLength: number,
  canvas: HTMLCanvasElement,
  color: string,
  history: IColorHistory,
  setHistory: React.Dispatch<React.SetStateAction<IColorHistory>>
) => {
  const historyUpdate = {};
  figureCells.forEach((item) => {
    const startX = item[0];
    const startY = item[1];
    fillCell(canvas, cellLength, color, startX, startY);
    historyUpdate[`${startX}*${startY}`] = color;
  });
  setHistory({ ...history, ...historyUpdate });
};
