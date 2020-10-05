import gql from 'graphql-tag'

export const getWorkorderWithUsersAndComments = gql`
  query getWorkorder($id: Int!) {
    getWorkorderWithUsersAndComments(WorkorderId: $id) {
      id
      title
      description
      type
      status
      priority
      reporterId
      listPosition
      createdAt
      updatedAt
      userIds
      comments {
        id
        body
        updatedAt
        WorkorderId
        userId
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`

export const getProjectWorkorders = gql`
  query getProjectWorkorders($searchTerm: String) {
    getProjectWorkorders(searchTerm: $searchTerm) {
      id
      title
      description
      type
      reporterId
      status
      priority
      listPosition
      createdAt
      updatedAt
      userIds
    }
  }
`

export const createWorkorder = gql`
  mutation createWorkorder($Workorder: WorkorderCreateInput!) {
    createWorkorder(Workorder: $Workorder) {
      id
      title
      type
      reporterId
      status
      createdAt
      updatedAt
    }
  }
`

export const updateWorkorderMutation = gql`
  mutation updateWorkorder(
    $WorkorderId: Float!
    $Workorder: WorkorderUpdateInput!
  ) {
    updateWorkorder(id: $WorkorderId, Workorder: $Workorder) {
      id
      title
      description
      type
      reporterId
      status
      priority
      listPosition
      createdAt
      updatedAt
      userIds
    }
  }
`

export const deleteWorkorder = gql`
  mutation deleteWorkorder($WorkorderId: Float!) {
    deleteWorkorder(id: $WorkorderId)
  }
`
