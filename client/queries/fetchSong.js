import gql from 'graphql-tag';

export default  gql`
query myQuery($id :ID!){
        song(id:$id){
          id
          title
          lyrics{
            id
            content
            likes
          }
        }
}
`;