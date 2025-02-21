document.addEventListener('DOMContentLoaded',() =>{
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')
const width = 10 
let nextRandom = 0
let timerId
let score = 0
//adicionar cores
const colors = [
    'orange',
    'red',
    'purple',
    'yellow',
    'blue',
]
//Tetrominoes blocos
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0

//seleciona bloco randomicamente
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//desenha o bloco
function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
}

//apaga o bloco
function unDraw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}
//faz bloco se mover 2x por segundo
//timerId = setInterval(moveDown, 500)

//direcionar funcoes para keycodes
function control(e){
    if(e.keyCode == 37){
        moveLeft()
    }else if(e.keyCode == 38){
        rotate()
    }else if(e.keyCode == 39){
        moveRight()
    }else if (e.keyCode == 40){
        moveDown()
    }

}
document.addEventListener('keyup', control)

//move o bloco pra baixo
function moveDown(){
    unDraw()
    currentPosition += width
    draw()
    freeze()
}

//para o bloco no fundo do grid
function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //faz um novo bloco cair
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
}

//move o bloco pra esquerda <
function moveLeft(){
    unDraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if(currrent.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition += 1
    }

    draw()
}

//move bloco para direita >
function moveRight(){
    unDraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width == width -1)
    
    if (!isAtRightEdge) currentPosition += 1

    if(currrent.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1
    }

    draw()
}
//rotaciona o bloco
function rotate(){
    unDraw()
    currentRotation ++
    if(currentRotation == current.length){ //se a rotação esta em 4, volta para o 0
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//mostrar proximo bloco
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

//bloco sem rotacao
const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //mostrar o bloco no minigrid
  function displayShape(){
      displaySquares.forEach(square => {
          square.classList.remove('tetromino')
          square.style.backgroundColor = ''
      })
      upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      })
  }

//adicionar funcionaliade dos botoes START
StartBtn.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId)
        timerId = null
    }else{
        draw()
        timerId = setInterval(moveDown, 500)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})

//adiciona score e remove do grid divs completados
function addScore(){
    for(let i =0;i<199;i+=width){
        const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

        if(row.every(index => squares[index].classList.contains('taken'))){
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
               })
               const squaresRemoved = squares.splice(i,width)
               squares = squaresRemoved.concat(squares)
               squares.forEach(cell => grid.appendChild(cell))
            }
    }
}
//game over
function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
    }
}










})
