import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";
import ApiConfig from "../config/ApiConfig";

const FavoContext = createContext();
function FavoProvider(props) {
	const [favoProds, setFavoProds] = useState([]);

	const userContext = useUser();

	useEffect(() => {
		// test
		if (userContext.user) {
			const uid = userContext.user?.id_user;
			axios
				.get(`${ApiConfig}favo/${uid}`)
				.then((res) => {
					setFavoProds(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userContext.user]);

	return (
		<FavoContext.Provider
			value={{
				favoProds,
				setFavoProds,
			}}
			{...props}
		></FavoContext.Provider>
	);
}

function useFavo() {
	const context = useContext(FavoContext);
	if (typeof context === "undefined")
		throw new Error("useFavo must be used within a FavoProvider");
	return context;
}

export { FavoProvider, useFavo };
