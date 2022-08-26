import {useEffect, useState} from "react";
import axios from "axios";
import {NasaResponseType} from "../type/NasaResponseType";
import {toast} from "react-toastify";
import {UserItemType} from "../type/UserItemType";

export default function useSgc() {

    const [nasaApiData, setNasaApiData] = useState<NasaResponseType[]>([]);
    const [me, setMe] = useState<string>("anonymousUser");
    const [userItems, setUserItems] = useState<UserItemType[]>([]);
    const filteredNasData: UserItemType[] = [];

    const filterNasaData = () => {
        nasaApiData.forEach(item => {
            if (item.media_type === "image")
                filteredNasData.push({explanation: item.explanation, title: item.title, url: item.url})
        })
    }

    const getDataFromNasaApi = () => {
        axios.get("/api/sgc/nasaapi")
            .then(response => {
                return response.data
            })
            .then(data => setNasaApiData(data))
            .then(filterNasaData)
            .catch(error => console.error(error))
    }

    useEffect(
        () => {
            getDataFromNasaApi()
            listUserItems()
            fetchMe()
        }, []
    )

    const login = (username: string, password: string) => {
        if (username === "" || password === "")
            toast("Please enter Username and Password")
        else
            axios.get("/api/users/login", {auth: {username, password}})
                .then(response => response.data)
                .then(setMe)
                .catch(() => toast("Username or password is incorrect."))
    }

    const fetchMe = () => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setMe)
    }

    const logout = () => {
        axios.get("/api/users/logout")
            .then(response => response.data)
            .then(() => setMe("anonymousUser"))
    }

    const listUserItems = () => {
        axios.get("/api/sgc")
            .then(response => response.data)
            .then(data => setUserItems(data))
    }

    const addItem = (explanation: string, title: string, url: string) => {
        const userItem: UserItemType = {explanation: explanation, title: title, url: url}
        return axios.post("/api/sgc", userItem)
    }

    return {nasaApiData, filteredNasData, me, login, logout, addItem, userItems}
}
