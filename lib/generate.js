var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var userInput = require('./user-input');
var template = require('./template');
var extend = require('extend');
var path = require('path');
var through = require('through2');

var Main = module.exports = {
    tplObj: null,
    userdata: null
};


Main.defaultOptions = {
    /**
     * 目录模板名称
     * @type {String}
     */
    tplname: '',
    /**
     * 目标目录
     * @type {String}
     */
    targetDir: ''
}

/**
 * 初始化模块
 * @param  {Object} options 用户选项
 */
Main.init = function(options) {
    var self = this;
    extend(this, this.defaultOptions, options);

    // 获取模板对象
    template.init({});
    this.tplObj = template.getTplByName(this.tplname);

    if(this.tplObj === null){
        console.log("找不到目录模板",this.tplname);
        return;
    }

    // 初始化用户输入
    var inputCfgs = self.tplObj.userInputs;
    userInput.init({
        inputCfgs: inputCfgs
    });

    self.initDirectory();
}

/**
 * 初始化目录
 */
Main.initDirectory = function() {
    var self = this;
    // 判断模板对象是否存在
    if (!this.tplObj) {
        console.log('目录模板', self.tplname, '不存在', '请到cnpm搜索并且安装');
        return;
    }

    // 获取用户输入
    userInput.getUserInputs()
        .then(function(userdata) {
            // 缓存起来
            self.userdata = userdata;
            // 渲染目录，并定位到目标目录
            self._renderTargetDir(userdata);
        }).done();
}

/**
 * 渲染目标目录
 * @param  {Object} userdata 用户数据
 * @return {Promise}         Promise对象
 */
Main._renderTargetDir = function(userdata) {
    var self = this;
    var tplFilePath = path.join(this.tplObj.tpldir, '**/*');
    gulp.src([tplFilePath])
        .pipe(through.obj(function(file, enc, cb){
            var thr = this;
            self._proxy(false, file.relative, file.contents, function(userFilecontents){
                file.contents = userFilecontents;
                thr.push(file);
                cb();
            })
        }))
        .pipe(replace(/{{(\w+)}}/g, function($$, $1) {
            return userdata[$1] || ('{{'+$1+'}}');
        }))
        .pipe(rename(function(path) {
            path.basename = path.basename.replace(/{{(\w+)}}/g, function($$, $1) {
                return userdata[$1] || ('{{'+$1+'}}');
            })
        }))
        // .pipe(through.obj(function(file, enc, cb){

        // }))
        .pipe(gulp.dest(self.targetDir));
}

/**
 * 执行用户对文件的操作
 * @param  {Boolean}  isAfterRender 是否在渲染之后
 * @param  {String}   relativePath 模板中的文件相对路径
 * @param  {String}   filecontents  文件中的内容
 * @param  {Function} callback     回调函数，在回调函数中会返回用户操作之后的文件内容
 */
Main._proxy = function(isAfterRender, relativePath, filecontents, callback) {
    var userproxys = null;
    var userdata = this.userdata;

    // 选择代理时机
    if(isAfterRender){
        userproxys = this.tplObj.afterRender;
    }else{
        userproxys = this.tplObj.beforeRender;
    }

    // 用户选项判空
    if(!userproxys){
        callback(filecontents);
        return;
    }

    var userdeal = userproxys[relativePath]

    // 在用户没有代理的情况下

    if(typeof userdeal !== 'function'){
        callback(filecontents);
        return;
    }

    // 将内容转化为string
    filecontents = filecontents.toString();
    userdeal(userdata, filecontents, function(userFilecontents){
        // 将内容转化为buffer;
        if(!userFilecontents){
            userFilecontents = null;
        }else{
            userFilecontents = new Buffer(userFilecontents);    
        }
        callback(userFilecontents);
    })

}
