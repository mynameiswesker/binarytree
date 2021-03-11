import './App.css';
import {useEffect,useState} from 'react'
import {line} from './scripts/line'

function App() {

  let [N,change_N] = useState(0)//число вложенностей
  let [color,change_color] = useState('')

  const print = ()=> {//подгатавливает дом элементы после загрузки страницы
    let rootDIV = document.getElementById('rootDIV')//ul в котором все начинается

    if(rootDIV.lastChild === null && N === 0){//если rootDIV пуст и N число вложеностей = 0 то добавить нулевой узел 
      let alone = document.createElement('DIV')
      alone.classList.add('circle')
      alone.innerHTML = 0
      rootDIV.prepend(alone)
    }

    paint()

    print_numbers()

    return

  }

  let creater_dom_elements = ()=>{//ф-я создает узел ul+(2li+2div внутри)
    let node = document.createElement('UL')
    let li1 = document.createElement('LI')
    let li2 = document.createElement('LI')
    let div1 = document.createElement('DIV')
    let div2 = document.createElement('DIV')
    div1.classList.add('circle')
    div2.classList.add('circle')
    li1.append(div1)
    li2.append(div2)
    node.classList.add('node')
    node.prepend(li1)
    node.append(li2)

    return node
  }

  let add = ()=>{//ф-я при +
    let new_N = N+1
    if(new_N < 0) return
    change_N(new_N)

    let rootDIV = document.getElementById('rootDIV')//div в котором все начинается

    if(rootDIV.querySelectorAll('UL').length === 0){//если нет ни 1 дерева то создать 1 (частный случай)
      rootDIV.append(creater_dom_elements())

      print_numbers()

      to_connect()

      line()

      return//
    }

    if(rootDIV.querySelectorAll('UL').length>=1){//ищем все ul в root если их больше 1 то
      for(let li of rootDIV.querySelectorAll('LI')){//каждый li 
        if(li.querySelectorAll('UL').length === 0){//если у li нет потомков UL
          li.append(creater_dom_elements())
        }
      }
    }

    print_numbers()

    to_connect()

    line()

  }

  let dec = ()=>{//ф-я при -
    let new_N = N-1
    if(new_N < 0) return
    change_N(new_N)

    let rootDIV = document.getElementById('rootDIV')//div в котором все начинается

    if(rootDIV.querySelectorAll('DIV').length>0){
      for(let div of rootDIV.querySelectorAll('DIV')){
        if(div.nextSibling === null){
          div.parentNode.parentNode.remove()//удаляем узел node(последний с конца)
        }
      }
    }

    print_numbers()  

    to_connect()

    line()
    
  }

  let print_numbers = ()=>{//drug and drop (для любого кружка)

    let array_DIVs = document.getElementById('rootDIV').querySelectorAll('DIV')

    for(let div of array_DIVs){
      let node = div.parentNode//узел для перемещения

      //if(node.id === 'rootDIV') continue

      div.onmousedown = (event)=>{
        if(event.detail !== 2) return
        let shiftX = event.clientX - node.getBoundingClientRect().left;
        let shiftY = event.clientY - node.getBoundingClientRect().top;
      
        node.style.position = 'absolute'
        node.classList.add('ismove')
        node.style.zIndex = 1000;
        node.style.border = 'thick solid #0000FF'
        document.body.append(node)
      
        moveAt(event.pageX, event.pageY)
      
        function moveAt(pageX, pageY) {
          node.style.left = pageX - shiftX + 'px'
          node.style.top = pageY - shiftY + 'px'
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY)
        }
      
        document.addEventListener('mousemove', onMouseMove);
      
        node.onmouseup = function() {
          node.style.border = 'none'
          document.removeEventListener('mousemove', onMouseMove);
          node.onmouseup = null
        }
      }
      node.ondragstart = function() {
        return false
      }
    }    

  }
///////////////////////////////////////////////////////////////////////////////////// 

