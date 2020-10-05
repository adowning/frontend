import { Workorder } from './workorder'
import { User } from './user'
export enum ProjectCategory {
  SOFTWARE = 'software',
  MARKETING = 'marketing',
  BUSINESS = 'business'
}

export interface Project {
  id: number
  name: string
  url: string | null
  description: string | null
  category: ProjectCategory
  createdAt: Date
  updatedAt: Date
  workorders: Workorder[]
  users: User[]
}

export const ProjectCategoryCopy = {
  [ProjectCategory.SOFTWARE]: 'Software',
  [ProjectCategory.MARKETING]: 'Marketing',
  [ProjectCategory.BUSINESS]: 'Business'
}

export default Project
