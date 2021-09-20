const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
    const list = fs.readdirSync('./src/views')
        .filter((s) => s !== 'Home.vue')
        .map((s) => ({
            name: s.replace('.vue', '').toLowerCase(),
            file: s
        }))
    
    compile({list}, './src/router.js', './template/router.js.hbs')
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    function compile(meta, filePath, templatePath){
        if(fs.existsSync(templatePath)){
            const content = fs.readFileSync(templatePath).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, result)
            console.log(chalk.green(`🔥 ${filePath} successfully created.`))
        }
    }
}