/////////////////////////////////////раскрасить кружки//////////////////////////////
  let paint = ()=>{
    let array_DIVs = document.getElementsByClassName('circle')

    for(let div of array_DIVs){
      let node = div.parentNode//узел для перемещения

      //if(node.id === 'rootDIV') continue

      div.addEventListener('click',()=>{

      ArrayPlusDelay(node.querySelectorAll('DIV'), (elem)=>{//добавим задержку для анимации
        elem.style.backgroundColor = color
      },100)

      })
    }
  }
////////////////////////////////////////////////////////////////////////////////////

/////////////функция для задержки действий (анимация)///////////////////////////////
function ArrayPlusDelay(array, delegate, delay) {
  let i = 0
  
  var interval = setInterval(function() {

      delegate(array[i]);
      
      if (i++ >= array.length - 1) clearInterval(interval)

  }, delay)
  
}
////////////////////////////////////////////////////////////////////////////////////

/////////////////////Добавляем нумирацию///////////////////////////////

let to_connect = () => {
  let divs = document.getElementsByClassName('circle')

  let arr = []//последние елементы массива

  let numbers = []
  
  for(let div of divs){
    if(div.nextSibling === null){
      let last_div = div//последний див
      let parent = last_div.parentNode.parentNode.parentNode.querySelectorAll('DIV')[0]//верхний главный див родителя

      if(parent.id === 'root'){
        continue
      }

      if(last_div.parentNode.parentNode.className === 'App'){
        continue
      }

      arr.push(last_div)

    }

  }

  for(let i=0; i<arr.length; i++){
    numbers.push(i+1)
  }

  for(let i=0; i<numbers.length; i++){

    if(numbers.length === 2){continue}

    let N = Math.log2(numbers.length)

    numbers[i] = numbers[i] + Math.pow(2,N) -2
  }

  for(let div of divs){
    if(div.nextSibling === null){
      let last_div = div//последний див
      let parent = last_div.parentNode.parentNode.parentNode.querySelectorAll('DIV')[0]//верхний главный див родителя

      if(parent.id === 'root'){
        continue
      }

      if(last_div.parentNode.parentNode.className === 'App'){
        continue
      }

      last_div.innerHTML = numbers[0]
      numbers.shift()

    }

  }

}

/*********************Добавляем стрелки**********************/

/////////////////////////////////////////////////////
  return (
    <div className="App">

      <div className='wrapp_top_menu'>

        <div className='div_text'>
          <p>Выбирете число вложенности N :</p>
        </div>

        <div className='div_change_N'>
          <button onClick={()=>add()}>+</button>
          <div>{N}</div>
          <button onClick={()=>dec()}>-</button>
        </div>

      </div>

      <div id='rootDIV' className='rootDIV'>
        {useEffect(()=>{
          print()
        })}
      </div>

      <div className='info'>
        <ul>
          <li>1. Для переноса узлов используйте двойное нажатие мыши на "кружок" и удерживайте левую кнопку мыши</li>
          <li>2. Что бы поменять цвет узлов - кликните 1 раз по "кружку"</li>
        </ul>
      </div>

      <div className='colors'>
        <p>3. Выбирете цвет</p>
        <ul>
          <li id='red' style={{backgroundColor:'red'}} onClick={()=>change_color('red')}></li>
          <li id='green' style={{backgroundColor:'green'}} onClick={()=>change_color('green')}></li>
          <li id='yellow' style={{backgroundColor:'yellow'}} onClick={()=>change_color('yellow')}></li>
          <li id='blue' style={{backgroundColor:'blue'}} onClick={()=>change_color('blue')}></li>
        </ul>
      </div>

      <div className='info_colors'>
        <p>Выбранный цвет : </p>
        <div style={{backgroundColor:color}} className='div_color'></div>
      </div>

      <div className='clear'>
        <button 
          onClick={()=>{
            let divs = document.getElementsByClassName('circle')
            let uls = document.getElementsByClassName('node')
            while(divs.length>0 && uls.length>0){
              for(let div of divs){
                div.remove()
              }
              for(let ul of uls){
                ul.remove()
              }
              change_N(0)
            }
            return false
          }}
          >Очистить поле
        </button>
      </div>

    </div>
  )
}

export default App;
