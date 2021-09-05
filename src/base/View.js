import $ from 'jquery'
import EventBus from './EventBus.js'

class View extends EventBus {
  constructor(options) {
    super()
    Object.assign(this, options)
    this.element = $(this.element)
    this.render(this.data)
    this.autoBindEvents()
    this.on('model:updated', () => {
      this.render(this.data)
    })
  }

  autoBindEvents() {
    for (let key in this.events) {
      const value = this[this.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      this.element.on(part1, part2, value)
    }
  }
}

export default View