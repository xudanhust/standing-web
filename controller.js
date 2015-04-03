var mongoose = require('mongoose');
var moment = require('moment');

var dateFormat = 'YYYY-MM-DD HH:mm:ss';
var Person = mongoose.model('person');

// 首页
exports.index = function(req, res) {
    var dateLimit = false,
        start,
        end;
    if(req.body.start && req.body.end && (new Date(req.body.start)) <= (new Date(req.body.end))){
        dateLimit = true;
        start = new Date(req.body.start);
        end = new Date(req.body.end);
    }
    Person.find().exec(function(err, persons){
        for(var i in persons){
            var person = persons[i],
                len = person.point.length,
                j = 0,
                scoreFinished = 0,
                scoreGoing = 0;

            if(person.point.length){
                for(; j < len; j++){
                    var p = person.point[j],
                        d = new Date(p.updateTime);

                    if(dateLimit && (d < start || d > end)){
                        continue;
                    }

                    if(p.status === '已完成'){
                        scoreFinished += p.score;
                    }else if(p.status === '进行中'){
                        scoreGoing += p.score;
                    }
                }
            }
            person.scoreFinished = scoreFinished;
            person.scoreGoing = scoreGoing;
        }
        res.render('index', {
            title: '首页',
            persons: persons,
            dateLimit: dateLimit,
            start: req.body.start,
            end: req.body.end
        });
    });

};

// 添加人员
exports.addPerson = function(req, res) {
    new Person({
        name: req.body.name
    }).save(function (err){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
};

// 删除人员
exports.deletePerson = function(req, res){
    Person.find({
        name: req.params.name
    }).exec(function(err, person){
        person[0].remove(function(err){
            res.redirect('/');
        });
    });
}

// 添加积分记录
exports.addPoint = function(req, res){
    Person.find({
        name: req.body.person
    }).exec(function(err, person){
        person = person[0];
        person.point.push({
            action: req.body.action,
            score: req.body.score,
            status: req.body.status,
            updateTime: moment().format(dateFormat)
        });
        person.save(function(err){
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
    });
};

// 查看人员积分详情
exports.viewPerson = function(req, res){
    Person.find({
        name: req.params.name
    }).exec(function(err, person){
        person = person[0];
        res.render('view-person', {
            title: person.name + '的积分详情',
            point: person.point,
            person: person
        });
    });
};

// 删除一条积分记录
exports.deletePoint = function(req, res){
    var name = req.params.name,
        id = req.params.id;

    Person.find({
        name: name
    }).exec(function(err, person){
        person = person[0];
        person.point.id(id).remove();
        person.save(function(err){
            res.redirect('/viewPerson/' + name);
        });
    })
};

// 编辑一条积分记录
exports.editPoint = function(req, res){
    var name = req.params.name,
        id = req.params.id;

    Person.find({
        name: name
    }).exec(function(err, person){
        person = person[0];
        res.render('edit-point', {
            title: '编辑积分记录',
            point: person.point.id(id),
            person: person
        });
    })
};

// 更新积分记录
exports.updatePoint = function(req, res){
    Person.find({
        name: req.body.person
    }).exec(function(err, person){
        person = person[0];
        var point = person.point.id(req.body.id);
        point.action = req.body.action;
        point.score = req.body.score;
        point.status = req.body.status;
        point.updateTime = moment().format(dateFormat);
        person.save(function(err){
            if(err){
                console.log(err);
            }
            res.redirect('/viewPerson/' + req.body.person);
        });
    });
};
