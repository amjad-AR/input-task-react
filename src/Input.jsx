import React, { useState } from "react";

function Input() {
  const [name, setName] = useState("Your name");
  const [savedName, setSavedName] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 

  const handleFocus = () => {
    if (name === "Your name") setName("");
  };

  const handleBlur = () => {
    if (name === "") setName("Your name");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (name.trim() === "" || name === "Your name") return;

    if (editIndex !== null) {
      
      setSavedName((prev) =>
        prev.map((item, index) => (index === editIndex ? name : item))
      );
      setEditIndex(null);
    } else {
      
      setSavedName((prev) => [...prev, name]);
    }

    setName("Your name");
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    setSavedName([]);
    setEditIndex(null);
    setName("Your name");
  };

  const handleDelOne = (indexDelete) => {
    setSavedName((prev) => prev.filter((_, index) => index !== indexDelete));
  };

  const handleEdit = (index) => {
    setName(savedName[index]);
    setEditIndex(index);
  };

  return (
    <form
      action=""
      className="w-[50%] h-[50%] bg-gray-700 flex flex-col items-center gap-2.5 rounded-2xl shadow-2xl text-amber-50 text-2xl p-3"
    >
      <input
        onChange={(event) => setName(event.target.value)}
        value={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="bg-gray-500 rounded-xl"
      />
      <p>Name: {name}</p>

      <div className="w-[50%] flex justify-between">
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer bg-emerald-600 w-[30%] rounded-3xl hover:scale-105 transition"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>

        <button
          type="button"
          onClick={handleDeleteAll}
          className="cursor-pointer bg-red-800 w-[30%] rounded-3xl hover:scale-105 transition"
        >
          Delete All
        </button>
      </div>

      {savedName.length > 0 && (
        <div className="mt-4 w-[80%] bg-amber-50 rounded-xl shadow-lg overflow-hidden">
          <h3 className="font-bold mb-0 bg-amber-200 text-gray-800 sticky top-0 z-10 py-2 px-3">
            Saved Names:
          </h3>

          {/* سكّرول بس للقائمة */}
          <div className="flex flex-col gap-3 max-h-40 overflow-y-scroll p-3">
            {savedName.map((n, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center gap-6 bg-gray-700 text-white rounded-lg px-3 py-2"
              >
                <p className="w-[30%] text-start">{n}</p>

                <button
                  type="button"
                  onClick={() => handleDelOne(index)}
                  className="cursor-pointer bg-red-800 w-[20%] rounded-3xl hover:scale-105 transition"
                >
                  del
                </button>

                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="cursor-pointer bg-gray-800 w-[20%] rounded-3xl hover:scale-105 transition"
                >
                  edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

export default Input;
