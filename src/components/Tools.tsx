import { Children, JSXElementConstructor, ReactElement } from "react";
import ToolsItem from "./ToolsItem";

interface ToolsProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>[];
  tooltipList: string[];
}

const Tools: React.FC<ToolsProps> = ({ children, tooltipList }) => {
  let count = 0;
  return (
    <div className="tools-container">
      {Children.map(children, (child) => (
        <ToolsItem tooltip={tooltipList[count++]}>{child}</ToolsItem>
      ))}
    </div>
  );
};

export default Tools;
