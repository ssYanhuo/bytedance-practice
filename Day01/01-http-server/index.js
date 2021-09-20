//实现一个简单的 http server，输出字符串
//Winter 永远的神！
const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=UTF8'
    })
    res.end('Winter 永远的神！')
    console.log('Received a request.');
})
.listen(3000)