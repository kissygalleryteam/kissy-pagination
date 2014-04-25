KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('kissy-pagination', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/kissy-pagination/1.1/']});