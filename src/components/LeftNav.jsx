import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// importing files from src
import LeftNavMenuItem from "./LeftNavMenuItem";

// the categories are imported from the utils folder and it constit of icons required for the left Navigation section
import { categories } from "../utils/constants";

// this context is impoerted from the src/context folder
import { Context } from "../context/contextApi";

const LeftNav = () => {
  // using the hooks created in ContextAPI
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(Context);

  const navigate = useNavigate();

  // defining the click handler action from the same compo below and making css changes using clickHandler leftNavMenuItem
  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? "translate-x-1" : ""
      }`}
    >
      {/* {console.log(mobileMenu)} */}
      <div className="flex px-5 flex-col">
        {/* Now using the Categories which are imported from the utils folder and de Structing them using Map() */}
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              {/* after de structing the categories now dispplaying them on left Nav Menu Items */}
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        {/* After that now complete the LeftNavMenuItem comoponent */}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          Clone by: Vikaskumar Dane
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
