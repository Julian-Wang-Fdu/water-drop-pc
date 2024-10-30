import { ProColumns } from "@ant-design/pro-components";
import { ICourse } from "../../utils/types";
import { Button, Space } from "antd";

interface IProps {
  onEditHandler: (id: string) => void
  onOrderTimeHandler: (id: string)=>void
}

export const getColumns:({onEditHandler,onOrderTimeHandler}:IProps)=>ProColumns<ICourse,'text'>[] =({
  onEditHandler,
  onOrderTimeHandler
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
    width:200,
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
        </Space>
    ],
  },
]