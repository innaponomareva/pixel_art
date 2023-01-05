interface ColorInpuProps {
  activeColor: string;
  setActiveColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorInput: React.FC<ColorInpuProps> = ({
  activeColor,
  setActiveColor,
  ...restProps
}) => {
  return (
    <input
      type="color"
      name="color"
      id="color"
      value={activeColor}
      onChange={(event) => setActiveColor(event.target.value)}
      {...restProps}
    />
  );
};

export default ColorInput;
