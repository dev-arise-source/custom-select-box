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
  placeholder?: string;
  searchBox?: boolean;
  popUp?: boolean;
  defaultOption?: SelectOption;
  valid?: boolean;
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
    placeholder = "Search here ...",
  } = props;

  const Overlay = useRef<null | HTMLDivElement>(null);
  const OptionsWrapper = useRef<null | HTMLUListElement>(null);
  const SelectBox = useRef<null | HTMLDivElement>(null);

  function getDefault(): SelectOption {
    if (defaultOption) return defaultOption;

    // console.log(
    //   `You did not pass a default option at ${label} select box . default could be a titled description of your select box with a value of an empty string ""`
    // );

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
  const [_popUp, setPopUp] = useState(popUp);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

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
    setSearch("");
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

  useEffect(() => {
    if (popUp) return; // needless running the logic
    if (!SelectBox.current || !OptionsWrapper.current) return;
    const wrapper = OptionsWrapper.current;
    const selectBox = SelectBox.current;

    // select box rect
    const rect = selectBox.getBoundingClientRect();
    const selectBoxTop = rect.top;
    const selectBoxBottom = rect.bottom;

    const wrapperHeight = wrapper.getBoundingClientRect().height;
    const deviceHeight = window.innerHeight;

    const spaceBelowSelectBox = deviceHeight - selectBoxBottom;
    const spaceAboveSelectBox = selectBoxTop;

    if (wrapperHeight < spaceBelowSelectBox) {
      setPosition("bottom");
      return console.log("enough space at the bottom");
    } else if (wrapperHeight < spaceAboveSelectBox) {
      setPosition("top");
      return console.log("enough space at the top");
    } else {
      setPopUp(true);
      return console.log("wrapper is too long");
    }
  }, [show, popUp]);

  useEffect(() => {
    setPopUp(popUp);
  }, [popUp]);

  return (
    <>
      <div className="relative w-full">
        {/* label .... name of selcet input */}
        {label && (
          <p className="tracking-wide font-normal text-base">{label}</p>
        )}

        {/* select box */}
        <div
          ref={SelectBox}
          onClick={showSelectModal}
          className={`bg-white flex items-center px-3 sm:px-5 rounded-[10px] border-2 cursor-pointer ${
            label && "mt-3"
          } ${!valid && "border-red-600"} `}
        >
          {/* selceted option displayed */}
          <p
            className={`w-full flex items-center h-11  truncate ${
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
          ref={OptionsWrapper}
          className={`border z-[99999] w-[inherit] min-w-[280px] overflow-y-auto bg-white hide_scroll_bar ${
            _popUp
              ? "fixed max-w-sm max-h-[350px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded"
              : `absolute max-h-[90vh] ${
                  position === "bottom" ? "top-[100%]" : "bottom-[100%]"
                }`
          } ${show ? "" : "collapse"}`}
        >
          {/* default option */}
          {(!searchBox || options.length < 6) && (
            <button
              type="button"
              onClick={selectDefault}
              className="cursor-pointer text-left text-gray-300 bg-gray-50/30 hover:bg-blue-50/50 w-full p-2"
            >
              {getDefault().title}
            </button>
          )}

          {/* search box */}
          {searchBox && options.length > 5 && (
            <div className="sticky top-0 bg-white pb-2">
              <p className="tracking-wide font-normal text-center p-2 text-base text-gray-500 mt-1">
                Selected:{" "}
                <span className="text-blue-400"> {selected.title}</span>
              </p>

              <div className="flex items-center border border-blue-100 mx-auto w-[80%] mt-1 px-2">
                <input
                  className="w-full py-2 outline-none"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  value={search}
                  type="text"
                  placeholder={placeholder}
                />

                <SearchIcon className="h-4 w-4 text-gray-300" />
              </div>
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
          className={`${
            _popUp ? "bg-neutral-900/10" : "bg-transparent"
          } fixed left-0 right-0 bottom-0 top-0 z-[9999]`}
        />
      )}
    </>
  );
}

export default SelectBox;
