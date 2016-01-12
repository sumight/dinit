/**
 * 配置文件
 * @module config
 * @author yourname
 */

module.exports = {
    // 定义用户的输入
    userInputs:[{
        name:'mainscript',
        tips:'js主文件',
        default:'index'
    },{
        name:'title',
        tips:'主文件标题',
        default:'title'
    }],
    /**
     * 在模板渲染前对模板进行处理
     *     key 文件渲染前的文件路径
     *     value 为处理函数
     * @type {Object}
     */
    beforeRender:{
        'scripts/{{mainscript}}.js':function(userdata, contents, next){
            // 获取用户输入信息
            console.log(userdata);
            // 添加额外用户信息
            userdata.author = 'sumight';
            // 修改文件的内容
            contents = "/* this is the title of file */" + contents;
            // 将文件内容传递下去进行渲染
            next(contents);

            /**
             * //如果在一定条件下不想让模板文件输出
             * next(null);
             */
        }
    },
    /**
     * 在模板渲染后对模板进行处理
     *     key 文件渲染后的文件路径
     *     value 为处理函数
     * @type {Object}
     */
    // 在模板渲染后对模板进行处理
    afterRender:{
        'styles/index.css':function(userdata, contents, next){
            next(contents);    
        }
    }
}