import React from "react";

const Loader = () => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-100 mx-auto"></div>
      <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
      {/* <p className="text-zinc-600 dark:text-zinc-400">Please wait</p> */}
    </div>
  );
};

export default Loader;
