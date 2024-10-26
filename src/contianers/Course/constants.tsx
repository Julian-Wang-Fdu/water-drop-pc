import { ProColumns } from "@ant-design/pro-components";
import { ICourse } from "../../utils/types";
import { Button, Space } from "antd";

interface IProps {
  onEditHandler: (id: string) => void
}

export const getColumns:({onEditHandler}:IProps)=>ProColumns<ICourse,'text'>[] =({
  onEditHandler
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
    width: 75,
    search: false,
  },
  {
    title: 'Operation',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    render: (text,entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={()=>onEditHandler(entity.id)}
        >
          Edit
          {text}
        </Button>
        </Space>
    ),
  },
]