var jsonPath = require('jsonpath');
var Paginator = require('paginator');
var fs = require('fs');

class JSONQueryEngine{
    constructor(object){
        this.setObject(object);
    }

    convertObject(){
        if(typeof this.object === 'string'){
            try {
                this.object = JSON.parse(this.object);
            } catch (e) {
                console.log(e);
            }
        }
    }

    setObject(object){
        this.object = object;
        this.convertObject();
    }

    file(path){
        try {
            this.object = JSON.parse(fs.readFileSync(path,'utf8'));
        } catch (e) {
            return e;
        }
    }

    save(path){
        try {
            fs.writeFileSync(path,JSON.stringify(this.object));
        } catch (e) {
            return e;
        }
    }

    execute(query,limit,offset=0){
        this.convertObject();
        if(!Array.isArray(this.object)) this.object = [this.object];
        var result = [];

        for(var i=0, l=this.object.length;i<l;i++) result = result.concat(jsonPath.query(this.object[i], query));
        var length = result.length;
        var current_page;

        if(!limit){
            limit = length;
            current_page = 1
        }else current_page = Math.ceil(offset / limit) + 1;

        result = result.slice(offset,offset+limit);

        var paginator = new Paginator(limit,offset);
        var info = paginator.build(length, current_page);
        info.per_page = limit;
        info.found_results = result.length;
        delete info['results'];
        if(info.previous_page < 0) info.previous_page = 0;

        return new JSONQueryResult(result,info);
    }
}

class JSONQueryResult extends JSONQueryEngine{
    constructor(result,info){
        super();
        this.object = result;
        this.info = info;
    }

    get(index){
        if(index < 0) index = 0;
        else if(index >= this.info.found_results) index = this.info.found_results - 1;

        return this.object[index];
    }

    all(){
        return this.object;
    }

    first(){
        return this.object[0];
    }

    last(){
        return this.object[this.info.found_results - 1];
    }

    each(callback){
        var next;
        for(var i=0, l=this.info.found_results;i<l;i++){
            next = callback(this.object[i], i);
            if(next === false) break;
        }
    }

    modify(callback){
        var item;
        for(var i=0, l=this.info.found_results;i<l;i++){
            item = callback(this.object[i], i);
            this.object[i] = item;
        }

        return this.object;
    }
}

module.exports = function(object){
    return new JSONQueryEngine(object);
};
