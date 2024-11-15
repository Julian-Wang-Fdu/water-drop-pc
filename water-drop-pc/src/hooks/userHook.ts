import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/user"
import { connectFactory, useAppContext } from "../utils/contextFactory"
import { IUser } from "../utils/types"
import { useLocation, useNavigate } from "react-router-dom"

const KEY = 'userInfo'
const DEFAULT_VALUE = {

}

export const useUserContext = () => useAppContext<IUser>(KEY)

export const connect = connectFactory(KEY, DEFAULT_VALUE)

//go back to login page if cannot find user information
export const useGetUser=()=>{
    const {setStore} = useUserContext()
    const location = useLocation()
    const nav = useNavigate()
    const { loading,refetch } = useQuery<{getUserInfo:IUser}>(GET_USER,{
        notifyOnNetworkStatusChange: true,
        onCompleted: (data)=>{
            if(data.getUserInfo){
                const { id ,account,name,desc,avatar} = data.getUserInfo
                setStore({id,account,name,desc,avatar,refetchHandler:refetch})
                // if(location.pathname.startsWith('/login')){
                //     nav(`/`)
                // }
                return
            }
            setStore({refetchHandler:refetch})
            if(window.location.pathname !== '/login'){
                nav(`/login?orgUrl=${location.pathname}`) 
            }
        },
        onError: ()=>{
            if(window.location.pathname !== '/login'){
                //if login failed,refresh the user info
                setStore({refetchHandler:refetch})
                nav(`/login?orgUrl=${location.pathname}`)
            }
            
        }
    })
    return {loading,refetch}
}