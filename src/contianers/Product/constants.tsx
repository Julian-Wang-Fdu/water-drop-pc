import { ProColumns } from "@ant-design/pro-components";
import { IProduct } from "../../utils/types";
import { Image,Popconfirm, Space } from "antd";

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusChangeHandler: (id: string, status: string) => void;
}

const PRODUCT_STATUS = {
  LIST: 'LIST',
  UN_LIST: 'UN_LIST',
};

export const getColumns: (props: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: 'Cover',
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Product must have a name',
        },
      ],
    },
  },
  {
    title: 'Original Price',
    search: false,
    dataIndex: 'originalPrice',
    width: 150,
  },
  {
    title: 'Preferential Price',
    search: false,
    dataIndex: 'preferentialPrice',
    width: 150,
  },
  {
    title: 'Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: 'Current Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'curStock',
  },
  {
    title: 'Personal purchase restriction',
    search: false,
    width: 180,
    align: 'center',
    dataIndex: 'limitBuyNumber',
  },
  {
    title: 'Total sales',
    search: false,
    width: 50,
    align: 'center',
    dataIndex: 'buyNumber',
  },
  {
    title: 'Operation',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (text, entity) => (
      <Space>
        {entity.status === PRODUCT_STATUS.UN_LIST
          ? (
            <a
              key="list"
              style={{
                color: 'blue',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
            >
              Publish
            </a>
          )
          : (
            <a
              key="unList"
              style={{
                color: 'green',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
            >
             Hit the shelf
            </a>
          )}
        <a
          key="edit"
          onClick={() => onEditHandler(entity.id)}
        >
          Edit
        </a>
        <a
          key="card"
          onClick={() => onCardHandler(entity.id)}
        >
          Bind card
        </a>
        <Popconfirm
          title="Remind"
          description="Confirm delete?"
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="delete"
            type="link"
            style={{
              color: 'red',
            }}
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
