import { Search } from "lucide-react";
import React from "react";

const SearchComp = ({ searchWord, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm w-full px-2 sm:px-3 h-8 sm:h-10 flex items-center gap-2 border border-slate-400  dark:border-transparent outline-none dark:focus-within:border-green-500 rounded-md"
    >
      <Search className="dark:stroke-slate-300 stroke-slate-500 text-base sm:text-lg" />
      <input
        type="search"
        placeholder="Search for a word's meaning "
        value={searchWord}
        onChange={onChange}
        className="w-full h-full  bg-transparent border-0 outline-none
      dark:text-white text-sm sm:text-lg 
      "
      />
    </form>
  );
};

export default SearchComp;
