'use client'
import { useTodos } from '@/hooks/useTodos'
import { TodoList } from '@/components/TodoList'
import { useState } from 'react'

export default function Page() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [text, setText] = useState('')
  const [category, setCategory] = useState<'업무' | '개인' | '기타'>('업무')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high')

  function submit() {
    if (!text.trim()) return
    addTodo({ text, category, priority })
    setText('')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-100 mb-6">📋 Todo App</h1>
        
        <div className="flex gap-2 mb-6">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="할 일을 입력하세요..."
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 px-3 py-2 rounded-lg"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg"
          >
            <option value="업무">업무</option>
            <option value="개인">개인</option>
            <option value="기타">기타</option>
          </select>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg"
          >
            <option value="high">높음</option>
            <option value="medium">보통</option>
            <option value="low">낮음</option>
          </select>
          <button
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            추가
          </button>
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  )
}
