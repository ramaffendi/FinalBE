import React, { useEffect, useRef } from "react";
import { menu_list } from "../../src/assets/assets";
import "./Style.css";

const ExploreMenu = ({ category, setCategory }) => {
  const exploreMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exploreMenuRef.current &&
        !exploreMenuRef.current.contains(event.target)
      ) {
        setCategory("All");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCategory]);

  return (
    <div className="explore-menu" id="explore-menu" ref={exploreMenuRef}>
      <h2>Menu Kami</h2>
      <p className="explore-menu-text">
        Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
        Similique assumenda nobis inventore assumenda nobis inventore.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
