var expect = require('chai').expect;
var event = require('../src/index');

var box = document.getElementById('box');
var mouse = document.getElementById('mouse');

event.on(box,'click',function (e) {
    var el = event.getTarget(e);
    describe('测试事件添加、事件触发、获取事件对象', function() {
        it('box的文本为hello', function(done) {
            expect(el.innerHTML).to.be.equal('hello');
            done();
        });
    });
});

event.trigger(box,'click');

event.on(mouse,'click',function (e) {
    console.log('获取鼠标按键值',event.getMouseButton(e) === 0)
});


