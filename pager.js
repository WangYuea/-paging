function Page(opt){
	console.log(opt)
		var set = $.extend({num:Math.ceil(Number(opt.total)/Number(opt.pageNumber)),startnum:1,pageNumber:10,elem:null,selectelem:null,callback:null},opt||{});
		if(set.startnum>set.num||set.startnum<1){
			set.startnum = 1;
		}
		console.log(set.num)
		var n = 0,htm = '';
		var clickpages = {
			total:set.total,
			elem:set.elem,
			selectElem:set.selectelem,
			num:set.num,
			pageNumb:set.pageNumber,
			callback:set.callback,
			init:function(){
				this.elem.next('div.pageJump').children('.button').unbind('click')
				this.JumpPages();
				this.elem.children('li').click(function () {
					var txt = $(this).children('a').text();
					var page = '', ele = null;
					var page1 = parseInt(clickpages.elem.children('li.active').attr('page'));
					// console.log( clickpages.num)
					// console.log(txt)
					console.log(page1)
					if (isNaN(parseInt(txt))) {
						switch (txt) {
							case '下一页':
								if (page1 == clickpages.num) {
									return;
								}
                                clickpages.newPages('next', page1+1);
                                ele = clickpages.elem.children('li.active');
								if (page1 >= (clickpages.num - 2) || clickpages.num <= 6 || page1 < 3) {
									// ele = clickpages.elem.children('li.active').next();
									clickpages.newPages('next', page1+1);
									ele = clickpages.elem.children('li.active');
								} else {
									clickpages.newPages('next', page1 + 1);
									ele = clickpages.elem.children('li.active');
								}
								break;
							case '上一页':
								if (page1 == '1') {
									return;
								}
								if (page1 >= (clickpages.num - 1) || page1 <= 3 || clickpages.num <= 6) {
									clickpages.newPages('prev', page1 - 1);
									ele = clickpages.elem.children('li.active');
									// ele = clickpages.elem.children('li.active').prev();
								} else {
									clickpages.newPages('prev', page1 - 1);
									ele = clickpages.elem.children('li.active');
								}
								break;
							case '首页':
								if (page1 == '1') {
									return;
								}
								if (clickpages.num > 6) {
									clickpages.newPages('首页', 1);
								}
								ele = clickpages.elem.children('li[page=1]');
								break;
							case '尾页':
								if (page1 == clickpages.num) {
									return;
								}
								if (clickpages.num > 6) {
									clickpages.newPages('尾页', clickpages.num);
								}
								ele = clickpages.elem.children('li[page=' + clickpages.num + ']');
								break;
							case '...':
								return;
						}
					} else {
						if ((parseInt(txt) >= (clickpages.num - 3) || parseInt(txt) <= 3) && clickpages.num > 6) {
							clickpages.newPages('jump', parseInt(txt));
						}
						ele = $(this);
					}
					page = clickpages.actPages(ele);
					if (page != '' && page != page1) {
						if (clickpages.callback){
							clickpages.callback(clickpages,page);
						}
					}
				});
			},
			//active
			actPages:function (ele) {
				ele.addClass('active').siblings().removeClass('active');
				return clickpages.elem.children('li.active').text();
			},
			JumpPages:function () {
				console.log(123,'===')
				// console.log(this,'1------')
				this.elem.nextAll('div.pageJump').children('.button').click(function(){
					var i = parseInt($(this).siblings('input').val());
					if(isNaN(i)||(i<=0)||i>clickpages.num){
						return;
					}else if(clickpages.num>6){
						clickpages.newPages('jump',i);
					}else{
						var ele = clickpages.elem.children('li[page='+i+']');
						clickpages.actPages(ele);
						if (clickpages.callback){
							clickpages.callback(clickpages,i);
						}
						return;
					}

					if (clickpages.callback){
						clickpages.callback(clickpages,i);
					}
				})
			},

			//newpages
			newPages:function (type, i) {
				var html = "",htmlLeft="",htmlRight="",htmlC="";
				var HL = '<li><a>...</a></li>';

				if(i==1){
					// html = '<li><a>上一页</a></li>'
					html = ''
				}else{
					html = '<li><a  aria-label="Previous">首页</a></li>\
					<li><a>上一页</a></li>'
				}
				// html = '<li><a  aria-label="Previous">首页</a></li>\
				// 	<li><a>上一页</a></li>'
				for (var n = 0;n<3;n++){
					htmlC += '<li '+((n-1)==0?'class="active"':'')+' page="'+(i+n-1)+'"><a>'+(i+n-1)+'</a></li>';
					htmlLeft += '<li '+((n+2)==i?'class="active"':'')+' page="'+(n+2)+'"><a>'+(n+2)+'</a></li>';
					htmlRight += '<li '+((set.num+n-3)==i?'class="active"':'')+' page="'+(set.num+n-3)+'"><a>'+(set.num+n-3)+'</a></li>';
				}

				switch (type) {
					case "next":
						if(i<=4){
							html+='';
							console.log(html)
							html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}else if(i>=(set.num-3)){
							html+='';
							html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}else{
							html+='';
							html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}
						break;
					case "prev":
						if(i<=4){
							html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}else if(i>=(set.num-3)){
							html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}else{
							html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}
						break;
					case "首页" :
						html+='<li class="active" page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						break;
					case "尾页" :
						html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li class="active" page="'+set.num+'"><a>'+set.num+'</a></li>';
						break;
					case "jump" :
						if(i<=4){
							if(i==1){
								html+='<li class="active" page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
							}else{
								html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
							}
						}else if((i>=set.num-3)&&(set.num>=7)){
							if(i==set.num){
								html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li class="active" page="'+set.num+'"><a>'+set.num+'</a></li>';
							}else{
								html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
							}
						}else{
							html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
						}
				}
				if(i==clickpages.num){
					// html += '<li><a>下一页</a></li>';
					html += '';
				}else{
					html += '<li><a>下一页</a></li>\
					<li><a  aria-label="Next">尾页</a></li>';
				}
				// html += '<li><a>下一页</a></li>\
				// 	<li><a  aria-label="Next">尾页</a></li>';
				if (this.num > 5 || this.num < 3) {
					set.elem.html(html);
					clickpages.init({num:set.num,elem:set.elem,callback:set.callback});
				}
			}
		}
		if(set.num<=1){
			// $(".pagination").html('');
			$(".page-box").html('');
			return;
		}else if(parseInt(set.num)<=6){
			n = parseInt(set.num);
			var html='<li><a  aria-label="Previous">首页</a></li>\
					<li><a>上一页</a></li>';
			for(var i=1;i<=n;i++){
				if(i==set.startnum){
					html+='<li class="active" page="'+i+'"><a>'+i+'</a></li>';
				}else{
					html+='<li page="'+i+'"><a>'+i+'</a></li>';
				}
			}
			html +='<li><a>下一页</a></li>\
					<li><a  aria-label="Next">尾页</a></li>';
			set.elem.html(html);
			clickpages.init();
		}else{
			clickpages.newPages("jump",set.startnum)
		}
    set.selectelem.change(function(){
        // console.log('aaa=====')
        clickpages.pageNumb=$(".selector option:selected").val()
        console.log(clickpages.pageNumb,'========')
        set.num=Math.ceil(parseInt(clickpages.total)/parseInt(clickpages.pageNumb)),
            console.log(set.num)
        clickpages.num=set.num
        if(set.num<=1){
            $(".pagination").html('');
            return;
        }else if(parseInt(set.num)<=6){
            n = parseInt(set.num);
            var html='<li><a  aria-label="Previous">首页</a></li>\
					<li><a>上一页</a></li>';
            for(var i=1;i<=n;i++){
                if(i==set.startnum){
                    html+='<li class="active" page="'+i+'"><a>'+i+'</a></li>';
                }else{
                    html+='<li page="'+i+'"><a>'+i+'</a></li>';
                }
            }
            html +='<li><a>下一页</a></li>\
					<li><a  aria-label="Next">尾页</a></li>';
            set.elem.html(html);
            clickpages.init();
        }else{
            clickpages.newPages("jump",set.startnum)
        }
        set.callback(clickpages,set.startnum)
    })
}
