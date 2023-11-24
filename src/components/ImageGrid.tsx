export default ({
  imageSrcArr,
  inputTextArr,
}: {
  imageSrcArr: string[];
  inputTextArr: string[];
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center my-2 mx-4">
      {imageSrcArr.length &&
        imageSrcArr.map((a, i) => {
          return (
            <img
              key={i}
              src={imageSrcArr[i]}
              alt={inputTextArr[i]}
              className={`w-64 h-64 mx-2 mt-2 border-solid border-black border-2 ${
                imageSrcArr[i] === "" ? "animate-pulse" : ""
              } `}
            />
          );
        })}
    </div>
  );
};
