import SelectBox from "./selectBox";

const options = [
  {
    title: "JavaScript",
    value: "js",
  },
  {
    title: "Python",
    value: "jpi",
  },
];

function App() {
  return (
    <main className="relative h-screen flex justify-center items-center">
      {/* background */}
      <div className="absolute z[-1] top-0 left-0 right-0 bottom-0">
        <img
          className="w-full h-full object-cover"
          src="../public/win11.jpg"
          alt="background"
        />
      </div>

      {/* main Ui */}
      <div className="max-w-sm mx-auto red">
        <SelectBox
          label="What is your favourite programing language?"
          options={options}
        />
      </div>
    </main>
  );
}

export default App;
