export const onPaintBucketClick = (
  cursor: SVGSVGElement,
  isPaintBucketActive: boolean,
  setIsPaintBucketActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isPaintBucketActive === true) {
    cursor.style.display = "none";
  }
  setIsPaintBucketActive(!isPaintBucketActive);
};
