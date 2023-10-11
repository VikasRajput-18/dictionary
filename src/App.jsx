import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Search from "./components/SearchComp";
import axios from "axios";
import WordInfo from "./components/WordInfo";

import book from "./assets/book.svg";

const App = () => {
  const [searchWord, setSearchWord] = useState("");

  const theme = JSON.parse(localStorage.getItem("theme"));
  const element = document.documentElement;
  const [themeStatus, setThemeStatus] = useState("dark");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeTheme = () => {
    if (element.className.includes("dark")) {
      element.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify(""));
      setThemeStatus("");
    } else {
      element.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
      setThemeStatus("dark");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      setThemeStatus("dark");
    } else {
      element.classList.remove("dark");
      setThemeStatus("");
    }
  }, [theme]);

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      setResult(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setResult(error.response.data);
    }

    setSearchWord("");
  };

  return (
    <main className="realtive min-w-screen min-h-screen h-full pb-8  dark:bg-black/95">
      <div className="blurCircleOrange" />
      <div className="blurCirclePink" />
      <div className="blurCircleBlue" />
      <section className="w-full max-w-7xl mx-auto">
        <nav className="py-4 sm:py-8 flex justify-between items-center gap-4 px-3 sm:px-8 md:px-4">
          <h1
            className="logo flex-1 text-green-500 font-semibold dark:text-white cursor-pointer"
            onClick={() => setResult("")}
            style={{
              textShadow:
                theme === "dark"
                  ? "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff,0 0 80px #0ff, 0 0 90px #0ff, 0 0 100px #0ff, 0 0 150px #0ff"
                  : "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff,0 0 80px #0ff, 0 0 90px #0ff, 0 0 100px #0ff, 0 0 150px #0ff",
            }}
          >
            WordGrove
          </h1>

          <div className="w-full flex-1 flex items-center justify-end gap-4">
            <Search
              searchWord={searchWord}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <button onClick={handleChangeTheme} className="text-white">
              {theme === "dark" ? (
                <SunIcon className="" />
              ) : (
                <MoonIcon className="stroke-black" />
              )}
            </button>
          </div>
        </nav>
        <div className="border-b border-b-slate-500" />
        {loading ? (
          <div className="mt-7 px-4">
            <h2 className="w-36 h-6 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
            <div className="mt-8">
              <div>
                <h3 className="w-44 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                <ul className="list-disc ml-16 my-4">
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <div>
                <h3 className="w-44 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                <ul className="list-disc ml-16 my-4">
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                  <li className="w-10/12 mt-3 h-4 rounded-2xl dark:bg-slate-700 bg-slate-300 animate-pulse" />
                </ul>
              </div>
            </div>
          </div>
        ) : result ? (
          <WordInfo result={result} error={error} />
        ) : (
          <div className="flex items-center mt-7 justify-center px-4">
            <div className="mt-16 flex flex-col items-center justify-center">
              <img src={book} alt="book" className="w-80 object-contain mb-2" />
              <h1 className="dark:text-slate-500 text-2xl font-semibold text-center">
                WordGrove: Your Simple Path to Words and Definitions
              </h1>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
