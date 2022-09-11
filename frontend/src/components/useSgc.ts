import {useEffect, useState} from "react";
import axios from "axios";
import {NasaResponseType} from "../type/NasaResponseType";
import {toast} from "react-toastify";
import {SavedUserItemType, UserItemToSave, UserItemType} from "../type/UserItemType";
import {NewUserType} from "../type/NewUserType";
import {MockupResponse} from "../type/MockupResponse";

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

    const initialMockup: MockupResponse = {
        "code": 200,
        "result": {
            "task_key": "gt-404733720",
            "status": "completed",
            "mockups": [
                {
                    "placement": "front",
                    "variant_ids": [
                        4017,
                        4018,
                        4019
                    ],
                    "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg",
                    "extra": [
                        {
                            "title": "Front",
                            "option": "Front",
                            "option_group": "Flat",
                            "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/9f32b8fe690974e896476b62b3b7be49/unisex-staple-t-shirt-black-front-631a233582e19.jpg"
                        }
                    ]
                },
                {
                    "placement": "back",
                    "variant_ids": [
                        4017,
                        4018,
                        4019
                    ],
                    "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/76e7f4884e6a389b638113ca7536f34a/unisex-staple-t-shirt-black-back-631a2335831f3.jpg",
                    "extra": [
                        {
                            "title": "Back",
                            "option": "Back",
                            "option_group": "Flat",
                            "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/c42f423120d1ec0f1c14542e403fe387/unisex-staple-t-shirt-black-back-631a23358347e.jpg"
                        }
                    ]
                },
                {
                    "placement": "front",
                    "variant_ids": [
                        4012,
                        4013,
                        4014
                    ],
                    "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/442196c9c2fb2b22b31e5c46cb442b8f/unisex-staple-t-shirt-white-front-631a2335836c3.jpg",
                    "extra": [
                        {
                            "title": "Front",
                            "option": "Front",
                            "option_group": "Flat",
                            "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/04278d0e21cb89fd544653766c2fab6d/unisex-staple-t-shirt-white-front-631a233583b71.jpg"
                        }
                    ]
                },
                {
                    "placement": "back",
                    "variant_ids": [
                        4012,
                        4013,
                        4014
                    ],
                    "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/f47f911f520aab0bb32ee449ec524f69/unisex-staple-t-shirt-white-back-631a233584075.jpg",
                    "extra": [
                        {
                            "title": "Back",
                            "option": "Back",
                            "option_group": "Flat",
                            "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/24b4e874663cc97828ddd3f8d1c00564/unisex-staple-t-shirt-white-back-631a2335844ad.jpg"
                        }
                    ]
                }
            ],
            "printfiles": [
                {
                    "variant_ids": [
                        4012,
                        4013,
                        4014
                    ],
                    "placement": "front",
                    "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/a3ff31152ccd1e6294153d6cef952353/printfile_front.png"
                },
                {
                    "variant_ids": [
                        4012,
                        4013,
                        4014
                    ],
                    "placement": "back",
                    "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/fdb375b3407096c93f0aebef86a6b26c/printfile_back.png"
                }
            ]
        },
        "extra": []
    };
    const [mockup, setMockup] = useState<MockupResponse>(initialMockup);


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
            .then(response => setUsernames([...usernames, response.data]))
            .then(() => toast.success('Congratulations 🚀' + newUser.username + ' You Signed up successfully! ✅', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            }))
    }

    const makeMockup = (imageUrl: string) => {
        axios.post("api/sgc/make-mockups", imageUrl)
            .then(response => response.data)
            .then(setMockup)
    }

    return {
        filteredNasaData,
        me,
        login,
        logout,
        addItem,
        userItems,
        deleteItem,
        usernames,
        register,
        mockup,
        makeMockup
    }
}
