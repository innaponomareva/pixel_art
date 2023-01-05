import { Coord } from "../models/Coord";
import { IColorHistory } from "../models/IColorHistory";

export const getFigureCells = (
  startX: number,
  startY: number,
  prevColor: string,
  cellLength: number,
  sideCellCount: number,
  history: IColorHistory
) => {
  const allCellsOfSameColor = [];
  const numberofGridCells = sideCellCount * sideCellCount;
  let tested = [];
  let notTested: Coord[] = [[startX, startY]];

  for (const [key, value] of Object.entries(history)) {
    if (value === prevColor) {
      const coords = key.split("*").map((string) => +string);
      allCellsOfSameColor.push(coords);
    }
  }

  const isBlankBackground = allCellsOfSameColor.length === numberofGridCells;
  if (isBlankBackground) {
    return allCellsOfSameColor;
  }
  const neighbourCellsOfSameColor = getNeighbourCellsOfSameColor(
    tested,
    notTested,
    allCellsOfSameColor,
    cellLength
  );
  return neighbourCellsOfSameColor;
};

const getNeighbourCellsOfSameColor = (
  tested: string[],
  notTested: Coord[] | [],
  allCellsOfSameColor: Coord[],
  cellLength: number
) => {
  if (notTested.length === 0) {
    return tested.map((item) => item.split("*").map((item) => parseInt(item)));
  } else {
    const {
      allTestedNeighboursOfSameColor,
      allNotTestedNeighboursOfSameColor,
    } = getAllTestedAndNotTestedNeighboursOfSameColor(
      tested,
      notTested,
      allCellsOfSameColor,
      cellLength
    );
    return getNeighbourCellsOfSameColor(
      allTestedNeighboursOfSameColor,
      allNotTestedNeighboursOfSameColor,
      allCellsOfSameColor,
      cellLength
    );
  }
};

const getAllTestedAndNotTestedNeighboursOfSameColor = (
  tested: string[],
  notTested: Coord[] | [],
  allCellsOfSameColor: Coord[],
  cellLength: number
) => {
  const allTestedNeighboursOfSameColor = [...tested];
  let allNotTestedNeighboursOfSameColor = [];
  for (const item of notTested) {
    allTestedNeighboursOfSameColor.push(`${item[0]}*${item[1]}`);
    const cellCrossNeighboursOfSameColor = getCellCrossNeighboursOfSameColor(
      item[0],
      item[1],
      cellLength,
      allCellsOfSameColor
    );
    allNotTestedNeighboursOfSameColor.push(
      ...cellCrossNeighboursOfSameColor.map((array: Coord) => array.join("*"))
    );
  }
  // remove duplicates from allNotTestedNeighboursOfSameColor
  allNotTestedNeighboursOfSameColor = [
    ...new Set(allNotTestedNeighboursOfSameColor),
  ];
  // // check array already contains tested items
  allNotTestedNeighboursOfSameColor = allNotTestedNeighboursOfSameColor.filter(
    (item: string) => !allTestedNeighboursOfSameColor.includes(item)
  );
  // ['0*0', '0*63'] --> [[0,0], [0,63]]
  allNotTestedNeighboursOfSameColor = allNotTestedNeighboursOfSameColor.map(
    (item) => item.split("*").map((item) => parseInt(item))
  );

  return {
    allTestedNeighboursOfSameColor,
    allNotTestedNeighboursOfSameColor,
  };
};

const getCellCrossNeighboursOfSameColor = (
  startX: number,
  startY: number,
  cellLength: number,
  allCellsOfSameColor: Coord[]
) => {
  return allCellsOfSameColor.filter((coords) =>
    (coords[1] === startY && startX + cellLength === coords[0]) ||
    (coords[1] === startY && startX - cellLength === coords[0]) ||
    (coords[0] === startX && startY - cellLength === coords[1]) ||
    (coords[0] === startX && startY + cellLength === coords[1])
      ? coords
      : false
  );
};
