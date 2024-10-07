import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($account: String!,$password:String!){
  login(account:$account,
    password:$password
){
    code,
    message
  }}
`;