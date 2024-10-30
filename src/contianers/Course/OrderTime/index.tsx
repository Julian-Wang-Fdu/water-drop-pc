import { Button, Col, Drawer, Row, Space, Tabs} from 'antd';
import { DAYS, getColumns, getMaxKey, IDay, IOrderTime, isWorkDay, IWeekCourse } from './constants';
import { useMemo, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import { useCourseInfo, useEditInfo } from '../../../service/course';
import _ from 'lodash';

interface IProps {
  id: string;
  onClose: (isReload?:boolean) => void;
}
/**
*
*/
const OrderTime = ({
    onClose,
    id,
}:IProps) => {
    const [currentDay,setCurrentDay] = useState<IDay>(DAYS[0])
    const onTabChangeHandler = (key:string)=>{
        const current = DAYS.find(item=> item.key===key) as IDay
        setCurrentDay(current)
    }
    const {data,loading,refetch} = useCourseInfo(id)
    const [edit,editLoading] = useEditInfo()
    const orderTime = useMemo(() => {
        return (data?.reducibleTime || []).find((item) => 
            item.week === currentDay.key)?.orderTime as IOrderTime[] || [];
    }, [data,currentDay]);

    const onSaveHandler = (ot:IOrderTime[])=>{
        const rt = [...(data?.reducibleTime || [])]
        const index = rt.findIndex(item=>item.week===currentDay.key)
        if(index>-1){
            rt[index]={
                week: currentDay.key,
                orderTime: ot
            }
        }else{
            rt.push({
                week: currentDay.key,
                orderTime: ot
            })
        }
        edit(id,{reducibleTime:rt},()=>refetch())
    }
    const onDeleteHandler=(key:number)=>{
        const newData = orderTime.filter((item)=>item.key!==key)
        onSaveHandler(newData)
    }

    const allWeekSyncHandler=()=>{
        const rt:IWeekCourse[] = []
        DAYS.forEach((item)=>{
            rt.push({
                week: item.key,
                orderTime
            })
        })
        edit(id,{
            reducibleTime: rt
        },()=>refetch())
    }

    const allWorkDaySyncHandler=()=>{
        const rt:IWeekCourse[] = []
        DAYS.forEach((item)=>{
            if(isWorkDay(item.key)){
                rt.push({
                    week: item.key,
                    orderTime
                })
            }
        })
        edit(id,{
            reducibleTime: rt
        },()=>refetch())
    }

    return (
    <Drawer open onClose={()=>onClose()}
        title={'Edit attendance time'}
        width={720}
        forceRender
    >
        <Tabs items={DAYS} type='card'
            onChange={onTabChangeHandler}
        />
       <EditableProTable<IOrderTime> rowKey= "key"
        value={orderTime}
        headerTitle={(<Space>
            Select
            <span style={{color:'green'}}>{currentDay.label}</span>
            class
        </Space>)}
        loading={loading || editLoading}
        columns={getColumns(onDeleteHandler)}
        recordCreatorProps={{
            record: (index: number) =>({
                key: getMaxKey(orderTime),
                startTime: '12:00:00',
                endTime: '12:30:00'
            })
        }}
        editable={{
            onSave: async (rowKey, d) => {
            let newData = [];
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) => (item.key === rowKey ? _.omit(d, 'index') : { ...item }));
            }
            newData = [...orderTime, _.omit(d, 'index')];
            onSaveHandler(newData);
          },
        }}
       />
       <Row gutter={20} style={{padding:20}}>
        <Col span={12}>
            <Button
                icon={<RedoOutlined/>}
                style={{width:'100%'}}
                type='primary'
                onClick={allWorkDaySyncHandler}
            >Synchronize to all workday</Button>
        </Col>
        <Col span={12}>
            <Button
                icon = {<ChromeOutlined/>}
                style={{width:'100%'}}
                type='primary'
                danger
                onClick={allWeekSyncHandler}
            >Synchronize to every day</Button>
        </Col>
       </Row>
    </Drawer>);
};

export default OrderTime;
