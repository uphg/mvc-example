import $ from 'jquery'
import './style.scss'
import { getLocal, setLocal } from '../../utils/local'

const COUNT_KEY = 'modules.count'

const view = {
  el: null,
  template: `
    <div class="part">
      <div class="counter">
        <p class="number">计数：{{ number }}</p>
        <div class="active-bar">
          <button class="button reset">重置</button>
          <button class="button add">点击+1</button>
          <button class="button subtract">点击-1</button>
          <button class="button multiply">点击×2</button>
          <button class="button divide">点击÷2</button>
        </div>
      </div>
    </div>
  `,
  render(data) {
    $(view.el).html(view.template.replace(/\{\{.*\}\}/g, data.number))
  },
}

const model = {
  data: {
    number: Number(getLocal(COUNT_KEY)) || 100
  },
  create() {},
  delete() {},
  update() {},
  get() {}
}

const controller = {
  mount(container) {
    view.el = $(container)
    view.render(model.data)
    controller.bindEvents()
  },
  events: {
    'click .reset': 'reset',
    'click .add': 'add',
    'click .subtract': 'subtract',
    'click .multiply': 'multiply',
    'click .divide': 'divide',
  },
  bindEvents() {
    for (const key in controller.events) {
      const value = controller.events[key]
      const eventMap = key.split(' ')

      view.el.on(eventMap[0], eventMap[1], controller.methods[value])
    }
  },
  methods: {
    reset() {
      model.data.number = 100
      view.render(model.data)
      setLocal(COUNT_KEY, model.data.number)
    },
    add() {
      model.data.number += 1
      view.render(model.data)
      setLocal(COUNT_KEY, model.data.number)
    },
    subtract() {
      model.data.number -= 1
      view.render(model.data)
      setLocal(COUNT_KEY, model.data.number)
    },
    multiply() {
      model.data.number *= 2
      view.render(model.data)
      setLocal(COUNT_KEY, model.data.number)
    },
    divide() {
      model.data.number /= 2
      view.render(model.data)
      setLocal(COUNT_KEY, model.data.number)
    }
  }
}

export default controller