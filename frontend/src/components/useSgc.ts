import {useEffect, useState} from "react";
import axios from "axios";
import {NasaResponseType} from "../type/NasaResponseType";
import {toast} from "react-toastify";

export default function useSgc() {

    const [nasaApiData, setNasaApiData] = useState<NasaResponseType[]>([]);

    const getDataFromNasaApi = () => {
        axios.get("/api/sgc/nasaapi")
            .then(response => {
                return response.data
            })
            .then(data => setNasaApiData(data))
            .catch(error => console.error(error))
    }

    useEffect(
        () => getDataFromNasaApi(), []
    )

    const [me, setMe] = useState<string>("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.get("api/users/login", {auth: {username, password: password}})
            .then(response => response.data)
            .then(setMe)
            .catch(() => toast("Username or password is incorrect."))
    }

    const fetchMe = () => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setMe)
    }

    useEffect(
        () => {
            fetchMe();
            axios.interceptors.response.use(response => response, error => {
                const status = error.response ? error.response.status : null;
                if (status === 401 && !error.config.auth) {
                    toast("Session timed out")
                    fetchMe()
                }
                return Promise.reject(error)
            })
        },
        []
    )

    const logout = () => {
        axios.get("api/users/logout")
            .then(response => response.data)
            .then(() => setMe("anonymousUser"))
    }

    return {nasaApiData, me, login, logout, setUsername, setPassword}
}
