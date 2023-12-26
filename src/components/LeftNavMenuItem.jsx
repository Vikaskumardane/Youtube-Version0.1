import React from "react";

// De Strucuture the props from LeftNav comoponent

const LeftNavMenuItem = ({ text, icon, className, action }) => {
  return (
    <div
      className={
        "text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
        className
      }
      onClick={action}
    >
      {/* use the onclick event to switch different comopnent */}

      {/* using the text from the above props */}
      <span className="text-xl mr-5">{icon}</span>

      {/* the above two lines will display the icons and sections for the left navigation */}

      {text}
    </div>
  );
};

export default LeftNavMenuItem;
