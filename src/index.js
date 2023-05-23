import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { CatalogueProvider } from "./context/catalogueContext";
import { TypesProvider } from "./context/typeProductContext";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import { ProductProvider } from "./context/productContext";
import { OrderProvider } from "./context/orderContext";
import { FavoProvider } from "./context/favoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CatalogueProvider>
        <TypesProvider>
          <ProductProvider>
            <UserProvider>
              <FavoProvider>
                <CartProvider>
                  <OrderProvider>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </OrderProvider>
                </CartProvider>
              </FavoProvider>
            </UserProvider>
          </ProductProvider>
        </TypesProvider>
      </CatalogueProvider>
    </Provider>
  </React.StrictMode>
);
