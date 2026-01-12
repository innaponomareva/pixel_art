import clsx from 'clsx';
import { forwardRef } from 'react';

interface PaintBucketProps {
  activeColor: string;
  className?: string;
  onClickHandler?: () => void;
}
const PaintBucket = forwardRef<SVGSVGElement, PaintBucketProps>(
  ({ activeColor = 'black', className, onClickHandler, ...restProps }, ref) => {
    return (
      <svg
        ref={ref}
        className={clsx('paint-bucket', className)}
        onClick={onClickHandler ? onClickHandler : null}
        viewBox="0 0 235.65 284.91"
        {...restProps}
      >
        <polygon
          fill={activeColor}
          points="219.91 160.87 118.09 262.69 16.26 160.87 219.91 160.87"
        />
        <polyline
          stroke="#676c71"
          strokeWidth={20}
          fill="none"
          points="118.09 59.04 16.26 160.87 118.09 262.69 219.91 160.87 67.17 8.13"
        />
        <line
          stroke="#676c71"
          strokeWidth={20}
          x1="16.26"
          y1="160.87"
          x2="219.91"
          y2="160.87"
        />
      </svg>
    );
  }
);

export default PaintBucket;
