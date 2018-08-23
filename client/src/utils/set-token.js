import axios from "axios";
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		delete axios.default.headers.common["Authorization"];
	}
};
export default setAuthToken;
