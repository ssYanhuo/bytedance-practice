import inquirer from "inquirer"

export function question (){
    return inquirer.prompt([
        {type: 'input', name: 'packageName', message: 'Set package name'},
        {type: 'number', name: 'port', message: 'Set port number', default: () => 8080},
        {type: 'checkbox', name: 'middleware', message: 'Choose middleware you want to use', choices: [{name: 'koaStatic'}, {name: 'koaRouter'}]}
    ])
}