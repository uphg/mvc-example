import './app3.scss'
import $ from 'jquery'

const html = `
<section id="app3" class="block">
  <div class="square"></div>
</section>
`

$(html).appendTo($('body > .content'))

const localKey = 'mvc.squareActive'
const squareActive = localStorage.getItem(localKey) === 'yes'

const $square = $('#app3 .square')

$square.on('click', ()=>{
  if ($square.hasClass('active')) {
    $square.removeClass('active')
    localStorage.setItem(localKey, 'no')
  } else {
    $square.addClass('active')
    localStorage.setItem(localKey, 'yes')
  }
})

/* toggleClass，可传入两个值，根据 squareActive 是否存在，判断是否添加 'active' class */
$square.toggleClass('active', squareActive)
