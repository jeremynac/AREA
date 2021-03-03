import axios from 'axios';
axios.defaults.withCredentials = true
axios.defaults.headers = {
    user_id: localStorage.userID
}
let url = "https://area.gen-host.fr"

export default {
    //login API
    //returns EMPTY on success
    //returns error message on failure
    login: async function(email, password) {
        const body = { username: email, password: password };
        try {
          console.log('url', process.env.REACT_APP_SERVER_URL)
          const { data: response, status: statusid } = await axios.post(url + '/auth/login', body);
            if (statusid === 200) {
                console.log("logged in", response.firstname, response.lastname)
                localStorage.setItem("firstname", response.firstname);
                localStorage.setItem("lastname", response.lastname);
                localStorage.setItem("email", email);
                // localStorage.setItem("teacher", response.teacher);
                localStorage.setItem("userID", response.userID);
                axios.defaults.headers = {
                    user_id: localStorage.userID
                }
                return true
            }
        } catch (err) {
            // localStorage.clear();
            console.log(err)
            return false;
        }
        return false;
    },
    //register API
    //returns EMPTY on success
    //returns error message on failure
    register: async function(email, password, firstname, lastname) {
        try {
        const body = { username: email, password: password, firstname: firstname, lastname: lastname, /* teacher: teacher */ };
        console.log('url', process.env.REACT_APP_SERVER_URL)
            const { data: response, status: statusid } = await axios.post('/auth/register', body);
            console.log('url', process.env.SERVER_URL)
            if (statusid === 200) {
                // localStorage.setItem("token", response.user.token);
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("email", email);
                localStorage.setItem("userID", response.userID);
                //localStorage.setItem("teacher", teacher);
                return true; //
            }
            return false; //
        } catch (err) {
            localStorage.clear();
            return false; //err.response.data.errors;
        }
    },
    //Update Password API
    updatePassword: async function(password) {
        const body = { password: password};
        const { status: statusid } = await axios.post('/user/password/update', body);
        if (statusid === 200) {
            // localStorage.setItem("token", response.user.token);
            return true; //
        }
        return false;
    },
    //Update Informations API
    updateInformations: async function(email, firstname, lastname) {
        const body = { username: email, firstname: firstname, lastname: lastname};
        const { status: statusid } = await axios.post('/user/update', body);
        if (statusid === 200) {
            localStorage.setItem("firstname", firstname);
            localStorage.setItem("lastname", lastname);
            localStorage.setItem("email", email);
            // localStorage.setItem("token", response.user.token);
            return true; //
        }
        return false;
    },
    //isAuth API
    //returns 
    isAuth: function() {
        return (localStorage.getItem("token") !== null);
    },
    logout: async function() {
        try {
            console.log('logging out')
            await axios.get('/user/logout');
            console.log('logged out')
        } catch (e) {
            console.log("Error: ", e);
        }
        localStorage.clear();
        window.location = "/";
    },
    getServiceAllStatus: async function() {
        try {
            let res = await axios.get(url + '/service/all/status', {withCredentials: true});
            return res;
        } catch (err) {
            return err;
        }
    },

};
