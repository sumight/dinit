module.exports = {
    userInputs:[{
        name:'name',
        tips:'名字',
        default:'defaultname'
    }],
    beforeRender:{
        '{{name}}.text':function(userdata, contents, next){
            console.log(userdata, contents);
            next(contents);    
        }
    },
    afterRender:{
        'xxx.txt':function(userdata, contents, next){
            console.log(userdata, contents);
            next(contents);    
        }
    }
}