const Koa = require("koa");
const fs = require("fs")
const path = require('path');


const app = new Koa();

app.use((ctx) => {
  const url = ctx.request.url
  console.log(url)
  if (url === '/') {
    ctx.body = fs.readFileSync('./index.html', 'utf-8')
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    ctx.type = 'text/javascript'
    const source = fs.readFileSync(p, 'utf-8')
    ctx.body = rewritePath(source)
  } else if (url.startsWith('/@modules')) {
    const moduleName = url.replace('/@modules', '')
    const perfix = __dirname + '/node_modules' + moduleName
    const module = require(perfix + '/package.json').module

    const code = fs.readFileSync(module, 'utf-8')
    ctx.body = code
  }
})

function rewritePath(p) {
  return p.replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/').replace(/process\.env\.NODE_ENV/g, 'development')
}

app.listen(8080, () => {

  console.log("Open server localhost:8080");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
});