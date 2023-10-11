import React, { useRef } from "react";
import notFound from "../assets/not_found.svg";
import { Play, PlayCircle } from "lucide-react";

const WordInfo = ({ result, error }) => {
  console.log(result);
  const audioRef = useRef(null);

  const handlePlayPause = (e) => {
    audioRef.current.play();
  };

  return (
    <div className="mt-7 px-4">
      {error ? (
        <div className="mt-16 flex flex-col items-center justify-center">
          <img
            src={notFound}
            alt="Not Found"
            className="w-72 object-contain mb-7"
          />
          <h1 className="dark:text-slate-500 text-2xl font-semibold">
            {result.title}
          </h1>
          <h3 className="dark:text-slate-500 text-lg font-normal">
            {result.message}
          </h3>
          <p className="dark:text-slate-500 font-thin">{result.resolution}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="dark:text-slate-300 capitalize text-lg md:text-3xl first-letter:text-5xl">
              {result[0]?.word ? `${result[0]?.word}` : null}
            </h2>
            <div>
              {result[0]?.phonetics[0]?.audio ? (
                <>
                  <audio
                    src={result[0]?.phonetics[0]?.audio}
                    ref={audioRef}
                    hidden
                  />
                  <PlayCircle
                    className="cursor-pointer dark:bg-white w-10 h-10 rounded-md flex items-center justify-center p-1 bg-black/95 text-white dark:text-black/95"
                    onClick={handlePlayPause}
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className="mt-8">
            {result[0]?.meanings?.map((item) => {
              return (
                <div key={item.partOfSpeech}>
                  <h3 className="dark:text-slate-400 first-letter:text-3xl text-xl capitalize">
                    {item.partOfSpeech ? `${item.partOfSpeech} :-` : null}
                  </h3>
                  <ul className="list-disc ml-8 sm:ml-16 my-4">
                    {item?.definitions?.map(({ definition }, ind) => {
                      return (
                        <li
                          className="dark:text-slate-400 text-sm md:text-base my-3 md:my-2 capitalize"
                          key={ind}
                        >
                          {definition}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default WordInfo;
