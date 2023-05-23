import axios from "axios";
import ApiConfig from "../config/ApiConfig";

// PRODUCT
export default function requestGetProduct() {
	return axios.request({
		method: "GET",
		url: `${ApiConfig}product`,
		params: {},
	});
}

export function requestGetProductCata(id_cata = 1) {
	return axios.request({
		method: "GET",
		url: `${ApiConfig}product/cata/${id_cata}`,
	});
}

//  CATALOGUE
export function requestGetCata() {
	return axios.request({
		method: "GET",
		url: `${ApiConfig}catalogue`,
	});
}

// TYPE PRODUCT
export function requestGetType() {
	return axios.request({
		method: "GET",
		url: `${ApiConfig}types`,
	});
}
