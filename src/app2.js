import './app2.scss'
import $ from 'jquery'

const eventBus = $(window)

const localKey = 'mvc.tabIndex'

const model = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  created() { },
  delete() { },
  update(data) {
    Object.assign(model.data, data)
    eventBus.trigger('model:updated')
    localStorage.setItem(localKey, model.data.index)
  },
  get() { }
}

const view = {
  element: null,
  html(index) {
    return `
    <div>
      <div class="tab">
        <ul class="tab-bar">
          <li class="${index === 0 ? 'active' : ''}" data-index="0"><span>标题一</span></li>
          <li class="${index === 1 ? 'active' : ''}" data-index="1"><span>标题二</span></li>
          <li class="${index === 2 ? 'active' : ''}" data-index="2"><span>标题三</span></li>
        </ul>
        <ul class="tab-content">
          <li class="${index === 0 ? 'active' : ''}">内容一</li>
          <li class="${index === 1 ? 'active' : ''}">内容二</li>
          <li class="${index === 2 ? 'active' : ''}">内容三</li>
        </ul>
      </div>
    </div>
    `
  },
  init(container) {
    /* container：指定渲染的容器 */
    view.element = $(container)
  },
  render(data) {
    /* 判断 element 内是否存在元素，存在则清空 */
    if (view.element.children.length !== 0) { view.element.empty() }
    $(view.html(data.index)).appendTo(view.element)
  }
}

const controller = {
  init(container) {
    view.init(container)
    view.render(model.data)
    controller.autoBindEvents()
    eventBus.on('model:updated', () => {
      view.render(model.data)
    })
  },
  events: {
    'click .tab-bar li': 'x',
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    model.update({index: index})
  },
  autoBindEvents() {
    const events = controller.events
    for (const key in events) {
      const value = controller[events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.element.on(part1, part2, value)
    }
  }
}

export default controller


// /* 原代码 */
// const html = `
// <section id="app2" class="block">
//   <div class="tab">
//     <ul class="tab-bar">
//       <li><span>标题一</span></li>
//       <li><span>标题二</span></li>
//       <li><span>标题三</span></li>
//     </ul>
//     <ul class="tab-content">
//       <li>内容一</li>
//       <li>内容二</li>
//       <li>内容三</li>
//     </ul>
//   </div>
// </section>
// `

// $(html).appendTo($('body > .content'))

// const localKey = 'mvc.tabIndex'
// const tabIndex = localStorage.getItem(localKey) || 0

// const $tabBar = $('#app2 .tab-bar')
// const $tabContent = $('#app2 .tab-content')

// $tabBar.on('click', 'li', (e) => {
//   const $li = $(e.currentTarget)
//   const index = $li.index()
//   localStorage.setItem(localKey, index)
//   $li
//     .addClass('active')
//     .siblings()
//     .removeClass('active')
//   $tabContent
//     .children()
//     .eq(index)
//     .addClass('active')
//     .siblings()
//     .removeClass('active')
// })

// /* 加载页面时触发一次tab点击 */
// $tabBar
//   .children()
//   .eq(tabIndex)
//   .trigger('click')
