import { useMutation } from "@apollo/client";
import { COMMIT_COURSE } from "../graphql/course";
import { message } from "antd";


export const useEditInfo =():[handleEdit:Function,loading:boolean]=>{
  const [edit,{loading}] = useMutation(COMMIT_COURSE);
  const handleEdit=async(id:number,params:TBaseCourse,callback:(isReload:boolean)=>void)=>{
    const res = await edit({
      variables:{
        id,
        params
      }
    })
    if(res.data.commitCourseInfo.code ===200){
      message.success(res.data.commitCourseInfo.message)
      callback(true)
      return
    }
    message.error(res.data.commitCourseInfo.message)
  }
  return [handleEdit,loading]
}
