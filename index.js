const spiders = [
  /bot/i,
  /spider/i,
  /facebookexternalhit/i,
  /simplepie/i,
  /yahooseeker/i,
  /embedly/i,
  /quora link preview/i,
  /outbrain/i,
  /vkshare/i,
  /monit/i,
  /Pingability/i,
  /Monitoring/i,
  /WinHttpRequest/i,
  /Apache-HttpClient/i,
  /getprismatic.com/i,
  /python-requests/i,
  /Twurly/i,
  /yandex/i,
  /browserproxy/i,
  /Monitoring/i,
  /crawler/i,
  /Qwantify/i,
  /Yahoo! Slurp/i,
  /pinterest/i,
  /Mediapartners-Google/i,
  /CloudFlare/i,
  /DemandbasePublisherAnalyzer/i,
  /yeti/i
]

function isSpider (ua) {
  return spiders.some(function (spider) {
    return spider.test(ua)
  })
}

module.exports = {
  isSpider: isSpider,

  middleware: function (callback) {
    return function (req, res, next) {
      req.isSpider = isSpider.bind(undefined, req.get('user-agent'))
      if(isSpider(req.get('user-agent')) && typeof callback === 'function'){
        callback(req)
      }
      next()
    }
  }
}
