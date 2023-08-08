import { useEffect, useState, useRef } from "react";
import CaretDown from "./icons/CaretDown";
import SearchIcon from "./icons/SearchIcon";

type SelectOption = {
  value: string;
  title: string;
};

type Props = {
  options: SelectOption[];
  label?: string;
  searchBox?: boolean;
  popUp?: boolean;
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
    searchBox = true,
    popUp = false,
    onChange,
    valid = true,
  } = props;

  const Overlay = useRef<null | HTMLDivElement>(null);

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

  const [selected, setSelected] = useState(getDefault());
  const [show, setShow] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const [search, setSearch] = useState("");
  const [_options, setOptions] = useState(options);

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
    setSelected(getDefault());
    setIsDefault(true);
    hideSelectModal();
  }

  useEffect(() => {
    onChangeHandler(onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    const newOption = options.filter((opt) =>
      opt.title.toLowerCase().includes(search.toLowerCase())
    );

    setOptions(newOption);
  }, [search, options]);

  return (
    <>
      <div className="relative w-full">
        {/* label .... name of selcet input */}
        {label && (
          <p className="tracking-wide font-normal text-base">{label}</p>
        )}

        {/* select box */}
        <div
          onClick={showSelectModal}
          className={`z-[99999] relative flex items-center px-3 sm:px-5 rounded-[10px] border-2 cursor-pointer ${
            label && "mt-3"
          } ${!valid && "border-red-600"}`}
        >
          {/* selceted option displayed */}
          <p
            className={`w-full flex items-center h-11 md:h-12  truncate ${
              isDefault
                ? "text-gray-500 font-extralight"
                : "text-black font-normal"
            }`}
          >
            {selected.title}
          </p>

          {/* caret svg */}
          <span
            className={`transition-transform ease-out ${
              show ? "rotate-180" : "rotate-0"
            }`}
          >
            <CaretDown className="text-gray-500 h-4 w-4" />
          </span>
        </div>

        {/* select options wrapper */}
        <ul
          className={`absolute top-[100%] z-[99999] drop-shadow-xl max-h-[90vh] w-[inherit] min-w-[280px] overflow-y-auto hide_scroll_bar bg-white ${
            popUp ? "" : ""
          } ${show ? "" : "hidden"}`}
        >
          {/* default option */}
          {options.length < 5 && (
            <button
              type="button"
              onClick={selectDefault}
              className="cursor-pointer text-left text-gray-300 bg-gray-50/30 hover:bg-blue-50/50 w-full p-2"
            >
              {defaultOpt.title}
            </button>
          )}

          {/* search box */}
          {searchBox && options.length > 5 && (
            <div className="flex items-center border border-blue-100 mx-auto w-[80%] my-3 px-2">
              <input
                className="w-full py-2 outline-none"
                onChange={(e) => setSearch(e.currentTarget.value)}
                value={search}
                type="text"
                placeholder="search here"
              />

              <SearchIcon className="h-4 w-4 text-gray-300" />
            </div>
          )}

          {/* passed options */}
          {_options.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleSelect(opt)}
              className={`cursor-pointer p-3 hover:bg-blue-50/50 ${
                selected.value === opt.value ? "bg-blue-50 text-blue-500" : ""
              }`}
            >
              {opt.title}
            </li>
          ))}
        </ul>
      </div>

      {/* overlay wrapper */}
      {show && (
        <div
          onClick={() => setShow(false)}
          ref={Overlay}
          className="fixed left-0 right-0 bottom-0 top-0  bg-transparent z-[9999]"
        />
      )}
    </>
  );
}

export default SelectBox;
