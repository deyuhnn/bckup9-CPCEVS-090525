"use client";

export default function LeftSide() {
  return (
    <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col items-center justify-center text-white p-10">
      <img
        src="logo.png"
        alt="CPC Logo"
        className="w-28 md:w-40 mb-6 drop-shadow-lg"
      />
      <h2 className="text-2xl text-nowrap md:text-4xl font-extrabold text-center tracking-wide">
        ELECTION WEBSITE
      </h2>
      <p className="text-md text-nowrap md:text-lg text-center mt-2 opacity-90">
        Vote with integrity, vote for change
      </p>
    </div>
  );
}
