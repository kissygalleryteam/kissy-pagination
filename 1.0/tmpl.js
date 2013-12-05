'<div class="ui-page-num"> \
	<% if(page.total<=10){ %> \
		<% for(var i=1;i<page.total+1;i++){ %> \
		<a href="javascript:void(0);" <%= i==page.current?"class=on":"" %>><%= i %></a> \
		<% } %> \
	<% }else{ %> \
		<% if(page.current<=3){ %> \
			<% for(var i=1;i<page.current;i++){ %> \
			<a href="javascript:void(0);"><%= i %></a> \
			<% } %> \
			<a href="javascript:void(0);" class="on"><%= page.current %></a> \
			<a href="javascript:void(0);"><%= page.current+1 %></a> \
			<a href="javascript:void(0);"><%= page.current+2 %></a> \
			<span class="etc">…</span> \
			<a href="javascript:void(0);"><%= page.total %></a> \
		<% }else if(page.current>=page.total-2){ %> \
			<a href="javascript:void(0);">1</a> \
			<span class="etc">…</span> \
			<a href="javascript:void(0);"><%= page.current-2 %></a> \
			<a href="javascript:void(0);"><%= page.current-1 %></a> \
			<a href="javascript:void(0);" class="on"><%= page.current %></a> \
			<% for(var i=page.current+1;i<page.total+1;i++){ %> \
			<a href="javascript:void(0);"><%= i %></a> \
			<% } %> \
		<% }else{ %> \
			<a href="javascript:void(0);">1</a> \
			<% if(page.current-2>2){ %> \
			<span class="etc">…</span> \
			<% } %> \
			<a href="javascript:void(0);"><%= page.current-2 %></a> \
			<a href="javascript:void(0);"><%= page.current-1 %></a> \
			<a href="javascript:void(0);" class="on"><%= page.current %></a> \
			<a href="javascript:void(0);"><%= page.current+1 %></a> \
			<a href="javascript:void(0);"><%= page.current+2 %></a> \
			<% if(page.current+2<page.total-1){ %> \
			<span class="etc">…</span> \
			<% } %> \
			<a href="javascript:void(0);"><%= page.total %></a> \
		<% } %> \
	<% } %> \
	<button class="ui-btn-grey btn-prev <%= page.current<=1?"btn-off":"" %> J_pagePrev">&lt;上一页</button><button \
		class="ui-btn-grey btn-next <%= page.current>=page.total?"btn-off":"" %> J_pageNext">下一页&gt;</button> \
	跳转至<input type="text" class="ui-ipt-txt ipt-go-page J_iptPageNavTo">页 \
</div>';