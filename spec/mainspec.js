// xdescribe('template', function() {
//     var template = require('../lib/template.js');

//     template.init({});

//     it('_getTplModulePathByName good', function() {
//         expect(template._getTplModulePathByName('test')).toEqual('/Users/xjc/demo/directory-tool/directory-template-test');

//     });

//     it('_getTplModuleDirByName bad', function() {

//         expect(template._getTplModulePathByName('abc')).toEqual(null);
//     });

//     it('verify bad', function() {
//         expect(template._verifyConfig({
//                 userInputs: [{
//                     tips: '请输入插件名称',
//                     default: 'yourplugname'
//                 }, {
//                     name: 'author',
//                     tips: '请输入作者名称',
//                     default: 'yourname'
//                 }],
//                 proxy: function(next) {

//                 }
//             }))
//             .toEqual(false);
//         expect(template._verifyConfig({
//                 userInputs: {},
//                 proxy: function(next) {

//                 }
//             }))
//             .toEqual(false);
//         expect(template._verifyConfig({
//                 userInputs: [{
//                     name: 'plugname',
//                     tips: '请输入插件名称',
//                     default: 'yourplugname'
//                 }, {
//                     name: 'author',
//                     tips: '请输入作者名称',
//                     default: 'yourname'
//                 }],
//                 proxy: []
//             }))
//             .toEqual(false);
//     })

//     it('verify good', function() {
//         expect(template._verifyConfig({
//                 userInputs: [{
//                     name: 'plugname',
//                     tips: '请输入插件名称',
//                     default: 'yourplugname'
//                 }, {
//                     name: 'author',
//                     tips: '请输入作者名称',
//                     default: 'yourname'
//                 }],
//                 proxy: function(next) {}
//             }))
//             .toEqual(true);
//         expect(template._verifyConfig({
//                 userInputs: [{
//                     name: 'plugname',
//                     tips: '请输入插件名称',
//                     default: 'yourplugname'
//                 }, {
//                     name: 'author',
//                     tips: '请输入作者名称',
//                     default: 'yourname'
//                 }],
//                 proxy: null
//             }))
//             .toEqual(true);
//     })

//     xit('getTplObj', function() {
//         expect(template.getTplObj('/Users/xjc/demo/directory-tool/directory-template-test'))
//             .toEqual({
//                 name: 'test',
//                 userInput: [{
//                     name: 'plugname',
//                     tips: '请输入插件名称',
//                     default: 'yourplugname'
//                 }, {
//                     name: 'author',
//                     tips: '请输入作者名称',
//                     default: 'yourname'
//                 }],
//                 proxy: function(next) {
//                     console.log(this.file);
//                     console.log(this.userinput);
//                     next();
//                     console.log(this.file);
//                     console.log(this.userinput);
//                 },
//                 tpldir: '/Users/xjc/demo/directory-tool/directory-template-test/template'
//             })
//     })

//     xit('getTpl', function() {
//         var t = template.getTplByName('test');
//         console.log(t);
//     })
//     it('getTpl get null', function() {
//         var t = template.getTplByName('tesxt');
//         expect(t).toBe(null);
//     })

// })

describe('userinput', function() {
    var uinput = require('../lib/user-input');

    uinput.init({
        inputCfgs: [{
            name: 'plugname',
            tips: '请输入插件名称',
            default: 'yourplugname'
        }, {
            name: 'author',
            tips: '请输入作者名称',
            default: 'yourname'
        }]
    })

    it('getuserin', function() {
        uinput.getUserInputs().then(function(userdata) {
            console.log('userdata', userdata)
        })
    })


})

