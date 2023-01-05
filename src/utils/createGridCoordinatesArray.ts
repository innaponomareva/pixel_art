export const createGridCoordinatesArray = (
  cellLength: number,
  sideCellCount: number
) => {
  const gridCoordinatesArray = [];
  const gridLength = cellLength * sideCellCount;

  for (let x = 0; x < gridLength; x += cellLength) {
    for (let y = 0; y < gridLength; y += cellLength) {
      gridCoordinatesArray.push([x, y]);
    }
  }
  return gridCoordinatesArray;
};
