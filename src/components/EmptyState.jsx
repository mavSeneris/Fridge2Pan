import React from "react";
import BasketImage from "../assets/EmptyBasket.png";

export default function EmptyState() {
  return (
    <div className="empty-state">
        <img
          src={BasketImage}
          alt="Basket"
          className="empty-state__image empty-state__image--basket"
        />
        <p className="empty-state__ingredients-message">
          Your basket is <span className="empty-message">Empty</span>
        </p>
        <p className="empty-state__ingredients-message">
          Add items to get started
        </p>
    </div>
  );
}
