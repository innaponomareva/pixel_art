import { IColorHistory } from "../models/IColorHistory";
import { fillCell } from "./fillCell";
import { fillFigureCells } from "./fillFigureCells";
import { getFigureCells } from "./getFigureCells";

export const onCanvasClick = (
  canvas: HTMLCanvasElement,
  cellLength: number,
  sideCellCount: number,
  color: string,
  event: MouseEvent,
  history: IColorHistory,
  setHistory: React.Dispatch<React.SetStateAction<IColorHistory>>,
  isPaintBucketActive: boolean
) => {
  // ensure user is using primary mouse button
  if (event.button !== 0) {
    return;
  }
  const { startX, startY } = getTargetCoordinates(canvas, cellLength, event);
  const prevCellColor = history[`${startX}*${startY}`];
  if (isPaintBucketActive && prevCellColor) {
    const figureCells = getFigureCells(
      startX,
      startY,
      prevCellColor,
      cellLength,
      sideCellCount,
      history
    );
    //console.log("figureCells", figureCells);
    if (figureCells.length > 0)
      fillFigureCells(
        figureCells,
        cellLength,
        canvas,
        color,
        history,
        setHistory
      );
  } else {
    fillCell(canvas, cellLength, color, startX, startY);
    setHistory({ ...history, [`${startX}*${startY}`]: color });
  }
};

const getTargetCoordinates = (
  canvas: HTMLCanvasElement,
  cellLength: number,
  event: MouseEvent
) => {
  const canvasBoundingRect = canvas.getBoundingClientRect();
  // --> DOMRect object containing info about the size of an element and its position relative to the viewport.
  const x = event.clientX - canvasBoundingRect.left;
  const y = event.clientY - canvasBoundingRect.top;
  const cellX = Math.floor(x / cellLength);
  const cellY = Math.floor(y / cellLength);
  const startX = cellX * cellLength;
  const startY = cellY * cellLength;
  return { startX, startY };
};
