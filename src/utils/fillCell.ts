export const fillCell = (
  canvas: HTMLCanvasElement,
  cellLength: number,
  color: string,
  startX: number,
  startY: number
) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, cellLength, cellLength);
};
