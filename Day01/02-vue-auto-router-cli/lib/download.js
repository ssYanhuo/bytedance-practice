const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const ora = require('ora')

module.exports.clone = async function (repo, des) {
  const process = ora(`Downloading ${repo}...`)
  process.start()
  await download(repo, des)
  process.succeed()
};