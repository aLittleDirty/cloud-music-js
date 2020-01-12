export function formatSeconds (rawSeconds) {
  let minute = format(rawSeconds / 60)
  let second = format(rawSeconds % 60)
  return `${minute} : ${second}`
}

function format (rawTime) {
  let time = parseInt(rawTime).toString()
  while (time.length < 2) {
    time = '0' + time
  }
  return time
}

export function formatInvalidTime (invalidTime) {
  return '-- : --'
}
