import axios from 'axios';
axios.defaults.withCredentials = true

export default {
    //login API
    //returns EMPTY on success
    //returns error message on failure
    login: async function(email, password) {
        const body = { username: email, password: password };
        try {
          console.log('url', process.env.REACT_APP_SERVER_URL)
          const { data: response, status: statusid } = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/login', body);
            if (statusid === 200) {
                // console.log("logged in", response.firstname, response.lastname)
                // localStorage.setItem("firstname", response.firstname);
                // localStorage.setItem("lastname", response.lastname);
                // localStorage.setItem("email", email);
                // localStorage.setItem("teacher", response.teacher);
                localStorage.setItem("user_id", response.userID);

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
            const { data: response, status: statusid } = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/register', body);
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
    getAssignment: async function(id) {
        let res = await axios.get(process.env.SERVER_URL + "/homework/assignment/getAssignment?assignmentID=" + id);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    },
    getUserAssignments: async function() {
        let res = await axios.get(process.env.SERVER_URL + "/user/getUserAssignments");
        if (res.status === 200) {
            return res.data.assignments;
        } else {
            return null;
        }
    },
    getAnswers: async function(id) {
        let res = await axios.get(process.env.SERVER_URL + "/homework/answersheet/getAnswerSheet?answerSheetID=" + id);
        if (res.status === 200) {
            return res.data.answers;
        } else {
            return null;
        }
    },
    addAnswers: async function(answers, id) {
        let res = await axios.post(process.env.SERVER_URL + "/answerSheet/addAnswerSheet", {answerSheetID: id, answers: answers});
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    },
};
