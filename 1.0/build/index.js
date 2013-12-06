/*
combined files : 

gallery/kissy-pagination/1.0/index

*/
/**
 * @name Pagination
 * @description 翻页器KISSY组件
 * @required kissy 1.4
 * @author Miclay
 **/

KISSY.add('gallery/kissy-pagination/1.0/index',function(S,Base,Node,Event,DOM) {
  "use strict";

  var $ = Node.all;

  var attrs={
    /**
     * 属性：当前页数
     * @type {number} 传入当前显示第几页，默认值为1。
     */
    currentPage:{
      value:1
    },

    /**
     * 属性：总页数
     * @type {number} 传入页码总数，默认值为10。
     */
    totalPage:{
      value:10
    },

    /**
     * 属性：样式表
     * @type {string} 如果想引入自定义样式，可以把样式表URL配置到这里。默认为组件自带样式。
     */
    styleSheet:{
      value:'../src/style.css'
    },

    /**
     * 属性：翻页器样式class前缀
     * @type {string} 可以自定义class前缀，默认为“y-”。
     */
    clsPrefix:{
      value:'y-'
    }
  };

  /**
   * @constructor
   * @extends Base
   */
  function Pagination(selector,config) {

      this.targetBox=S.one(selector);

      Pagination.superclass.constructor.call(this, config);

      this._init();
  }

  S.extend(Pagination, Base, /** @lends Pagination.prototype*/{
    _init:function(){
      S.one('head').append('<link rel="stylesheet" href="'+this.get('styleSheet')+'">');
      this._render()
          ._event();
    },

    /*
    获取一个页码元素的html
     */
    _getItemHtml:function(pageNum,type){
      var that=this;
      type=type||'default';
      var preffix=this.get('clsPrefix');

      if(type=='current'){
        return '<span class="current p-elem">'+pageNum+'</span>';

      }else if(type=='etc'||pageNum=='etc'){
        return '<span class="etc p-elem">…</span>';

      }else if(type=='total'||pageNum=='total'){
        return '<span class="p-total p-elem">共'+that.get('totalPage')+'页</span>';

      }else if(type=='prev'||pageNum=='prev'){
        return '<a class="p-prev p-elem" href="javascript:void(0);">上一页</a>';

      }else if(type=='prev-disable'||pageNum=='prev-disable'){
        return '<span class="p-prev-disable p-elem">上一页</span>';
      
      }else if(type=='next'||pageNum=='next'){
        return '<a class="p-next p-elem" href="javascript:void(0);">下一页</a>';
      
      }else if(type=='next-disable'||pageNum=='next-disable'){
        return '<span class="p-next-disable p-elem">下一页</span>';
      
      }else if(type=='goto'||pageNum=='goto'){
        return '<span class="p-elem p-item-go">第<input class="p-ipt-go">页<a class="p-btn-go" href="javascript:void(0);">GO</a></span>';
      
      }else{
        return '<a class="p-item p-elem" href="javascript:void(0);" data-page="'+pageNum+'">'+pageNum+'</a>';
      }
    },

    /*
    渲染UI
     */
    _render:function(){
      var that=this;
      var totalPage=that.get('totalPage');
      var currentPage=that.get('currentPage');

      var html='<div class="'+that.get('clsPrefix')+'pagination">';
      
      html+=that._getItemHtml('prev');

      if(totalPage<=7){
        
        for(var i=1;i<totalPage+1;i++){
          if(currentPage==i){
            html+=that._getItemHtml(i,'current');
          }else{
            html+=that._getItemHtml(i);
          }
        }

      }else if(currentPage<=3){
        
        for(var i=1;i<currentPage;i++){
          html+=that._getItemHtml(i);
        }
        html += that._getItemHtml(currentPage,'current')
          + that._getItemHtml(currentPage+1)
          + that._getItemHtml(currentPage+2)
          + that._getItemHtml('etc')
          + that._getItemHtml(totalPage);

      }else if(currentPage>=totalPage-2){
        
        html += that._getItemHtml(1)
          + that._getItemHtml('etc')
          + that._getItemHtml(currentPage-2)
          + that._getItemHtml(currentPage-1)
          + that._getItemHtml(currentPage,'current');
        for(var i=currentPage+1;i<totalPage+1;i++){
          html+=that._getItemHtml(i);
        }

      }else{
        
        html+=that._getItemHtml(1);
        if(currentPage-2>2){
          html+=that._getItemHtml('etc');
        }
        html+=that._getItemHtml(currentPage-2)
          + that._getItemHtml(currentPage-1)
          + that._getItemHtml(currentPage,'current')
          + that._getItemHtml(currentPage+1)
          + that._getItemHtml(currentPage+2);
        if(currentPage+2<totalPage-1){
          html+=that._getItemHtml('etc');
        }
        html+=that._getItemHtml(totalPage);

      }

      html+=that._getItemHtml('next');
      html+=that._getItemHtml('total');
      html+=that._getItemHtml('goto');

      DOM.html(that.targetBox,html);

      return that;
    },

    /*
    绑定事件
     */
    _event:function(){
      var that=this;

      Event.delegate(that.targetBox,'click'
        ,'.p-item',function(e){

        var currentItem=e.currentTarget,
            targetPage=DOM.attr(currentItem, 'data-page');
        that.gotoPage(targetPage);

        e.preventDefault();
      });

      Event.delegate(that.targetBox,'click'
        ,'.p-prev',function(e){

        that.gotoPrev();

        e.preventDefault();
      });

      Event.delegate(that.targetBox,'click'
        ,'.p-next',function(e){

        that.gotoNext();

        e.preventDefault();
      });

      Event.delegate(that.targetBox,'click'
        ,'.p-first',function(e){

        that.gotoFirst();

        e.preventDefault();
      });

      Event.delegate(that.targetBox,'click'
        ,'.p-last',function(e){

        that.gotoLast();

        e.preventDefault();
      });

      var submitGo=function(){
        var targetPage=that.targetBox.one('.p-ipt-go').val();
        that.gotoPage(targetPage);
      };

      Event.delegate(that.targetBox,'click'
        ,'.p-btn-go',function(e){

        submitGo();

        e.preventDefault();
      });

      Event.delegate(that.targetBox,'keyup'
        ,'.p-ipt-go',function(e){

        /*
        回车键支持
         */
        if(e.keyCode==13){
          submitGo();
        }

        e.preventDefault();
      });

      return that;
    },

    /**
     * 销毁pagination对象
     * @return {boolean} 如果成功销毁则返回true，否则返回false。
     */
    destroy:function(){
      try{
        Event.undelegate(this.targetBox,'click');
        this.targetBox.html('');
        delete this;
      }catch(ex){
        return false;
      }
      return true;
    },

    /**
     * 获取当前所在页数
     * @return {number} 返回当前所在的页码数。
     */
    getCurrentPage:function(){
      return this.get('currentPage');
    },

    /**
     * 显示页码
     * @return {object} 返回对象本身，可以链式调用。
     */
    show:function(){
      this.targetBox.show();
      return this;
    },

    /**
     * 隐藏页码
     * @return {object} 返回对象本身，可以链式调用。
     */
    hide:function(){
      this.targetBox.show();
      return this;
    },

    /**
     * 跳转到指定页
     * @param  {number} pageNum
     * @return {object} 返回对象本身，可以链式调用。
     */
    gotoPage:function(pageNum){
      var that=this;
      var currentPage=that.get('currentPage');
      if(!pageNum||isNaN(pageNum)){
        return false;
      }
      pageNum=parseInt(pageNum);
      if(pageNum<1){
        pageNum=1;
      }
      if(pageNum>that.get('totalPage')){
        pageNum=that.get('totalPage');
      }
      if(pageNum!=currentPage){
        var currentNode=that.targetBox.one('.current');
        var targetNode=that.targetBox.one('[data-page="'+pageNum+'"]');
        that.set('currentPage',pageNum);
        that.targetBox.html('');
        that._render()
            .fire('switch',{
          targetPage:pageNum
        });
      }
      return this;
    },

    /**
     * 跳转到下一页
     * @return {object} 返回对象本身，可以链式调用。
     */
    gotoNext:function(){
      var currentPage=this.get('currentPage');
      this.gotoPage(currentPage+1);
      return this;
    },

    /**
     * 跳转到上一页
     * @return {object} 返回对象本身，可以链式调用。
     */
    gotoPrev:function(){
      var currentPage=this.get('currentPage');
      this.gotoPage(currentPage-1);
      return this;
    },

    /**
     * 跳转到第一页
     * @return {object} 返回对象本身，可以链式调用。
     */
    gotoFirst:function(){
      this.gotoPage(1);
      return this;
    },

    /**
     * 跳转到最后一页
     * @return {object} 返回对象本身，可以链式调用。
     */
    gotoLast:function(){
      this.gotoPage(this.get('totalPage'));
      return this;
    }
  }, {
    ATTRS : attrs
  });

  return Pagination;
}, {requires : ['base','node','event','dom']});
