const url = require('url')
const express = require('express')
const request = require('request')
const app = express()
app.listen()
app.use('*', (req, res,next) => {
  const requestUrl = 'https://npm.taobao.org' + req.originalUrl
  request(requestUrl, function (error, response, body) {
    const arr = body.split('downloads')
    const str = arr[arr.length-1]
    const count = str.split(/>|(<\/text>)/)[4]
    const rightText = count + '/month'
    const strW = rightText.length * 7.5
    const o = {
      svgWidth: 101 + strW,
      reactWidth: 100 + strW,
      thirdPathW: 101 + strW,
      countWidth: strW,
      rightText
    }
    res.set({
      'content-type': 'image/svg+xml;charset=utf-8'
    })
    const strLeft = 'cnpm downloads'
    const oLeft = {}
    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${o.svgWidth}" height="20">
      <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <clipPath id="a">
        <rect width="${o.reactWidth}" height="20" rx="3" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#a)">
        <path fill="#555" d="M0 0h100v20H0z"/>
        <path fill="#4c1" d="M100 0h${o.countWidth}v20H100z"/>
        <path fill="url(#b)" d="M0 0h${o.thirdPathW}v20H0z"/>
      </g>
      <g fill="#fff" text-anchor="start" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
        <text x="16" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)">${strLeft}</text>
        <text x="16" y="140" transform="scale(.1)">${strLeft}</text>
        <text x="1035" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" >${o.rightText}</text>
        <text x="1035" y="140" transform="scale(.1)">${o.rightText}</text>
      </g>
    </svg>`)
  })
})
