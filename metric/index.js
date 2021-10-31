import { Counter } from './send'

const counterId = 'B2AF0195-839A-42F1-BAB8-490E759EE59F' // 8D6E8E16-909F-43B9-9BE8-30986CAD12F3
const page = 'github user loading page'

const metricCounter = new Counter()
const requestId = (0x1000000 + Math.random() * 0xEFFFFFF | 0).toString(16)
metricCounter.init(counterId, requestId, page)

if (typeof window !== 'undefined') {

const getBrowser = () => {
  if (/MSIE/.test(navigator.userAgent)) return 'Internet Explorer'
  if (/Edg/.test(navigator.userAgent)) return 'Edge'
  if (/Firefox/.test(navigator.userAgent)) return 'Firefox'
  if (/Opera/.test(navigator.userAgent)) return 'Opera'
  if (/YaBrowser/.test(navigator.userAgent)) return 'Yandex Browser'
  if (/Chrome/.test(navigator.userAgent)) return 'Google Chrome'
  if (/Safari/.test(navigator.userAgent)) return 'Safari'
  return 'Unknown'
}

const getPlatform = () => /iPhone|iPad|Android|Windows Phone|BB10/
  .test(navigator.userAgent)
  ? 'touch'
  : 'desktop'

const getConnectionType = () => navigator?.connection?.effectiveType || 'Unsupported option'
const getLanguage = () => navigator.language || 'Unsupported option'
const getOs = () => navigator.platform || 'Unsupported option'
const getDeviceMemory = () => navigator.deviceMemory || 'Unsupported option'

metricCounter.setAdditionalParams({
  browser: getBrowser(),
  platform: getPlatform(),
  connectionType: getConnectionType(),
  os: getOs(),
  language: getLanguage(),
  deviceMemory: getDeviceMemory()
})

if (window.performance) {
  let [ navigation ] = window.performance.getEntriesByType('navigation')

  // API Safari отличается от остальных, значения вынесены из navigation в объект timing
  // if (!navigation) navigation = window.performance.timing

  if (navigation) {
    metricCounter.send('connect', Math.round(navigation.connectEnd - navigation.connectStart))
    metricCounter.send('ttfb', Math.round(navigation.responseEnd - navigation.requestStart))
  }

  setTimeout(function () {
    window.performance.getEntriesByType('paint').forEach(({ name, startTime }) => {
      const metricName = name === 'first-contentful-paint' ? 'fcp' : 'fp'
      metricCounter.send(metricName, Math.round(startTime))
    })
  }, 3000)
}


window.addEventListener('onLoadGithubUser', ({ detail }) => {
  metricCounter.send('onLoadGithubUser', Math.round(detail.duration))
})

window.addEventListener('fid', ({ detail }) => {
  metricCounter.send('fid', Math.round(detail.value))
})
}