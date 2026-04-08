import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from '../components/TodoItem'
import type { Todo } from '../types/todo'

const mockTodo: Todo = {
  id: '1',
  text: '테스트 할 일',
  category: '업무',
  priority: 'high',
  completed: false,
  createdAt: Date.now(),
}

describe('TodoItem', () => {
  it('텍스트 렌더링', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('테스트 할 일')).toBeInTheDocument()
  })

  it('체크박스 클릭 시 onToggle 호출', async () => {
    const onToggle = jest.fn()
    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={() => {}} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('삭제 버튼 클릭 시 onDelete 호출', async () => {
    const onDelete = jest.fn()
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('completed=true 이면 line-through 적용', () => {
    render(<TodoItem todo={{ ...mockTodo, completed: true }} onToggle={() => {}} onDelete={() => {}} />)
    const text = screen.getByText('테스트 할 일')
    expect(text).toHaveClass('line-through')
  })
})
