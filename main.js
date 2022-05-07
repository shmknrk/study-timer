const getCurrentDateTimeStr = () => {
  const currentDateTime = new Date()
  const year = currentDateTime.getFullYear().toString()
  const month = ('0' + (currentDateTime.getMonth() + 1).toString()).slice(-2)
  const date = ('0' + currentDateTime.getDate().toString()).slice(-2)
  const hours = ('0' + currentDateTime.getHours().toString()).slice(-2)
  const minutes = ('0' + currentDateTime.getMinutes().toString()).slice(-2)
  const seconds = ('0' + currentDateTime.getSeconds().toString()).slice(-2)
  const currentDateTimeStr = year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds
  return currentDateTimeStr
}

const getCurrentTimeStr = () => {
  const currentTime = new Date()
  const hours = ('0' + currentTime.getHours().toString()).slice(-2)
  const minutes = ('0' + currentTime.getMinutes().toString()).slice(-2)
  const seconds = ('0' + currentTime.getSeconds().toString()).slice(-2)
  const currentTimeStr = hours + ':' + minutes + ':' + seconds
  return currentTimeStr
}

const getElapsedTimeStr = (startTime) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const elapsedTime = currentTime - startTime
  const minutes = Math.floor(elapsedTime / 60).toString()
  const elapsedTimeStr = minutes + ' min'
  return elapsedTimeStr
}

window.addEventListener('DOMContentLoaded', () => {
  const currentDateTimeElem = document.getElementById('current-date-time')
  const startTimeElem = document.getElementById('start-time')
  const stopTimeElem = document.getElementById('stop-time')
  const elapsedTimeElem = document.getElementById('elapsed-time')
  const startAndStopBtnElem = document.getElementById('start-and-stop-btn')
  const resetBtnElem = document.getElementById('reset-btn')

  stopTimeElem.innerHTML = '-- : -- : --'
  elapsedTimeElem.innerHTML = '-- min'
  resetBtnElem.innerHTML = 'reset'
  resetBtnElem.disabled = true
  startAndStopBtnElem.innerHTML = 'start'

  const delay = 10

  const setIntervalCurrentDateTimer = () => {
    currentDateTimeElem.innerHTML = getCurrentDateTimeStr()
    setInterval(() => {
      currentDateTimeElem.innerHTML = getCurrentDateTimeStr()
    }, delay)
  }

  let startTimerId
  const setIntervalStartTimer = () => {
    startTimeElem.innerHTML = getCurrentTimeStr()
    startTimerId = setInterval(() => {
      startTimeElem.innerHTML = getCurrentTimeStr()
    }, delay)
  }

  let stopTimerId
  const setIntervalStopTimer = () => {
    stopTimeElem.innerHTML = getCurrentTimeStr()
    stopTimerId = setInterval(() => {
      stopTimeElem.innerHTML = getCurrentTimeStr()
    }, delay)
  }

  let elapsedTimerId
  const setIntervalElapsedTimer = (startTime) => {
    elapsedTimeElem.innerHTML = getElapsedTimeStr(startTime)
    elapsedTimerId = setInterval(() => {
      elapsedTimeElem.innerHTML = getElapsedTimeStr(startTime)
    }, delay)
  }

  setIntervalCurrentDateTimer()
  setIntervalStartTimer()

  let state = 0
  let startTime = 0

  startAndStopBtnElem.addEventListener('click', () => {
    switch (state) {
    case 0:
      startTime = Math.floor(Date.now() / 1000)
      clearInterval(startTimerId)
      setIntervalStopTimer()
      setIntervalElapsedTimer(startTime)
      startAndStopBtnElem.innerHTML = 'stop'
      resetBtnElem.disabled = false
      state = 1
      break
    case 1:
      clearInterval(stopTimerId)
      clearInterval(elapsedTimerId)
      startAndStopBtnElem.innerHTML = 'start'
      state = 2
      break
    case 2:
      setIntervalStopTimer()
      setIntervalElapsedTimer(startTime)
      startAndStopBtnElem.innerHTML = 'stop'
      state = 1
      break
    }
  })

  resetBtnElem.addEventListener('click', () => {
    startTime = 0
    clearInterval(startTimerId)
    clearInterval(stopTimerId)
    clearInterval(elapsedTimerId)
    setIntervalStartTimer()
    stopTimeElem.innerHTML = '-- : -- : --'
    elapsedTimeElem.innerHTML = '-- min'
    startAndStopBtnElem.innerHTML = 'start'
    resetBtnElem.disabled = true
    state = 0
  })
})
