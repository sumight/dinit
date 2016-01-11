var fs = require('fs');
var colors = require('colors');
var extend = require('extend');
var path = require('path');

var main = module.exports = {
    // 目标目录
    targetDir: './',
    // 模板目录的标准路径
    templatePath: './template',
    // 配置文件的标准路径
    configPath: './config.js'
};

main.init = function(options) {

    extend(this, this.defaultOptions, options);

    this.templatePath = path.join(this.targetDir, this.templatePath);
    this.configPath = path.join(this.targetDir, this.configPath);

    this.initColor();
}

main.initColor = function() {
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });
}

main.checkit = function() {
    // 判断配置文件名是否存在
    if (!fs.existsSync(this.configPath)) {
        console.log('config.js 文件不存在'.error);
        return;
    }
    // 判断 template 目录是否存在
    if (!fs.existsSync(this.templatePath)) {
        console.log('template 目录不存在'.error);
        return;
    }
    // 校验配置文件的内容
    var config = require(this.configPath);
    if(this.checkConfigObj(config)){
        console.log('pass.'.info);
    }
}

main.checkConfigObj = function(config){
    // 检查 userInputs
    if(!(config.userInputs instanceof Array)){
        console.log('config.userInputs 不存在'.error)
        return false;
    }
    // 检查 userInputs 元素
    for(var i=0; i<config.userInputs.length; i++){
        var input  = config.userInputs[i];

        if(!input.name){
            console.log(('config.userInputs['+i+'].name 不存在').error);
            return false;
        }
        if(!input.tips){
            console.log(('config.userInputs['+i+'].tips 不存在').error);
            return false;
        }
        if(!input.default){
            console.log(('config.userInputs['+i+'].default 不存在').error);
            return false;
        }

    }
    // 检查 proxy 对象
    if((typeof config.beforeRender !== 'object')){
        console.log('config.beforeRender 不是 Object'.error);
        return false;
    }
    if((typeof config.afterRender !== 'object')){
        console.log('config.afterRender 不是 Object'.error);
        return false;
    }
    // 检查 proxy 对象中的元素
    for(var key in config.beforeRender){
        if(typeof key !== 'string'){
            console.log('config.beforeRender 的 key 不是 string'.error);
            return false;
        }
        if(typeof config.beforeRender[key] !== 'function'){
            console.log('config.beforeRender 的 value 不是 function'.error);
            return false;
        }
    }
    for(var key in config.afterRender){
        if(typeof key !== 'string'){
            console.log('config.afterRender 的 key 不是 string'.error);
            return false;
        }
        if(typeof config.afterRender[key] !== 'function'){
            console.log('config.afterRender 的 value 不是 function'.error);
            return false;
        }
    }
    return true;
}