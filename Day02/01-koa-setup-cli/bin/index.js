#!/usr/bin/env node
import fs from "fs";
import { createIndexTemplate } from "./indexTemplate.js";
import { createPackageTemplate } from "./packageTemplate.js";
import execa from 'execa';
import { question } from "./question.js";
import path from "path";

// input
const config = await question()
console.log(config);
// process
// output

// 程序的input
// input
// cli  -> gu

// 核心：自动化思维
// happy path
// 1. 创建了文件夹 （项目名）
fs.mkdirSync(getRootPath());

// 2. 创建了 index.js
fs.writeFileSync(getRootPath() + "/index.js", createIndexTemplate(config));

// 3. 创建了 Package.json
// 练习点： 基于数据生成 package.json
fs.writeFileSync(getRootPath() + "/package.json", createPackageTemplate(config));

// 4. 安装依赖
// TODO package  -> yarn
execa('npm i', {cwd: getRootPath()})


function getRootPath() {
    return path.resolve(process.cwd(), config.packageName)
}
