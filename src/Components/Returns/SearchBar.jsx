import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter } from "../../Redux/Slices/globalFilterSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const [data, setdata] = useState(query);
  useEffect(() => {
    setdata(query);
  }, [query]);
  const handleSearch = (e) => {
    dispatch(setGlobalFilter({ query: e.target.value}));
  };
  const handleClear = () => {
    dispatch(setGlobalFilter({ query: ""}));
  }
  return (
    <div className="flex w-full relative items-center">
      <div
        className="absolute top h-full flex justify-center items-center w-12 text-sm"
      >
        <MdSearch size={25} color="var(--dark-light-brown)" />
      </div>
      <input
        type="text"
        placeholder="Search all Returns"
        className="pl-10 px-2 py-3 w-full rounded-lg border-2 border-[var(--dark-light-brown)] bg-[var(--light-cream-background)] outline-none focus:outline-none focus:border-[var(--dark-light-brown)] appearance-none text-sm"
        value={query.query}
        onChange={(e) => handleSearch(e)}
      />

      {query.query && <div onClick={handleClear} className="absolute top right-2 text-[var(--dark-light-brown)] cursor-pointer hover:scale-110 transition-all"><RxCrossCircled  size={22}/></div>}
      
    </div>
  );
}

export default SearchBar;
