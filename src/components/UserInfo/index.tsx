
import { Spin } from "antd";
import { connect, useGetUser } from "../../hooks/userHook";
import { IPropChild } from "../../utils/types";


const UserInfo = ({ children }: IPropChild) =>{
    const {loading}=useGetUser()
    return (
      <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>
        {children}
      </div>
      </Spin>
    )
}

export default connect(UserInfo)