import React, { useState } from "react";
import { query} from "./HelperFunctions";
import ImageGrid from "./ImageGrid";

const Form = () => {
  const [inputTextArr, setInputTextArr] = useState<string[]>(
    Array(10).fill("")
  );
  const [imageSrcArr, setImageSrcArr] = useState<string[]>(Array(10).fill(""));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { tabIndex, value } = e.target;
    setInputTextArr((inputTextArr) => {
      let newInputTextArr = [...inputTextArr];
      newInputTextArr[tabIndex] = value;
      return newInputTextArr;
    });
  };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("InputTextArr:", inputTextArr);
      setImageSrcArr(Array(10).fill(""));
      inputTextArr.forEach((inputText, idx) => {
        query({ inputs: inputText }).then((response) => {
          // Convert Blob to data URL
          const imageUrl = URL.createObjectURL(response);
          // Set the data URL as the source for the image
          setImageSrcArr((imageSrcArr) => {
            let newImageSrcArr = [...imageSrcArr];
            newImageSrcArr[idx] = imageUrl;
            return newImageSrcArr;
          });
          console.log("response for ", inputText, " = ", imageUrl);
          // console.log("Image source: ", imageSrcArr);
        });
      });
      console.log("imageSrcArr:", imageSrcArr);
    };

  return (
    <>
      <form
        className="flex flex-col rows-2 justify-center items-center mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-x-2 justify-center items-center">
        {inputTextArr.map((inputText, i) => (
          <div key={i} className="p-2">
            <label className="px-2">{`Text ${i + 1}`}</label>
            <input
              tabIndex={i}
              type="text"
              name={`input${i}`}
              value={inputText}
              className="border-solid border-2 rounded-md text-center"
              onChange={handleChange}
            />
          </div>
        ))}
        </div>
        <div>
        <button
          className="border-solid border-4 rounded-lg px-2 bg-emerald-300 m-4"
          type="submit"
        >
          Submit
        </button>
        </div>
      </form>
      <ImageGrid imageSrcArr={imageSrcArr} inputTextArr={inputTextArr}/>
    </>
  );
};

export default Form;
