import axios from "axios";

export default {
	user: {
		login: (credentials) => 
			axios.post('/auth/login', { credentials }).then(res => res.data.user)
	}
}