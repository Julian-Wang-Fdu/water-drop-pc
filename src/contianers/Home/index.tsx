import { PageContainer } from "@ant-design/pro-components"
import { useUserContext } from "../../hooks/userHook"
import { useOrganization } from "../../service/org"
import {
  Button, Calendar, Card, Col, DatePicker, Row, message,
} from 'antd';
import { useState } from "react";
import { DAY_FORMAT } from "../../utils/constants";
import dayjs, { Dayjs } from "dayjs";
import Schedule from "./components/Schedule";
import { useAutoCreateSchedule } from "../../service/dashboard";
const { RangePicker } = DatePicker;

const Home = () =>{
    const [range, setRange] = useState<[string, string]>(['', '']);
    const {store} = useUserContext()
    const {data: org} = useOrganization(store.currentOrg || '')
    const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
    const [run, loading] = useAutoCreateSchedule();
    if(!org){
        return null
    }
    const startScheduleHandler = () => {
    if (!range[0]) {
      message.error('Please choose time zone!');
      return;
    }
    console.log('range',range)
    run(...range);
  };

  const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
    if (!days || !days[0] || !days[1]) {
      return;
    }
    setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
  };
    return (
        <div>
            <PageContainer
                content={org.address}
                header={
                    {title: org.name}
                }
            >
                <Row gutter={20}>
                <Col flex='auto'>
                <Card
                title={`Courses on ${day}`}
                 extra={
                (
                <span>
                    <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                    <Button
                    loading={loading}
                    type="link"
                    onClick={startScheduleHandler}
                    >
                    Start course scheduling
                    </Button>
                 </span>
                )
            }>
                <Schedule day={day} />
                </Card>
                </Col>
                <Col flex='300px'>
                <Calendar fullscreen={false}
                onChange={(d) => setDay(d.format(DAY_FORMAT))}
                />
                </Col>
                </Row>
            </PageContainer>
        </div>
    )
}

export default Home