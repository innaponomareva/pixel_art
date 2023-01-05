interface TooltipProps {
  tooltip: string;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltip }) => (
  <div className="custom-tooltip" style={{ width: `${tooltip.length}ex` }}>
    {tooltip}
  </div>
);

export default Tooltip;
