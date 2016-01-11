/**
 * 配置操作
 * @module config
 * @author xjc
 */

var fs = require('fs');
var path = require('path');

var Main = exports;

/**
 * 配置文件的路径
 * @type {String}
 */
Main.path = "../data/config.json";

/**
 * 获取配置
 * @param  {String} key 配置的键名
 */
Main.get = function(key){
    // 配置对象
    var obj = this._getConfigObject();
    return obj[key];
}

/**
 * 设置配置
 * @param {String} key   配置的键名
 * @param {Any} value 配置的值
 */
Main.set = function(key,value){
    // 配置对象
    var obj = this._getConfigObject();
    obj[key] = value;
    this._saveConfigObject(obj);
}

/**
 * 获取配置对象
 * @return {Object} 配置对象
 */
Main._getConfigObject = function(){
    return require(this.path);
}

/**
 * 存储配置对象
 * @param  {Object} configObj 配置对象
 */
Main._saveConfigObject = function(configObj){
    // 序列化
    var configstr = JSON.stringify(configObj);
    // 写入文件
    var cfgpath = path.join(__dirname,this.path);
    fs.writeFileSync(cfgpath, configstr);
}