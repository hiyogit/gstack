import { renderHook, act } from '@testing-library/react'
import { useTodos } from '../hooks/useTodos'

// localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => localStorageMock.clear())

describe('useTodos', () => {
  it('초기 상태: 빈 배열', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })

  it('할 일 추가', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo({ text: '테스트', category: '업무', priority: 'high' })
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('테스트')
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('할 일 완료 토글', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo({ text: '테스트', category: '업무', priority: 'high' })
    })
    const id = result.current.todos[0].id
    act(() => { result.current.toggleTodo(id) })
    expect(result.current.todos[0].completed).toBe(true)
  })

  it('할 일 삭제', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo({ text: '테스트', category: '업무', priority: 'high' })
    })
    const id = result.current.todos[0].id
    act(() => { result.current.deleteTodo(id) })
    expect(result.current.todos).toHaveLength(0)
  })

  it('localStorage에 저장 및 복구', () => {
    const { result: r1 } = renderHook(() => useTodos())
    act(() => {
      r1.current.addTodo({ text: '저장테스트', category: '기타', priority: 'medium' })
    })
    const { result: r2 } = renderHook(() => useTodos())
    expect(r2.current.todos[0].text).toBe('저장테스트')
  })
})
