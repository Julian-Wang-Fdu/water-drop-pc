
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ICourse } from '../../utils/types';
import { getColumns } from './constants';
import { useCourses } from '../../service/course';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import EditCourse from './EditCourse';
import OrderTime from './OrderTime';

/**
*
*/
const Course = () => {
    const ref = useRef<ActionType>()
    const [curId,setCurId] = useState('')
    const {data,refetch} = useCourses()
    const [showInfo,setShowInfo] = useState(false)
    const [showOrderTime,setShowOrderTime] = useState(false)
    const onClickAddHandler = (id?:string)=>{
        if(id){
            setCurId(id)
        }else{
            setCurId('')
        }
        setShowInfo(true)
    }
    const closeAndRefetchHandler=(isReload?:boolean)=>{
        setShowInfo(false)
        if(isReload){
            ref.current?.reload()
        }
    }
    const onOrderTimeHandler = (id:string)=>{
        setCurId(id)
        setShowOrderTime(true)
    }
    return (
        <PageContainer header={{title: 'Available courses under current store'}}>
            <ProTable<ICourse> columns={getColumns({
                onEditHandler: onClickAddHandler,
                onOrderTimeHandler
            }   
            )}
                rowKey='id'
                actionRef={ref}
                dataSource={data}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE
                }}
                toolBarRender={()=>[
                    <Button key='add' type='primary' icon={<PlusOutlined/>} onClick={()=>onClickAddHandler()}>
                       Add new course
                    </Button>
                ]

                }
                request={async(
                    params: {
                        name?: string,
                        pageSize?:number;
                        current?: number
                    },
                )=>{
                    const msg = await refetch(params)
                    return{
                        data: msg.data,
                        success: msg.success,
                        total: msg.page?.total || 0
                    }
                }}
                />
                <EditCourse id={curId} open={showInfo} onClose={closeAndRefetchHandler}/>
                {showOrderTime&&<OrderTime id={curId} onClose={()=>setShowOrderTime(false)}/>}
        </PageContainer>
    );
};

export default Course;
