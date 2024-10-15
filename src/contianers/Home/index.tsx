import { useUserContext } from "../../hooks/userHook"


const Home = () =>{
    const {store} = useUserContext()
    return (
        <div style={{height:'400px', backgroundColor:'red' }}>{store.account}</div>
    )
}

export default Home