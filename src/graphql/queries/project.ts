import gql from 'graphql-tag'

export const getProjectWithUsersAndWorkorders = gql`
  {
    getProjectWithUsersAndWorkorders {
      id
      name
      url
      description
      category
      createdAt
      updatedAt
      users {
        id
        name
        avatarUrl
        projectId
      }
      workorders {
        id
        title
        description
        type
        status
        priority
        listPosition
        createdAt
        updatedAt
        userIds
      }
    }
  }
`

export const updateProject = gql`
  mutation updateProject($project: ProjectInput!) {
    updateProject(project: $project) {
      id
    }
  }
`
