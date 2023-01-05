import { createGIF } from "gifshot";
import { ImgFormats } from "../models/ImgFormats";

export const onCanvasDownload = (
  imgFormat: ImgFormats.jpeg | ImgFormats.png | ImgFormats.gif
) => {
  const canvas = document.querySelector("canvas");
  const imageURI = canvas.toDataURL(`image/${imgFormat}`);
  const link = document.createElement("a");
  link.download = "myImage";
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  if (imgFormat === ImgFormats.jpeg || imgFormat === ImgFormats.png) {
    link.href = imageURI;
    link.click();
    document.body.removeChild(link);
  } else if (imgFormat === ImgFormats.gif) {
    const options = {
      images: [imageURI],
      gifWidth: canvas.width,
      gifHeight: canvas.height,
    };
    createGIF(options, (obj) => {
      if (!obj.error) {
        link.href = obj.image;
        link.click();
        document.body.removeChild(link);
      }
    });
  }
};
