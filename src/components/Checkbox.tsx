import { ReactNode } from "react";
import { BsCheck } from "react-icons/bs";

interface CheckboxProps {
  name: string;
  value?: string;
  checked: boolean;
  children: ReactNode;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  value,
  onChange,
  checked,
  children,
}) => {
  return (
    <div className="checkbox">
      <div className="input-container">
        <input
          type="checkbox"
          id={`${name}-${value}`}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {checked && <BsCheck className="icon" />}
      </div>

      <label htmlFor={`${name}-${value}`}>{children}</label>
    </div>
  );
};

export default Checkbox;
