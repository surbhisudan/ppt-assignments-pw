import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const productList = document.getElementById("product-list");

        data.forEach(product => {
          const card = document.createElement("div");
          card.classList.add("card");

          const img_box = document.createElement("div");
          img_box.classList = "img-container";

          const img = document.createElement("img");
          img.src = product.image;
          img.alt = product.title;
          img_box.appendChild(img);
          card.appendChild(img_box);

          const title = document.createElement("h3");
          title.textContent = product.title;
          card.appendChild(title);

          const price = document.createElement("p");
          price.textContent = `Price: ${product.price}`;
          card.appendChild(price);

          const buttonContainer = document.createElement("div");
          buttonContainer.classList = "btn-container";

          const addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Add to Cart";
          buttonContainer.appendChild(addToCartButton);

          const buyButton = document.createElement("button");
          buyButton.textContent = "Buy";
          buttonContainer.appendChild(buyButton);

          card.appendChild(buttonContainer);

          productList.appendChild(card);
        });
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="page">
          <h3>All products</h3>
        </div>
        <div id="product-list" className="row"></div>
      </div>
    </>
  );
}

export default App;