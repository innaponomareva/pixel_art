import {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  useState,
} from 'react';
import Tooltip from './Tooltip';

interface ToolsItemProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  tooltip: string;
}

const ToolsItem: React.FC<ToolsItemProps> = ({ children, tooltip }) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  return (
    <div className="tools-btn">
      {cloneElement(children, {
        onMouseEnter: () => setTooltipHover(true),
        onMouseLeave: () => setTooltipHover(false),
      })}
      {tooltip && tooltipHover && <Tooltip tooltip={tooltip} />}
    </div>
  );
};

export default ToolsItem;
