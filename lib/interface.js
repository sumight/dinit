/**
 * 用户界面模块，用来处理用户的各种操作
 * @module interface
 * @author xjc
 */

var argv = require('yargs').argv;
var config = require('./config');
var template = require('./template');
var shell = require('shelljs');
var generate = require('./generate');
var path = require('path');
var checker = require('./check');
var fs = require('fs');

var Main = exports;

Main.init = function() {

    // 用户动作
    var action = this.getUserAction();
    // 记录目标目录
    this.pwd = process.cwd();

    if (action === 'where') {
        this.where();
    }

    if (action === 'init') {
        this.initDir();
    }

    if (action === 'ls') {
        this.ls();
    }

    if (action === 'clean') {
        this.clean();
    }

    if (action === 'check') {
        this.check();
    }
}

/**
 * 获取用户的动作
 * @return {String} 用户的动作
 */
Main.getUserAction = function() {
    return process.argv[2];
}

/**
 * 设置和获取模板仓库的目录
 */
Main.where = function() {
    // 获取用户输入的路径
    var path = argv.path;
    // 如果用户输入了路径则存储路径
    if (!!path) {
        // 如果用户不存在，则提示用户，且不做操作
        if (!fs.existsSync(path)) {
            console.log('你设置的路径不存在，请确认');
            return;
        }
        config.set('path', path);
    } else {
        path = config.get('path');
    }

    console.log(path);

    if (!path) {
        console.log('你没有设置模板仓库路径,请使用', 'dinit where --path <path>', '进行设置');
    }
}

/**
 * 列出当前所有的目录模板
 */
Main.ls = function() {
    var tplnames = template.getTplNames();
    tplnames.forEach(function(ele, index) {
        console.log(ele);
    })
}

/**
 * 初始化目录
 */
Main.initDir = function() {
    // 获取用户输入的模板名
    var tplname = process.argv[3];
    // 判断是否为模板的模板
    generate.init({
        tplname: tplname,
        targetDir: this.pwd
    })
}

/**
 * 校验模板
 */
Main.check = function() {
    // 初始化，指定目标目录
    checker.init({
        targetDir: this.pwd
    });
    // 执行校验
    checker.checkit();
}

/**
 * 清除目录
 */
Main.clean = function() {
    // 清除目录
    // shell.exec('rm -r ' + path.join(this.pwd, '/*'));
    var targetDir = this.pwd
    
    if( fs.existsSync(targetDir) ) {
        files = fs.readdirSync(targetDir);
        files.forEach(function(file,index){
            var curPath = targetDir + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}

/**
 * 递归删除目录下的所有文件
 * @param  {String} path 目录的路径
 */
function deleteFolderRecursive(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

