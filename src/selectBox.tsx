import { useEffect, useState } from "react";
import CaretDown from "./icons/CaretDown";

type SelectOption = {
  value: string;
  title: string;
};

type Props = {
  options: SelectOption[];
  label: string;
  defaultOption?: SelectOption;
  valid?: boolean;
  errorColor?: string;
  successColor?: string;
  onChange?: (e: SelectOption) => void;
};

function SelectBox(props: Props) {
  const {
    options,
    defaultOption,
    label,

    onChange,
    valid = true,
  } = props;

  function getDefault(): SelectOption {
    if (defaultOption) return defaultOption;

    console.log(
      `You did not pass a default option at ${label} select box . default could be a titled description of your select box with a value of an empty string ""`
    );

    return {
      title: "Select an option",
      value: "",
    };
  }

  const defaultOpt = getDefault();
  const [selected, setSelected] = useState(defaultOpt);
  const [show, setShow] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  function onChangeHandler(onchange: Props["onChange"]) {
    if (onChange) {
      onchange!(selected);
    }
  }

  // show modal
  function showSelectModal() {
    setShow(!show);
  }

  // hide modal
  function hideSelectModal() {
    setShow(false);
  }

  function handleSelect(opt: SelectOption) {
    setSelected(opt);
    setIsDefault(false);
    hideSelectModal();
  }

  function selectDefault() {
    setSelected(defaultOpt);
    setIsDefault(true);
    hideSelectModal();
  }

  useEffect(() => {
    onChangeHandler(onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="relative w-full">
      {/* label .... name of selcet input */}
      <p className="tracking-wide font-normal text-base">{label || " "}</p>

      {/* select box */}
      <div
        onClick={showSelectModal}
        className={`flex items-center px-3 sm:px-5 rounded-[10px] border-2 cursor-pointer ${
          label && "mt-3"
        } ${!valid && "border-red-600"}`}
      >
        {/* selceted option displayed */}
        <p
          className={`w-full flex items-center h-11 md:h-12 font-extralight truncate ${
            isDefault ? "text-grey-4" : "text-black-1"
          }`}
        >
          {selected.title}
        </p>

        <span>
          <CaretDown />
        </span>
      </div>

      {/* select options wrapper */}
      <ul
        className={`absolute top-[100%] z-20 drop-shadow-xl max-h-[90vh] w-[inherit] min-w-[280px] overflow-y-auto hide_scroll_bar bg-white ${
          show ? "" : "hidden"
        }`}
      >
        {/* default option */}
        <button
          type="button"
          onClick={selectDefault}
          className="cursor-pointer text-grey-4 text-left bg-[whitesmoke] w-full p-2"
        >
          {defaultOpt.title}
        </button>

        {/* passed options */}
        {options.map((opt) => (
          <li
            key={`index + ${opt.title}`}
            onClick={() => handleSelect(opt)}
            onKeyUp={() => {}}
            role="menuitem"
            tabIndex={0}
            className={`cursor-pointer p-3 hover:bg-black-5 ${
              selected.value === opt.value ? "bg-pink-5" : ""
            }`}
          >
            {opt.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBox;
