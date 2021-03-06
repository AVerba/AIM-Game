const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors= ['#ce5757','#eca049','#d4cb40d8','#84cc5ad8','#57c9d1d8','#5868c2d8','#c559c0d8','#a35b79d8']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute('data-time'))
       screens[1].classList.add('up')  
       startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomeCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomeCircle()
    setTime(time)
}

function decreaseTime () {
    if (time === 0) {
        finishGame()
    } else {
    let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>ะกััั: <span class="primary">${score}</span></h1> `

}

function createRandomeCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color  = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height =  `${size}px`
    circle.style.background = color
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)

    circle.addEventListener('click', () => setColor(circle))
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors [index]
}