
import { Select, Space } from 'antd';
import { useOrganizations } from '../../service/org';
import _ from 'lodash';
import { useUserContext } from '../../hooks/userHook';
import { LOCAL_CURRENT_ORG } from '../../utils/constants';
import { useEffect } from 'react';
import { useGoTo } from '../../hooks';
import { ROUTE_KEY } from '../../routes/menus';
import { currentOrg } from '../../utils';


/**
* Store selector
*/

const OrgSelect = ({}) => {
    const {data,refetch} = useOrganizations(1,10,true)
    const {setStore} = useUserContext()
    const {go} = useGoTo()
    const onSearchHandler = _.debounce((name: string) =>{
        refetch(
            {name}
        )
    },500)
    useEffect(()=>{
        if(currentOrg()?.value){
            setStore({
                currentOrg:currentOrg().value
            })
        }else{
            go(ROUTE_KEY.NO_ORG)
        }
    },[])
    const onChangeHandler = (val:{value:string,label:string}) =>{
        setStore({currentOrg: val.value})
        localStorage.setItem(LOCAL_CURRENT_ORG,JSON.stringify(val))
    }
    return (
        <Space>
            Select Store:
        <Select style={{width:200}}
            placeholder ="Please select a store"
            showSearch
            defaultValue={currentOrg()}
            onSearch={onSearchHandler}
            onChange={onChangeHandler}
            filterOption={false}
            labelInValue
        >
            {data?.map(item=>(
                <Select.Option
                    key={item.id}
                    value={item.id}
                >
                    {item.name}
                </Select.Option>
            ))}
        </Select>
        </Space>
    );
};

export default OrgSelect;
