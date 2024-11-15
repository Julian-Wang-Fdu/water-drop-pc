import { Drawer } from "antd";
import { useCards, useDeleteCard, useEditCardInfo } from "../../../service/card";
import { ICard } from "../../../utils/types";
import { EditableProTable } from "@ant-design/pro-components";
import { getColumns } from "./constants";

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 消费卡
*/
const ConsumeCard = ({
  onClose,
  id,
}: IProps) => {
  const { data, loading, refetch } = useCards(id);
  const [del, delLoading] = useDeleteCard();
  const [edit, editLoading] = useEditCardInfo();

  const onDeleteHandler = (key: string) => {
    del(key, refetch);
  };
  const onSaveHandler = (d: ICard) => {
    edit(d.id, id, {
      name: d.name,
      type: d.type,
      time: d.time,
      validityDay: d.validityDay,
    }, refetch);
  };
  return (
    <Drawer
      title="Related consume card"
      width="90vw"
      open
      onClose={() => onClose()}
    >
      <EditableProTable<ICard>
        headerTitle="Manage the consume card of this course"
        rowKey="id"
        loading={loading || editLoading || delLoading}
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validityDay: 0,
          }),
        }}
        value={data}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            onSaveHandler(d);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as string);
          },
        }}
      />
    </Drawer>
  );
};

export default ConsumeCard;