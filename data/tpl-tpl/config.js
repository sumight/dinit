module.exports = {
    userInputs:[],
    beforeRender:{
        'template/{{name}}.txt':function(userdata, contents, next){
            userdata.name = '{{name}}'
            next(contents);
        }
    }
}