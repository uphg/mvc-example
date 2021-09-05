import './app4.scss'
import $ from 'jquery'

const html = `
<section id="app4" class="block">
  <div class="circle"></div>
</section>
`

$(html).appendTo($('body > .content'))

const $circle = $('#app4 .circle')

$circle.on('mouseenter', ()=>{
  $circle.addClass('active')
}).on('mouseleave', ()=>{
  $circle.removeClass('active')
})