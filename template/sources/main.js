// JavaScript Document
	$(function(){
		
		//submenu
		$(function(){
			$('.dropDown').hover(function(){
				if($(this).parent().hasClass('nav')) return false;
				$(this).find('.submenu').stop(false,true).slideDown(200);
			},function(){
				if($(this).parent().hasClass('nav')) return false;
				$(this).find('.submenu').stop(false,true).slideUp(200);
			});
		});

		$('.submenu').find('dt').hover(function(){
			$(this).find('.subitem').stop(false,true).fadeIn(200);
		},function(){
			$(this).find('.subitem').stop(false,true).fadeOut(200);
		});

		//mobile menu
		var $m_menu = $('ul.menu').clone();
		var $top_m_menu = "" ;//$('.topLink').find('.right_box').children('a').not('.exclude').clone();
				
		$m_menu.insertAfter('.m_menu .hideBox p.sp_menu').removeClass().addClass('nav').find('b').remove().end().append($top_m_menu).children('a').wrap('<li/>').end().find('li.dropDown').each(function(){
			$(this).children('a').removeClass().append('<i class="fas fa-angle-down" />').attr('href','');
		});
				
		$('.m_menu').find('a.main').click(function(){
			if(!$(this).parents('.m_menu').hasClass('active')){
				$(this).parents('.m_menu').addClass('active');
				$(this).find('i').addClass('fa-times').removeClass('fa-reorder');
				$('.m_menu').find('.mask').fadeIn(100);
				$('.m_menu').find('.hideBox').fadeIn(100);
				$('body').css('overflow','hidden');
				$('.m_menu').find('.mask').click(function(){/*點空白處收起menu*/
					$('.m_menu').removeClass('active');
					$('.m_menu').find('.hideBox').fadeOut();
					$('.m_menu').find('.mask').fadeOut();
				});
			}else{
				$(this).parents('.m_menu').removeClass('active');
				$(this).find('i').addClass('fa-reorder').removeClass('fa-times');
				$('.m_menu').find('.mask').fadeOut();
				$('.m_menu').find('.hideBox').fadeOut();
				$('body').css('overflow','auto');
			}//end if hasClass
						
			return false;
		});
		
		$('.m_menu').find('li.dropDown').children('a').click(function(){
			$(this).siblings().slideToggle();
			return false;
		});
		
		$('.m_menu').find('dt').children('a').click(function(){
			$(this).siblings().slideToggle();
			return false;
		});

		// clone & dropDownBox
		$('.side_menu').each(function(){
			var currentText = $(this).find('.current').last().text() || $(this).find('li:eq(0) a').text();
			$(this).after($(this).clone().removeAttr('class').addClass('dropDownBox'));
			$('.dropDownBox').prepend('<div>' + currentText + '</div>');
		});
		$('.classBox').each(function(){
			var currentText = $(this).find('.current').last().text() || $(this).find('li:eq(0) a').text();
			$(this).after($(this).clone().removeAttr('class').addClass('dropDownBox'));
			$('.dropDownBox .class-link').removeClass('class-link');
			$('.dropDownBox').prepend('<div>' + currentText + '</div>');
		});
		$('.dropDownBox li, .side_menu li, .submenu li').each(function(i){
			if($(this).has('dl').length > 0) {
				$(this).children('a').addClass('hasItems');
			} else {
				return i;
			}
		});

		// dropDownBox
		$('.dropDownBox').on('click', function(){

			if($(this).hasClass('disable')) {
				return false;
			}
			if ($('.dropDownBox').hasClass('open') && !$(this).hasClass('open')) {
				$('.dropDownBox').removeClass('open');
				$(this).addClass('open');
			} else if ($(this).hasClass('open') == true) {
				$(this).removeClass('open');
			} else {
				$(this).addClass('open');
			}

		});

		$('.dropDownBox a').not('.hasItems').on('click', function(){

			var text = $(this).text(),
				box = $(this).parents('.dropDownBox').children('div');
				// href = $(this).data('href');
			if ($(this).is('[data-disable]') == true || $(this).hasClass('current')) {
				return false;
			} else {
				$(this).addClass('current').siblings().removeClass('current');
				box.text(text);
			}

		});

		$('.dropDownBox .hasItems').each(function(){
			if($(this).siblings('dl').has('.current').length > 0) {
				$(this).addClass('open');
			}
			// .parents('.submenu').slideDown().siblings('a').addClass('open')
		});

		$('.dropDownBox .hasItems, .m_menu .hasItems').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hasClass('open') ? $(this).removeClass('open') : $(this).addClass('open');
		});

		$('html').on('click', function(e){
			
			var $target = $(e.target);
			if($target.parents('.dropDownBox').hasClass('open') || $target.hasClass('dropDownBox')) {
				return false;
			} else {
				$('.dropDownBox').removeClass('open');
			}

		});
	
	});
	
