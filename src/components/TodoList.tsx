'use client'
import { TodoItem } from './TodoItem'
import type { Todo } from '../types/todo'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-600 text-sm">
        할 일이 없습니다
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
