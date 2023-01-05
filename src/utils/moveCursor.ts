export const moveCursor = (event: globalThis.MouseEvent) => {
  const mouseY = event.clientY;
  const mouseX = event.clientX;
  const cursor = document.querySelector(".paint-bucket-cursor") as HTMLElement;
  cursor.style.display = "block";
  cursor.style.transform = `translate3d(${mouseX + 3}px, ${mouseY}px, 0)`;
};
