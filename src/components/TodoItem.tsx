'use client'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />
      <div className="flex-1">
        <p className={`text-sm text-slate-100 ${todo.completed ? 'line-through' : ''}`}>
          {todo.text}
        </p>
        <p className="text-xs text-slate-500">
          {todo.category} · {todo.priority}
        </p>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-400 hover:text-red-400"
      >
        🗑
      </button>
    </div>
  )
}
