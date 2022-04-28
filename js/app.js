const tabs = document.querySelectorAll('.nav__item')
const currentHours = document.querySelectorAll('.stats__hours')
const prevStats = document.querySelectorAll('.prev__stats')

let globalData = []
let time = 'weekly'

document.addEventListener('DOMContentLoaded', () => {
  getData()
})

document.addEventListener('click', (e) => {
  time = (e.target.dataset.time);

  if (e.target.dataset.time === 'daily') {
    showDailyStats()
  }
  if (e.target.dataset.time === 'weekly') {
    showWeeklyStats()
  }
  if (e.target.dataset.time === 'monthly') {
    showMonthlyStats()
  }
})


const getData = async () => {
  try {
    const res = await fetch('../data.json')
    const data = await res.json()
    globalData.push(...data)
    showWeeklyStats()
  }
  catch (error) {
    console.log(error.message);
  }
}

tabs.forEach((item) => {
  item.addEventListener('click', () => {
    if (!item.classList.contains("active")) {
      tabs.forEach((item) => item.classList.remove("active"));
      item.classList.add("active");
    }
  })
})


const showDailyStats = async () => {

  currentHours.forEach(element => {
    let currentData = element.dataset.habit
    let currentTime = globalData.filter(el => el.title === currentData)[0]
    element.textContent = `${currentTime.timeframes[time].current}hrs`
  })
  prevStats.forEach(element => {
    let prevData = element.dataset.prev
    let prevTime = globalData.filter(el => el.title === prevData)[0]
    element.textContent = `Lasts ${time} ${prevTime.timeframes[time].previous}hrs`
  })

}

const showWeeklyStats = async () => {

  currentHours.forEach(element => {
    let currentData = element.dataset.habit
    let currentTime = globalData.filter(el => el.title === currentData)[0]
    element.textContent = `${currentTime.timeframes[time].current}hrs`
  })

  prevStats.forEach(element => {
    let prevData = element.dataset.prev
    let prevTime = globalData.filter(el => el.title === prevData)[0]
    element.textContent = `Lasts ${time} ${prevTime.timeframes[time].previous}hrs`
  })

}

const showMonthlyStats = async () => {

  currentHours.forEach(element => {
    let currentData = element.dataset.habit
    let currentTime = globalData.filter(el => el.title === currentData)[0]
    element.textContent = `${currentTime.timeframes[time].current}hrs`
  })

  prevStats.forEach(element => {
    let prevData = element.dataset.prev
    let prevTime = globalData.filter(el => el.title === prevData)[0]
    element.textContent = `Lasts ${time} ${prevTime.timeframes[time].previous}hrs`
  })

}