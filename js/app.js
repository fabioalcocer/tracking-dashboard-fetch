const tabs = document.querySelectorAll('.nav__item')
const currentHours = document.querySelectorAll('.stats__hours')
const prevStats = document.querySelectorAll('.prev__stats')

let globalData = []
let time = 'daily'

document.addEventListener('DOMContentLoaded', () => {
  getData()
})

document.addEventListener('click', (e) => {
  time = (e.target.dataset.time);
})

const getData = async () => {
  try {
    const res = await fetch('../data.json')
    const data = await res.json()
    globalData.push(...data)
    // showWeeklyStats(globalData)
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

      if (item.textContent === "Daily") {
        showDailyStats()
      }
      if (item.textContent === "Weekly") {
        showWeeklyStats(globalData)
      }
      if (item.textContent === "Monthly") {
        showMonthlyStats()
      }
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

const showWeeklyStats = async (data) => {
  const cards = document.querySelectorAll('.card')

  cards.forEach(card => {
    data.forEach(item => {
      card.querySelector('.stats__hours').textContent = `${item.timeframes.weekly.current}hrs`
    });
  });

}

const showMonthlyStats = async () => {
  name.textContent = data[0].title
  hours.textContent = data[0].timeframes.monthly.current
  lastDate.textContent = 'monthly'
  lastHours.textContent = data[0].timeframes.monthly.previous
}
