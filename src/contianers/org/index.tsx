import { useState } from 'react';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import EditOrg from './components/EditOrg';
import Popconfirm from 'antd/lib/popconfirm';
import { useDeleteOrg, useOrganizations } from '../../service/org';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

/**
*
*/
const Org = () => {
    const {
        loading, data, page, refetch,
        } = useOrganizations();
        const [delHandler, delLoading] = useDeleteOrg();

        const [showEdit, setShowEdit] = useState(false);
        const [curId, setCurId] = useState('');

        const editInfoHandler = (id: string) => {
            setCurId(id);
            setShowEdit(true);
        };

        const delInfoHandler = async (id: string) => {
            delHandler(id, refetch);
        };

        const addInfoHandler = () => {
            setCurId('');
            setShowEdit(true);
        };

        const onCloseHandler = () => {
            setShowEdit(false);
            refetch();
        };

        const onPageChangeHandler = (pageNum: number, pageSize: number) => {
            refetch({
            page: {
                pageNum,
                pageSize,
            },
            });
        };

        const dataSource = data?.map((item) => ({
            ...item,
            key: item.id,
            subTitle: <div>{item.tags?.split(',').map((tag) => (<Tag key={tag} color="#5BD8A6">{tag}</Tag>))}</div>,
            actions: [
            <Button type="link" onClick={() => editInfoHandler(item.id)}>Edit</Button>,
            <Popconfirm
                title="Warning"
                okButtonProps={{
                loading: delLoading,
                }}
                description={`Do you want remove ${item.name} from list？`}
                onConfirm={() => delInfoHandler(item.id)}
            >
                <Button type="link">Delete</Button>
            </Popconfirm>,
            ],
            content: item.address,
        }));    
    return (
    <div>
      <PageContainer
        loading={loading}
        header={{
          title: 'Store Management',
        }}
        extra={[
          <Button key="1" type="primary" onClick={addInfoHandler}>Create a Store</Button>,
        ]}
      >
        <ProList<any>
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            showSizeChanger: false,
            total: page?.total,
            onChange: onPageChangeHandler,
          }}
          grid={{ gutter: 10, column: 2 }}
          showActions="always"
          rowSelection={false}
          metas={{
            title: {
              dataIndex: 'name',
            },
            subTitle: {},
            type: {},
            avatar: {
              dataIndex: 'logo',
            },
            content: {
              dataIndex: 'address',
            },
            actions: {
              cardActionProps: 'extra',
            },
          }}
          dataSource={dataSource}
        />
        {showEdit && (
        <EditOrg
          id={curId}
          onClose={onCloseHandler}
        />
        )}
      </PageContainer>
    </div>
  );
};


export default Org;



