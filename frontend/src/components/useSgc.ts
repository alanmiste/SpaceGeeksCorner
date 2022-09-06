import {useEffect, useState} from "react";
import axios from "axios";
import {NasaResponseType} from "../type/NasaResponseType";
import {toast} from "react-toastify";
import {SavedUserItemType, UserItemToSave, UserItemType} from "../type/UserItemType";
import {NewUserType} from "../type/NewUserType";

export default function useSgc() {

    const [nasaApiData, setNasaApiData] = useState<NasaResponseType[]>([]);
    const [me, setMe] = useState<string>("anonymousUser");
    const [userItems, setUserItems] = useState<SavedUserItemType[]>([]);
    const filteredNasaData: UserItemType[] = nasaApiData.filter(element => element.media_type === "image")
        .map(item => {
            return {explanation: item.explanation, title: item.title, url: item.url}
        })
        .filter(nasaItem => !userItems.find(userItem => userItem.url === nasaItem.url));

    const [usernames, setUsernames] = useState<string[]>([]);


    const getDataFromNasaApi = () => {
        axios.get("/api/sgc/nasaapi")
            .then(response => {
                return response.data
            })
            .then(data => setNasaApiData(data))
            .catch(error => console.error(error))
    }

    useEffect(
        () => {
            getDataFromNasaApi()
            listUserItems()
            fetchMe()
            fetchUsernames()
        }, []
    )



    const login = (username: string, password: string) => {
        if (username === "" || password === "")
            toast.warn("Username and Password shouldn't be empty!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        else
            axios.get("/api/users/login", {auth: {username, password}})
                .then(response => response.data)
                .then(setMe)
                .catch(() => toast.error("Username or password is incorrect.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                }))
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

    const addItem = (username: string, explanation: string, title: string, url: string) => {
        const userItem: UserItemToSave = {username: username, explanation: explanation, title: title, url: url}
        toast.success('Added to favorites successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        return axios.post("/api/sgc", userItem)
            .then((savedUserItem) => {
                setUserItems([...userItems, savedUserItem.data])
                return savedUserItem
            })
    }

    const deleteItem = (url: string) => {
        const selectedItem = userItems.find(i => i.url === url)
        const id = selectedItem?.id
        return axios.delete(`/api/sgc/${id}`)
            .then(listUserItems)
            .catch(error => toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }))
    }

    const fetchUsernames = () => {
        axios.get("/api/users/listusers")
            .then(response => response.data)
            .then(setUsernames)
    }

    const register = (newUser: NewUserType) => {
        axios.post("/api/users", newUser)
            .then(response => response)
    }

    return {filteredNasaData, me, login, logout, addItem, userItems, deleteItem, usernames, register}
}
