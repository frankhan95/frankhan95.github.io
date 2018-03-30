$(document).ready(function() {
	//$("#portfolio_container").delay(1000).slideDown(1000);
	var isTransition = false;
	var minWidth = 600;
	$transitionTime = 1000;
	$activeContent = $("#landing_container");
	$("#close_nav").on('click', function() {
		closeNavBar();
	});
	$("#open_nav").on('click', function() {
		$("#left_container").delay($transitionTime).css("width", "200px");
		$("#close_nav").delay($transitionTime).css("display", "block");
	});
	startLandingPage();
	$('#initialize').delay(1500).fadeTo(500, 0, function() {
		$('#initialize').css("display", "none");

	})
	$("#left_container").delay(1500).css("display", "block");
	$("#right_container").css("display", "block");
	

	function closeNavBar() {
		$("#left_container").css("width", "0px");
		$("#close_nav").delay($transitionTime).css("display", "none");
	}

	function startLandingPage() {
		$("#greet").delay($transitionTime).fadeTo(0, 0.0);
		$activeContent = $("#landing_container").stop().slideDown(100, function(){isTransition = false});
		$("#greet").delay($transitionTime).stop().fadeTo(1000, 1.0);
	}

	$("#navi_home").on('click', function() {
		if($activeContent.attr('id') == $("#landing_container").attr('id') || isTransition) {return;}
		hideActive();
		$("#greet").delay($transitionTime).fadeTo(0, 0.0);
		$activeContent = $("#landing_container").stop().delay($transitionTime).slideDown(1000, function(){isTransition = false});
		$("#greet").delay($transitionTime).stop().fadeTo(1000, 1.0);

	});

	$("#navi_skills").on('click', function() {
		if($activeContent.attr('id') == $("#skill_container").attr('id') || isTransition) {return;}
		hideActive();
		$activeContent = $("#skill_container").stop().delay($transitionTime).slideDown($transitionTime, function(){isTransition = false});
	});

	$("#navi_portfolio").on('click', function() {
		if($activeContent.attr('id') == $("#portfolio_container").attr('id') || isTransition) {return;}
		hideActive();
		$activeContent = $("#portfolio_container").stop().delay($transitionTime).slideDown($transitionTime, function(){isTransition = false});
	});

	$("#navi_project").on('click', function() {
		if($activeContent.attr('id') == $("#project_container").attr('id') || isTransition) {return;}
		hideActive();
		$activeContent = $("#project_container").stop().delay($transitionTime).slideDown($transitionTime, function(){isTransition = false});
	});

	$("#navi_blog").on('click', function() {
		if($activeContent.attr('id') == $("#blog_container").attr('id') || isTransition) {return;}
		hideActive();
		$activeContent = $("#blog_container").stop().delay($transitionTime).slideDown($transitionTime, function(){isTransition = false});
	});

	function hideActive(time) {
		if($activeContent != null){
			isTransition = true;
			$("#greet").fadeTo(0, 0.0);
			$activeContent.stop().slideUp($transitionTime);
			$activeContent.removeClass('activeContent');
		}
		if($(window).width() < 600){
			closeNavBar();
		}
	}

});