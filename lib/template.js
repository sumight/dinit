/**
 * 获取关于目录模板的信息
 * @module template
 * @author xjc
 */

var extend = require('extend');
var path = require('path');
var fs = require('fs');
var config = require('../data/config.json');

var Main = exports;

Main.defaultOptions = {
    
}


/**
 * 初始化模块
 * @param  {Object} options 用户选项
 */
Main.init = function(options){
    var self = this;
    extend(this, this.defaultOptions, options);

}

/**
 * 根据模板名称获取模板模块的目录
 *     有可能模板模块不存在
 * @param  {String} name 模板名称
 * @return {String|null} 模板模块的绝对路径
 */
Main._getTplModulePathByName = function(name){
    var self = this;

    // 模板模块的路径
    var tplModulePath = null;

    // 如果是模板的模板做特殊处理
    if(name === 'tpl'){
        tplModulePath = path.join(__dirname,'../data/tpl-tpl');
        return tplModulePath;
    }

    
    // 模板仓库的目录
    var tplpath = config.path;
    // 假设一个路径
    var ifdir = path.join(tplpath, name);
    // 判断目录是否存在
    if(fs.existsSync(ifdir)){
        tplModulePath = ifdir;
    }

    return tplModulePath;
}

/**
 * 根据模板目录获取模板对象
 * @param  {String} filename 模板绝对路径
 * @return {Object}          模板对象
 *         {
 *             tpldir: '/tpldir' //模板路径
 *             userInputs:[],
 *             proxy:functon(){}
 *         }
 */
Main._getTplByPath = function(filename){
    // 模板模板配置文件
    var configFile = path.join(filename, 'config.js');
    // 获取模板配置文件内容
    if(!fs.existsSync(configFile)){
        console.log("模板的配置文件不存在");
        return null;
    }
    var tplObj = require(configFile);
    // 检测模板配置对象
    if(! this._verifyConfig(tplObj)){
        console.log('模板配置文件格式错误');
        return null;
    }

    // 加上模板路径
    tplObj.tpldir = path.join(filename,'template');

    return tplObj;
}

/**
 * 检测模板的配置对象
 * @param  {Object} config 模板的配置对象
 * @return {Boolean}        是否通过检验
 */
Main._verifyConfig = function(config){
    // 检查 userInputs
    if(!(config.userInputs instanceof Array)){
        return false;
    }
    // 检查 userInputs 元素
    for(var i=0; i<config.userInputs.length; i++){
        var input  = config.userInputs[i];

        if(!input.name) return false;
        if(!input.tips) return false;
        if(!input.default) return false;

    }
    // 检查 proxy 对象
    if(config.beforeRender && (typeof config.beforeRender !== 'object')){
        return false;
    }
    if(config.afterRender && (typeof config.afterRender !== 'object')){
        return false;
    }
    // 检查 proxy 对象中的元素
    for(var key in config.beforeRender){
        if(typeof key !== 'string'){
            return false;
        }
        if(typeof config.beforeRender[key] !== 'function'){
            return false;
        }
    }
    for(var key in config.afterRender){
        if(typeof key !== 'string'){
            return false;
        }
        if(typeof config.afterRender[key] !== 'function'){
            return false;
        }
    }
    return true;
}

/**
 * 通过模板名字获取模板对象
 * @param  {String} name 模板名
 * @return {Object}      模板对象
 *         {
 *             name:'tplname', //模板名字
 *             tpldir: '/tpldir' //模板路径
 *             userInputs:[],
 *             proxy:functon(){}
 *         }
 */
Main.getTplByName = function(name) {
    // 获取模板的路径
    var path = this._getTplModulePathByName(name);

    if(!path) return null;

    return this._getTplByPath(path);
}

/**
 * 获取当前所有模板的名字
 * @return {Array} 所有模板的名字的数组
 */
Main.getTplNames = function(){
    // 模板仓库的路径
    var path = config.path;
    // 判断 path 是否设置
    if(!path){
        return ['tpl'];
    }
    // 获取所有的模板目录
    var dirnames = fs.readdirSync(path);
    // 去除系统文件
    dirnames = dirnames.filter(function(item){
        // 过滤所有文件名 . 开头的文件
        if(/^\./.test(item)){
            return false;
        }
        return true;
    });
    // 加上模板的模板目录名
    dirnames.unshift('tpl');

    return dirnames;
}