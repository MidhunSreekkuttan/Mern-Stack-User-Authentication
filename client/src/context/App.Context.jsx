import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const BackendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState(false)

    // const isAlreadyLogin = async () => {

    //     try {

    //         const response = await

    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    const getUserData = async () => {

        try {

            const { data } = await axios.get(BackendUrl + '/api/user/features/getUser')

            data.success ? setUserData(data.userData) : toast.error(data.message)

        } catch (error) {

            toast.error(error.message)

        }
    }

    const value = {

        BackendUrl,
        isLogin, setIsLogin,
        userData, setUserData,
        getUserData,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}