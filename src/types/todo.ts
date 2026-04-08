export type Priority = 'high' | 'medium' | 'low'
export type Category = '업무' | '개인' | '기타'

export interface Todo {
  id: string
  text: string
  category: Category
  priority: Priority
  completed: boolean
  createdAt: number
}
