interface ColorPaletteProps {
  colors: string[];
  canvasLength: number;
  setActiveColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  canvasLength,
  setActiveColor,
}) => {
  return (
    <div className="color-palette" style={{ height: canvasLength }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
          }}
          onClick={() => setActiveColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
