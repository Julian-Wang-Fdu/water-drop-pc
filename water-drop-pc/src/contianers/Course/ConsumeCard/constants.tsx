import { ProColumns } from "@ant-design/pro-components";
import { Popconfirm, Space } from "antd";
import { CARD_TYPE } from "../../../utils/constants";

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'Serial number',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Valid days',
    dataIndex: 'validityDay',
    valueType: 'digit',
    width: 110,
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    valueType: 'select',
    width: 120,
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: 'Count card',
      },
      {
        value: CARD_TYPE.DURATION,
        label: 'Time card',
      },
    ],
  },
  {
    title: 'Count',
    dataIndex: 'time',
    valueType: 'digit',
    width: 100,
    align: 'center',
  },
  {
    title: 'Operation',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.id || '');
          }}
        >
          Edit
        </a>
        <Popconfirm
          title="Remind"
          description="Confirm delete?"
          onConfirm={() => onDeleteHandler(record.id)}
        >
          <a
            key="delete"
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];