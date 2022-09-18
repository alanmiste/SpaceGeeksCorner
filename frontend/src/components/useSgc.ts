import {useEffect, useState} from "react";
import axios from "axios";
import {NasaResponseType} from "../type/NasaResponseType";
import {toast} from "react-toastify";
import {SavedUserItemType, UserItemToSave, UserItemType} from "../type/UserItemType";
import {NewUserType} from "../type/NewUserType";
import {MockupResponse} from "../type/MockupResponse";
import {TshirtsType} from "../type/TshirtsType";
import {TshirtToSave, TshirtWithUsername} from "../type/TshirtToSave";
import {SavedMockupResponse} from "../type/SavedMockupResponse";
import {DeleteMockup} from "../type/DeleteMockup";

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
                    "mockup_url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtBF.jpeg",
                    "extra": [
                        {
                            "title": "Front",
                            "option": "Front",
                            "option_group": "Flat",
                            "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtBF1.jpeg"
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
                    "mockup_url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtBB.jpeg",
                    "extra": [
                        {
                            "title": "Back",
                            "option": "Back",
                            "option_group": "Flat",
                            "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtBB1.jpeg"
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
                    "mockup_url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtWF.jpeg",
                    "extra": [
                        {
                            "title": "Front",
                            "option": "Front",
                            "option_group": "Flat",
                            "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtWF1.jpeg"
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
                    "mockup_url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtWB.jpeg",
                    "extra": [
                        {
                            "title": "Back",
                            "option": "Back",
                            "option_group": "Flat",
                            "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtWB1.jpeg"
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
                    "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtPrintfileFront.png"
                },
                {
                    "variant_ids": [
                        4012,
                        4013,
                        4014
                    ],
                    "placement": "back",
                    "url": "https://raw.githubusercontent.com/alanmiste/plants/master/SgcDefaultTshirtPrintfileBack.png"
                }
            ]
        },
        "extra": []
    };
    const [mockup, setMockup] = useState<MockupResponse>(initialMockup);

    const mockupList: TshirtsType[] = mockup.result.mockups.map((item, key) => {
        return {id: key, mockupUrl: item.mockup_url, placement: item.placement}
    });
    const [tshirtNumber, setTshirtNumber] = useState<number>(0);

    const [savedMockupList, setSavedMockupList] = useState<SavedMockupResponse>({username: me, tshirtList: []});

    const successToast = (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const warnToast = (message: string) => {
        toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    const errorToast = (message: string) => {
        toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

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
            warnToast("Username and Password shouldn't be empty!")
        else
            axios.get("/api/users/login", {auth: {username, password}})
                .then(response => response.data)
                .then(setMe)
                .catch(() => errorToast("Username or password is incorrect."))
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

        return axios.post("/api/sgc", userItem)
            .then((savedUserItem) => {
                setUserItems([...userItems, savedUserItem.data])
                return savedUserItem
            })
            .catch(error => {
                errorToast(error.message)
                return error
            })
            .finally(() => successToast('Added to favorites successfully!'))
    }

    const deleteItem = (url: string) => {
        const selectedItem = userItems.find(i => i.url === url)
        const id = selectedItem?.id
        return axios.delete(`/api/sgc/${id}`)
            .then(listUserItems)
            .catch(error => errorToast(error.message))
    }

    const fetchUsernames = () => {
        axios.get("/api/users/listusers")
            .then(response => response.data)
            .then(setUsernames)
    }

    const register = (newUser: NewUserType) => {
        axios.post("/api/users", newUser)
            .then(response => setUsernames([...usernames, response.data]))
            .then(() => successToast('Congratulations 🚀' + newUser.username + ' You Signed up successfully! ✅'))
    }

    const makeMockup = (imageUrl: string) => {
        const imageOgject = {"image_url": imageUrl}
        axios.post("api/sgc/make-mockups", imageOgject)
            .then(response => response.data)
            .then(setMockup)
            .catch(() => toast.warn('Server is busy ⏳, please try again in 30 second!', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            }))
    }

    const saveMockup = (username: string, tshirtToSave: TshirtToSave) => {
        const tshirtWithUsername: TshirtWithUsername = {username: username, tshirtToSave: tshirtToSave}
        axios.post("api/sgc/save-mockup", tshirtWithUsername)
            .then(response => response.data)
            .then(listMockup)
            .then(() => setMockupListLength(mockupListLength + 1))
            .catch(error => errorToast(error.message))
    }

    const [mockupListLength, setMockupListLength] = useState<number>(savedMockupList.tshirtList.length)

    const listMockup = () => {
        axios.post("api/sgc/list-mockup", {username: me})
            .then(response => response.data)
            .then(setSavedMockupList)
            .catch(error => errorToast(error.message))
    }

    const deleteMockup = (index: number) => {
        const deleteMockup1: DeleteMockup = {username: me, index: index}
        axios.put("api/sgc/list-mockup", deleteMockup1)
            .then(listMockup)
            .then(() => setMockupListLength(savedMockupList.tshirtList.length - 1))
            .then(() => successToast('One Item deleted successfully! ❎'))
            .catch(error => errorToast(error.message))
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
        makeMockup,
        mockupList,
        tshirtNumber,
        setTshirtNumber,
        saveMockup,
        savedMockupList,
        listMockup,
        mockupListLength,
        deleteMockup,
        setMockupListLength
    }
}
