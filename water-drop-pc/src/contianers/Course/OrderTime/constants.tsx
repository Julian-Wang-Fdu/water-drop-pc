import { ProColumns } from "@ant-design/pro-components"
import { Popconfirm, Space } from "antd"

type TWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface IDay{
    key: TWeek,
    label: string
}

export const DAYS: IDay[] = [
    {
        key: 'monday',
        label: 'Monday'
    },
    {
        key: 'tuesday',
        label: 'Tuesday'
    },
    {
        key: 'wednesday',
        label: 'Wednesday'
    },
    {
        key: 'thursday',
        label: 'Thursday'
    },
    {
        key: 'friday',
        label: 'Friday'
    },
    {
        key: 'saturday',
        label: 'Saturday'
    },
    {
        key: 'sunday',
        label: 'Sunday'
    },
]

export interface IOrderTime{
    startTime: string
    endTime: string
    key: number
}

export const isWorkDay = (day: string) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getColumns = (onDeleteHandler:Function):ProColumns[]=>[
    {
        title: 'Serial number',
        editable: false,
        dataIndex: 'key',
        width: 50,
        align: 'center'
    },
    {
        title: 'Start time',
        dataIndex: 'startTime',
        valueType: 'time',
        width: 160,
        align: 'center'
    },
    {
        title: 'End time',
        dataIndex: 'endTime',
        valueType: 'time',
        width: 160,
        align: 'center'
    },
    {
        title: 'Operation',
        valueType: 'option',
        width: 150,
        align: 'center',
        render:(text,record,_,action)=>(
            <Space>
                <a key="edit"
                    onClick={()=>{
                        action?.startEditable(record.key || '')
                    }}
                >
                    Edit
                </a>
                <Popconfirm
                    title="Remind"
                    description="Confirm delete?"
                    onConfirm={()=>onDeleteHandler(record.key)}
                >
                    <a key="delete">
                    Delete
                </a>
                </Popconfirm>
                
            </Space>
        )
    }
]

export interface IWeekCourse{
    week: TWeek
    orderTime: IOrderTime[]
}

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
  const keys = orderTime?.map((item) => item.key) || [];

  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};