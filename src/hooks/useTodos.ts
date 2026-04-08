'use client'
import { useState, useEffect } from 'react'
import type { Todo, Category, Priority } from '../types/todo'

const STORAGE_KEY = 'gstack-todos'

interface AddTodoInput {
  text: string
  category: Category
  priority: Priority
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo({ text, category, priority }: AddTodoInput) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos(prev => [todo, ...prev])
  }

  function toggleTodo(id: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
