import { useEffect, useRef, useState } from 'react';
import Button from './components/Button';
import Canvas from './components/Canvas';
import ColorPalette from './components/ColorPalette';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import {
  colorsOptions,
  gridSizeOptions,
  imgFormatOptions,
} from './lib/options';
import PaintBucket from './components/PantBucket';
import ColorInput from './components/ColorInput';
import Tools from './components/Tools';
import { IColorHistory } from './models/IColorHistory';
import { onCanvasDownload } from './utils/onCanvasDownload';
import { onCanvasClick } from './utils/onCanvasClick';
import { startCanvas } from './utils/startCanvas';
import { onClearCanvas } from './utils/onClearCanvas';
import { createGridCoordinatesArray } from './utils/createGridCoordinatesArray';
import { moveCursor } from './utils/moveCursor';
import { onPaintBucketClick } from './utils/onPaintBucketClick';
import { useCallback } from 'react';

const App: React.FC = () => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef();
  const paintBucketCursorRef: React.MutableRefObject<SVGSVGElement> = useRef();
  const [width, setWidth] = useState(0);
  const [canvasLength, setCanvasLength] = useState(504);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [activeColor, setActiveColor] = useState('#000000');
  const [cellLength, setCellLength] = useState(0);
  const [sideCellCount, setSideCellCount] = useState(8);
  const [selectedOption, setSelectedOption] = useState('8×8');
  const [selectedImgFormatOption, setSelectedImgFormatOption] =
    useState('Download as');
  const [isPaintBucketActive, setIsPaintBucketActive] = useState(false);
  const [history, setHistory] = useState<IColorHistory>({});

  const setCanvasSizes = useCallback(() => {
    if (sideCellCount === 32) {
      setCellLength(width > 506 ? 16 : 12);
      setCanvasLength(width > 506 ? 512 : 384);
    } else if (sideCellCount === 16) {
      setCellLength(width > 506 ? 32 : 24);
      setCanvasLength(width > 506 ? 512 : 384);
    } else if (sideCellCount === 12) {
      setCellLength(width > 506 ? 42 : 32);
      setCanvasLength(width > 506 ? 504 : 384);
    } else if (sideCellCount === 8) {
      setCellLength(width > 506 ? 63 : 48);
      setCanvasLength(width > 506 ? 504 : 384);
    }
  }, [width, sideCellCount]);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasSizes();
      const gridCoordinatesArray = createGridCoordinatesArray(
        cellLength,
        sideCellCount
      );
      const colorHistoryObject = startCanvas(
        canvasRef.current,
        gridCoordinatesArray,
        cellLength
      );
      setHistory(colorHistoryObject);
    }
  }, [sideCellCount, cellLength, setCanvasSizes, width]);

  useEffect(() => {
    if (isPaintBucketActive)
      document.addEventListener('mousemove', moveCursor, true);
    else document.removeEventListener('mousemove', moveCursor, true);
  }, [isPaintBucketActive]);

  useEffect(() => {
    const splitted = selectedOption.split('×');
    setSideCellCount(+splitted[0]);
  }, [selectedOption]);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <PaintBucket
        ref={paintBucketCursorRef}
        className="paint-bucket-cursor"
        activeColor={activeColor}
      />
      <div className="app-container">
        <div className="content-container">
          <Dropdown
            options={gridSizeOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="painting-container">
            <Tools tooltipList={['Color Picker', 'Paint Bucket']}>
              <ColorInput
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />
              <PaintBucket
                className="paint-bucket-btn"
                activeColor={activeColor}
                onClickHandler={() =>
                  onPaintBucketClick(
                    paintBucketCursorRef.current,
                    isPaintBucketActive,
                    setIsPaintBucketActive
                  )
                }
              />
            </Tools>

            <Canvas
              ref={canvasRef}
              sideCellCount={sideCellCount}
              canvasLength={canvasLength}
              isGridVisible={isGridVisible}
              onCanvasClick={(event) =>
                onCanvasClick(
                  canvasRef.current,
                  cellLength,
                  sideCellCount,
                  activeColor,
                  event,
                  history,
                  setHistory,
                  isPaintBucketActive
                )
              }
            />
            <ColorPalette
              colors={colorsOptions}
              canvasLength={canvasLength}
              setActiveColor={setActiveColor}
            />
          </div>
          <div className="btn-container">
            <Checkbox
              name="showGrid"
              checked={isGridVisible}
              onChange={() => setIsGridVisible(!isGridVisible)}
            >
              Show Grid
            </Checkbox>
          </div>

          <div className="btn-container">
            <Button
              hover
              onClickHandler={() =>
                onClearCanvas(
                  canvasRef.current,
                  cellLength,
                  history,
                  setHistory
                )
              }
            >
              Clear
            </Button>
            <Dropdown
              options={imgFormatOptions}
              selectedOption={selectedImgFormatOption}
              setSelectedOption={setSelectedImgFormatOption}
              onOptionClick={onCanvasDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
