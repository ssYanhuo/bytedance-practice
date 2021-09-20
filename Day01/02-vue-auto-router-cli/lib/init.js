const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
const { resolve } = require('path')
const log = (content) => console.log(chalk.blueBright(content))

const spawn = async(...args) => {
  const {spawn} = require('child_process')
  return new Promise(resolve => {
    const p = spawn(...args)
    p.stdout.pipe(process.stdout)
    p.stderr.pipe(process.stderr)
    p.on('close', () => {
      resolve()
    })
  })
}

module.exports = async (name) => {
  clear()
  const data = await figlet('ssYanhuo Welcome')
  log(data)

  console.log(`🚀 Creating project ${chalk.green(name)}...`)
  await clone('github:su37josephxia/vue-template', name)

  console.log('📦 Installing dependencies...')
  await spawn('npm', ['install'], {cwd: `./${name}`})

  console.log('✔ Install finished!')
  console.log('')
  console.log('To get started: ')
  console.log('=================')
  log(`    cd ${name}`)
  log('    npm run serve')
  console.log('=================')
};