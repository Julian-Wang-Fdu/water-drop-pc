import { gql } from "@apollo/client";


export const COMMIT_COURSE = gql`
  mutation commitCourseInfo($params: CourseInput!, $id: String) {
    commitCourseInfo(params: $params, id: $id) {
      code
      message
    }
  }
`;
