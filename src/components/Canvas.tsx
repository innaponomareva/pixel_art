import { forwardRef } from "react";

interface CanvasProps {
  sideCellCount: number;
  canvasLength: number;
  className?: string;
  isGridVisible: boolean;
  onCanvasClick: (event: any) => void;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ sideCellCount, canvasLength, isGridVisible, onCanvasClick }, ref) => {
    return (
      <div className="canvas-container">
        {isGridVisible && (
          <div
            className="grid-overlay"
            style={{
              gridTemplateColumns: `repeat(${sideCellCount}, 1fr)`,
              gridTemplateRows: `repeat(${sideCellCount}, 1fr)`,
              width: `${canvasLength}px`,
              height: `${canvasLength}px`,
            }}
          >
            {Array.from(Array(sideCellCount * sideCellCount).keys()).map(
              (_, index) => (
                <div key={index}></div>
              )
            )}
          </div>
        )}
        <canvas
          ref={ref}
          width={canvasLength}
          height={canvasLength}
          id="canvas"
          onMouseDown={onCanvasClick}
        ></canvas>
      </div>
    );
  }
);

export default Canvas;
