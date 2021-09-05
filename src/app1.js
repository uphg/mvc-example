import './app1.scss'
import $ from 'jquery'
import Model from './base/Model'
import View from './base/View'

const model = new Model({
  data: {
    number: parseFloat(localStorage.getItem('mvc.computedReault')) || 0
  },
  update(data) {
    Object.assign(model.data, data)
    model.trigger('model:updated')
    localStorage.setItem('mvc.computedReault', model.data.number)
  },
})

const init = (element) => {
  new View({
    element: element,
    data: model.data,
    html: `
      <div>
        <div id="number" class="number">{{number}}</div>
        <div class="operating">
          <button id="add">+2</button>
          <button id="minus">-2</button>
          <button id="multiply">×2</button>
          <button id="divide">÷2</button>
          <button id="clear">清空</button>
        </div>
      </div>
    `,
    render(data) {
      /* 判断 element 内是否存在元素，存在则清空 */
      if (this.element.children.length !== 0) { this.element.empty() }
      $(this.html.replace('{{number}}', data.number))
        .appendTo(this.element)
    },
    events: {
      'click #add': 'add',
      'click #minus': 'minus',
      'click #multiply': 'multiply',
      'click #divide': 'divide',
      'click #clear': 'clear'
    },
    add() {
      model.update({ number: model.data.number + 2 })
    },
    minus() {
      model.update({ number: model.data.number - 2 })
    },
    multiply() {
      model.update({ number: model.data.number * 2 })
    },
    divide() {
      model.update({ number: model.data.number / 2 })
    },
    clear() {
      model.update({ number: 0 })
    },
  })
}

export default init