import { ProColumns } from "@ant-design/pro-components";
import { ICourse } from "../../utils/types";
import { Button, Space } from "antd";

interface IProps {
  onEditHandler: (id: string) => void
  onOrderTimeHandler: (id: string)=>void
  onCardHandler:(id:string)=>void
}

export const getColumns:({onEditHandler,onOrderTimeHandler,onCardHandler}:IProps)=>ProColumns<ICourse,'text'>[] =({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler
})=> [
    {
    title: 'Course title',
    dataIndex: 'name',
    ellipsis: true,
    copyable:true
  },
  {
    title: 'Maximum students',
    dataIndex: 'limitNumber',
    width: 175,
    search: false,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    width: 175,
    search: false,
  },
  {
    title: 'Operation',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width:300,
    render: (text,entity) => [
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={()=>onEditHandler(entity.id)}
        >
          Edit
          {text}
        </Button>,
        <Button
          key="orderTime"
          type="link"
          onClick={()=>onOrderTimeHandler(entity.id)}
        >
          Available Time
        </Button>,
        <Button
          key="card"
          type="link"
          onClick={()=>onCardHandler(entity.id)}
        >
          Cards
        </Button>
        </Space>
    ],
  },
]