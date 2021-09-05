import $ from 'jquery'
import { getLocal, setLocal } from '../../utils/local'
import './style.scss'

const TODO_KEY = 'modules.todo'

const defaultTodo = [
  {
    status: true,
    content: '洗漱'
  },
  {
    status: false,
    content: '吃饭'
  },
  {
    status: false,
    content: '学习'
  }
]

const components = {
  todoWrap: (content) => {
    const wrap = (slot) => `
      <div class="part">
        <div class="todo">${slot}</div>
      </div>
    `
    return Array.isArray(content) ? wrap(content.toString().replace(/,/g, '')) : wrap(content)
  },
  todoItem: (content, { index, checked }) => `
    <div class="todo-item" data-index="${index}">
      <label class="todo-label">
        <input class="todo-checkbox" type="checkbox" ${checked ? 'checked' : ''}>
        ${content}
      </label>
    </div>
  `.replace(/\n/g, '')
}

const model = {
  data: {
    todos: getLocal(TODO_KEY) || defaultTodo
  },
  create() {},
  delete() {},
  update() {},
  get() {}
}

const view = {
  el: null,
  template: () => components.todoWrap(
    model.data.todos.map(
      ({ status, content }, index) => components.todoItem(
        content,
        { index, checked: status }
      )
    )
  ),
  render() {
    $(view.el).html(view.template)
  }
}

const controller = {
  mount(container) {
    view.el = $(container)
    view.render()
    controller.bindEvents()
  },
  events: {
    'click .todo-item': 'clickTodoItem',
  },
  bindEvents() {
    for (const key in controller.events) {
      const value = controller.events[key]
      const eventMap = key.split(' ')

      view.el.on(eventMap[0], eventMap[1], controller.methods[value])
    }
  },
  methods: {
    createTodo(content) {
      model.data.todos.push({
        status: false,
        content
      },)
      view.render()
      setLocal(TODO_KEY, model.data.todos)
    },
    clickTodoItem(event) {
      event.preventDefault() // 阻止触发子元素点击事件造成多次点击

      const el = event.currentTarget
      const index = el.dataset.index

      model.data.todos[index].status = !model.data.todos[index].status
      view.render()
      setLocal(TODO_KEY, model.data.todos)
    }
  }
}

export default controller
