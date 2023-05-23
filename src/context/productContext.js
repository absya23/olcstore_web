import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import ApiConfig from "../config/ApiConfig";

const ProductContext = createContext();
function ProductProvider(props) {
	const [product, setProduct] = useState([]);

	useEffect(() => {
		// test
		axios
			.get(`${ApiConfig}product`)
			.then((res) => {
				setProduct(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<ProductContext.Provider
			value={{ product, setProduct }}
			{...props}
		></ProductContext.Provider>
	);
}

function useProduct() {
	const context = useContext(ProductContext);
	if (typeof context === "undefined")
		throw new Error("useProduct must be used within a ProductProvider");
	return context;
}

export { ProductProvider, useProduct };
