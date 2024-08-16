import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter } from "./../Redux/Slices/globalFilterSlice";

function SearchBar({ filter, setFilter }) {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const [data, setdata] = useState(query);

  useEffect(() => {
    setdata(query);
  }, [query]);

  const handleSearch = (e) => {
    dispatch(setGlobalFilter({ query: e.target.value}));
  };

  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="Search"
        className="p-4 w-full rounded-lg rounded-r-none border-2 border-[var(--dark-light-brown)] bg-[var(--light-cream-background)] outline-none focus:outline-none focus:border-[var(--dark-light-brown)] appearance-none text-sm max-sm:p-2"
        // value={query.query}
        onChange={(e) => handleSearch(e)}
      />
      <p
        onClick={handleSearch}
        className="flex justify-center items-center w-12 bg-[var(--dark-light-brown)] rounded-lg rounded-l-none text-sm"
      >
        <MdSearch size={25} color="var(--white-color)" />
      </p>
    </div>
  );
}

export default SearchBar;
