import SelectBox from "./selectBox";
import { frameworkOption, roleOption, languageOption } from "./assets/option";

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
      <section className="w-full max-w-2xl mx-auto min-h-[500px] bg-white p-5">
        <div className="max-w-lg mx-auto">
          <SelectBox
            // popUp
            label="What is your favourite programing language?"
            options={languageOption}
          />

          <br />
          <SelectBox
            // popUp
            label="What is your favourite framework?"
            options={frameworkOption}
          />

          <br />
          <SelectBox
            popUp
            label="What is your favourite Role?"
            options={roleOption}
          />
        </div>

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
      </section>
    </main>
  );
}

export default App;
