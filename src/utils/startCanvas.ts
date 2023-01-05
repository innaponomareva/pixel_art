import { fillCell } from "./fillCell";

export const startCanvas = (
  canvas: HTMLCanvasElement,
  gridCoordinatesArray: number[][],
  cellLength: number
) => {
  const history = {};
  gridCoordinatesArray.forEach((coord) => {
    fillCell(canvas, cellLength, "#ffffff", coord[0], coord[1]);
    history[`${coord[0]}*${coord[1]}`] = "#ffffff";
  });
  //console.log("gridCoordinatesArray", gridCoordinatesArray);
  return history;
};
