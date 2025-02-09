import { Button, Result } from 'antd';

/**
* 404
*/
const Page404  = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default Page404;
