import React from "react";

function Card({ data }) {
  return (
    <div className="flex max-w-sm py-6 px-5 bg-[var(--dark-light-brown)] border border-gray-200 rounded-xl shadow  items-center gap-2 w-[25%] max-lg:w-[48%] max-md:w-full max-md:max-w-full">
      <div className="size-10 shrink-0">
        <img className="bg-[var(--white-color)] rounded-full p-2" src="/bag.png" alt="" />
      </div>
      <div className="w-full">
        <h5 className="font-medium tracking-tight text-[var(--white-color)]">
          {data.name}
        </h5>
        <p className="font-bold text-[var(--white-color)]">
          {data?.value}
        </p>
      </div>
    </div>
  );
}

export default Card;
