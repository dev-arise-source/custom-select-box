import SelectBox from "./selectBox";

const options = [
  {
    title: "JavaScript",
    value: "js",
  },
  {
    title: "Python",
    value: "jpi1",
  },
  {
    title: "Python",
    value: "jpi2",
  },
  {
    title: "Python",
    value: "jpi3",
  },
  {
    title: "Python",
    value: "jpi4",
  },
  {
    title: "Python",
    value: "jpi5",
  },
];

function App() {
  return (
    <main className="relative min-h-screen flex justify-center items-center">
      {/* background */}
      <div className="absolute z-[-1] top-0 left-0 right-0 bottom-0">
        <img
          className="w-full h-full object-cover"
          src="/win11.jpg"
          alt="background"
        />
      </div>

      {/* main Ui */}
      <div className="w-full max-w-sm md:max-w-lg mx-auto min-h-[500px] bg-white p-5">
        <SelectBox
          popUp
          label="What is your favourite programing language?"
          options={options}
        />
        <SelectBox
          popUp
          label="What is your favourite programing language?"
          options={options}
        />

        {/* <select name="Hello" id="">
          <option value="hell">Hello 1</option>
          <option value="hell">Hello 2</option>
          <option value="hell">Hello 3</option>
          <option value="hell">Hello 4</option>
          <option value="hell">Hello 5</option>
          <option value="hell">Hello 6</option>
          <option value="hell">Hello 7</option>
          <option value="hell">Hello 8</option>
        </select> */}
      </div>
    </main>
  );
}

export default App;
