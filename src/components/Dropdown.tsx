import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { BsChevronDown, BsCheck } from "react-icons/bs";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  onOptionClick?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  onOptionClick,
}) => {
  return (
    <Listbox
      as="div"
      value={selectedOption}
      onChange={setSelectedOption}
      className="listbox"
    >
      <Listbox.Button className="listbox-btn">
        <div>{selectedOption}</div>
        <BsChevronDown />
      </Listbox.Button>
      <Listbox.Options className="listbox-options">
        {options.map((option, index) => (
          <Listbox.Option key={index} value={option} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={clsx(
                  "listbox-option",
                  selected && "listbox-option-selected"
                )}
                onClick={onOptionClick ? () => onOptionClick(option) : null}
              >
                <span>{option}</span>
                {selected && <BsCheck className="selected-icon" />}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default Dropdown;
