import React from "react";

const AddPage: React.FC = () => {
  return (
    <div className="w-2/3 md:w-3/6 mx-auto mt-52 md:mt-32 font-jost">
      <form className="space-y-5">
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="text"
            id="word"
            name="word"
            placeholder="Write and select a new word here...."
            className="block w-full p-4 border border-blueBorder rounded-md drop-shadow-md"
          />
        </div>
        <div>
          <label
            htmlFor="context"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <textarea
            id="context"
            name="context"
            placeholder="Write the context related to this new word here..."
            className="block w-full h-32 p-4 pt-2 border border-blueBorder rounded-md drop-shadow-md text-top"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-4 px-4 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
