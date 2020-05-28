document.addEventListener('DOMContentLoaded',() =>{
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const ScoreDisplay = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')
const width = 10 

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
    })
}

//apaga o bloco
function unDraw(){
    current.forEach(index => {
        squares[currentPosition +index].classList.remove('tetromino')
    })
}
//faz bloco se mover 2x por segundo
timerId = setInterval(moveDown, 500)

//direcionar funcoes para keycodes
function control(e){
    if(e.keyCode == 37){
        moveLeft()
    }else if(e.keyCode == 38){
        rotate()
    }else if(e.keyCode == 39){
        moveRight()
    }else if (e.keyCode == 40){
        //move pra baixo
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
        random = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
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
 
})
