import { Avatar, Descriptions, Result, Spin, Steps, Tooltip } from "antd";
import { SCHEDULE_STATUS } from "../../../../utils/constants";
import schedules from "./test.data";

interface IProps {
  day: string
}

/**
* 某一天的课程表
*/
const Schedule = ({
  day,
}: IProps) => {
  //const { data, loading } = useSchedules(day);
  const data = schedules
  console.log(day)

  if (data?.length === 0) {
    return (
      <Result
        status="warning"
        title="There are no course scheduling"
      />
    );
  }

  return (
    
      <Steps
        direction="vertical"
        items={
          data?.map((item) => ({
            title: `${item.startTime}-${item.endTime} ${item.course.name}`,
            description: (
              <Descriptions bordered size="small">
                <Descriptions.Item
                  span={3}
                  label={`Student(${item.scheduleRecords.length})`}
                  labelStyle={{
                    width: 80,
                  }}
                >
                  {item.scheduleRecords.length === 0 && 'No student reservation'}
                  <Avatar.Group
                    maxCount={10}
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {
                    item.scheduleRecords.map((sr) => (
                      <Tooltip
                        key={sr.id}
                        title={sr.student.name + (sr.status === SCHEDULE_STATUS.CANCEL ? '：already canceled' : '')}
                      >
                        <Avatar
                          key={sr.student.id}
                          src={sr.student.avatar}
                        />
                      </Tooltip>
                    ))
                  }
                  </Avatar.Group>
                </Descriptions.Item>
              </Descriptions>
            ),
          }))
        }
      />
  );
};

export default Schedule;