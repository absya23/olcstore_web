import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";
import ApiConfig from "../config/ApiConfig";

const OrderContext = createContext();
function OrderProvider(props) {
	const [orders, setOrders] = useState([]);

	const userContext = useUser();

	useEffect(() => {
		// test
		if (userContext.user) {
			const uid = userContext.user?.id_user;
			axios
				.get(`${ApiConfig}order/user/${uid}`)
				.then((res) => {
					setOrders(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userContext.user]);

	return (
		<OrderContext.Provider
			value={{
				orders,
				setOrders,
			}}
			{...props}
		></OrderContext.Provider>
	);
}

function useOrder() {
	const context = useContext(OrderContext);
	if (typeof context === "undefined")
		throw new Error("useOrder must be used within a OrderProvider");
	return context;
}

export { OrderProvider, useOrder };
