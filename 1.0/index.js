/**
 * @name Pagination
 * @author Miclay
 **/

KISSY.add(function(S,Base,Node,Event,XTemplate,DOM) {
  "use strict";

  var $ = Node.all;

  var attrs={
    currentPage:{
      value:1
    },
    totalPage:{
      value:10
    }
  };

  /**
   * @constructor
   * @extends Base
   */
  function Pagination(config) {
      var self = this;
      
      Pagination.superclass.constructor.call(self, config);
  }

  S.extend(Pagination, Base, /** @lends Pagination.prototype*/{
    _init:function(){
      this._render();
    },
    _render:function(){
      alert(1);
    },
    show:function(){},
    hide:function(){},
    next:function(){},
    prev:function(){},
    first:function(){},
    last:function(){}
  }, {
    ATTRS : attrs
  });

  return Pagination;
}, {requires : ['base','node','event','xtemplate','dom']});