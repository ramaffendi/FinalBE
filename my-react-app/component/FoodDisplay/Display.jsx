import React, { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./Display.css";

const Display = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h3>Makanan Favorit Kami</h3>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Display;
