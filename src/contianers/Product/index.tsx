import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { useDeleteProduct, useEditProductInfo, useProducts } from "../../service/product";
import { IProduct } from "../../utils/types";
import { getColumns } from "./constants";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditProduct from "./EditProduct";
import ConsumeCard from "./ConsumeCard";

/**
* 当前门店下开设的课程
*/
const Product = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const { refetch, loading } = useProducts();
  const [delHandler, delLoading] = useDeleteProduct();
  const [edit, editLoading] = useEditProductInfo();
  const [showInfo, setShowInfo] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  const onDeleteHandler = (id: string) => {
    delHandler(id, () => actionRef.current?.reload());
  };

  const onStatusChangeHandler = (id: string, status: string) => {
    edit(id, {
      status,
    }, () => actionRef.current?.reload());
  };

  return (
    <PageContainer header={{ title: 'Products in current store' }}>
      <ProTable<IProduct>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        loading={delLoading || editLoading || loading}
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onCardHandler,
          onDeleteHandler,
          onStatusChangeHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            Create new product
          </Button>,
        ]}
        request={refetch}
      />
      {showInfo && <EditProduct id={curId} onClose={closeAndRefetchHandler} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />} 
    </PageContainer>
  );
};

export default Product;



