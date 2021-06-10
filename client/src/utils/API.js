import axios from "axios";

export default {
    goToLogin: function () {
        (document.location.replace('/login'));
    },
    goToSignUp: function () {
        (document.location.replace('/signup'));
    },
    // Gets all users
    getUsers: function () {
        return axios.get("/user", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        });
    },
    // Gets the user with the given id
    getUser: function (id) {
        return axios.get("/user/" + id);
    },
    loginUser: function (user) {
        return axios.post("/user/login", user)
        //.then(document.location.replace('/dashboard'));
    },
    // Deletes the user with the given id
    deleteUser: function (id) {
        return axios.delete("/user/" + id);
    },
    // Saves a user to the database
    createUser: function (userData) {
        return axios.post("/user/signup", userData)
        //.then(document.location.replace('/login'));
    },
    // Updaes a user in the database
    updateUser: function (id, userData) {
        return axios.put("/user/" + id, userData);
    },
    // GET DASHBOARD and get Bearer token from local storage
    getDash: function () {
        return axios.get("/api/dashboard", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        });
    },
    logoutUser: function () {
        localStorage.clear();
        document.location.replace('/login');
    },
    // Update Likes
    addLike: function (id, likeData) {
        return axios.put(`/user/${id}/like`, likeData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
        });
    },
    getMatch: function () {
        return axios.get("/api/matches", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        });
    },
    // Takes user to Spotify landing page from
    goToSpotify: function () {
        (document.location.replace('/spotify-home'));
    },
};