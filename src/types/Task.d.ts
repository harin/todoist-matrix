
export interface ITask {
    id: number
    project_id: number
    content: string
    completed: boolean
    label_ids: [string]
    order: number
    indent: number
    priority: number
    due: any
    url: string
    comment_count: number
  }