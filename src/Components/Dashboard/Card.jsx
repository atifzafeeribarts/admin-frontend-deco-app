import React from "react";

function Card({ data, countData, icon }) {
  return (
    <div className="flex max-w-sm py-6 px-5 bg-[var(--dark-light-brown)] rounded-xl items-center gap-2 w-[25%] max-lg:w-[48%] max-md:w-full max-md:max-w-full">
      <div className="size-10 shrink-0">
        <div className="bg-[var(--white-color)] rounded-full p-2 flex items-center justify-center size-[40px] text-[var(--dark-light-brown)]">
           {icon}
        </div>
      </div>
      <div className="w-full font-medium">
        <h5 className="tracking-tight text-[var(--white-color)]">
          {data.name}
        </h5>
        <p className="text-[var(--white-color)]">
          {countData ? countData : "0"}
        </p>
      </div>
    </div>
  );
}

export default Card;
