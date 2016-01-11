/**
 * 获取用户的输入数据
 * @module user-input
 * @author xjc
 */

var shell = require("shelljs");
var argv = require('yargs').argv;
var path = require('path');
var fs = require('fs');
var colors = require('colors');
var readline = require('readline');
var Q = require('q');
var extend = require('extend');

var Main = exports;

Main.defaultOptions = {
    inputCfgs: []
}

/**
 * 初始化模块
 * @param  {Object} options 用户选项
 */
Main.init = function(options) {
    var self = this;
    extend(this, this.defaultOptions, options);

}

/**
 * 获取用户输入
 * @param  {Function} callback 回调函数
 * @returns {Promise}          promise对象
 */
Main.getUserInputs = function() {
    var self = this;

    if (self.inputCfgs.length <= 0) {
        return Q.fcall(function() {
            return {};
        });
    }

    // 目录的用户数据
    var userdata = {};

    var promise = Q.fcall(function() {
        return null
    });
    this.inputCfgs.forEach(function(inputCfg, index) {

        promise = promise.then(function(kv) {
            if (!!kv) {
                userdata[kv.name] = (kv.value || self.inputCfgs[index-1].default);
            }
            return self._getOneInput(inputCfg);
        })
    });

    promise = promise.then(function(kv) {

        userdata[kv.name] = (kv.value || self.inputCfgs[self.inputCfgs.length - 1].default);

        return userdata;

    })

    return promise;
}

/**
 * 获取一条用户输入
 * @param {Function} callback 回调函数
 */
Main._getOneInput = function(inputCfg) {
    return Q.Promise(function(resolve, reject) {

        // 初始化
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(inputCfg.tips+'('+inputCfg.name+'): ', function(answer) {

            rl.close();
            resolve({name:inputCfg.name, value:answer});
        })
    })
}


// test
// Main.init({
//     inputCfgs: [{
//         name: 'plugname',
//         tips: '请输入插件名称',
//         default: 'yourplugname'
//     }, {
//         name: 'author',
//         tips: '请输入作者名称',
//         default: 'yourname'
//     }]
// })

// Main.getUserInputs().then(function(data) {
//     console.log(data);
// }).done();
