/*
combined files : 

kg/kissy-pagination/2.0.0/mini

*/
/**
 * @fileoverview 
 * @author 木中<jilei.liu@alibaba-inc.com>
 * @module kissy-pagination
 **/
KISSY.add('kg/kissy-pagination/2.0.0/mini',function (S, Node, Lang) {
    var $ = Node.all,
        EventTarget = S.Event.Target;
    /**
     *
     * @class Pagination
     * @constructor
     */
    function Pagination(config) {

    }

    S.augment(Pagination, EventTarget, /** @lends Pagination.prototype*/{

    });

    return Pagination;

}, {requires:['node', 'lang']});




