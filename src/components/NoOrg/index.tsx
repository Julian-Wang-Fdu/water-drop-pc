import { Button, Result } from 'antd';
import { useUserContext } from '../../hooks/userHook';
import { useGoTo } from '../../hooks';
import { useEffect } from 'react';

/**
* remind select store
*/
const NoOrg  = () => {
    const {store} = useUserContext()
    const {go} = useGoTo()
    useEffect(()=>{
        if(store.currentOrg){
            go()
        }
    },[store.currentOrg])
    return (<Result
    status="404"
    title="Please select a store"
    subTitle="All manage behaviors are based on the store you selected."
    extra={<Button type="primary">Back Home</Button>}
  />
)
}
  

export default NoOrg;