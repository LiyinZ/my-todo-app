$(document).ready(function() {
	loadToDo();
	$('.sortable').sortable();
	// toggle sort & edit ------------------------
	$(document).on('mouseenter', '#list li p', function() {
		$('.sortable').sortable('destroy');
	})
	$(document).on('mouseleave', '#list li p', function() {
		$('.sortable').sortable();
	})
	// toggle sort & edit ------------------------

	// options: &bull;  ::  * -------  colors: #A1A194 (greyish), FC6259 (confirm red), black, EBEFF0
	var li_span_p = '<li><span class="bull">&bull;</span><p contenteditable>';
	var del_arrow_li = '</p><a class="delete">x</a><div class="arrow-left"></div></li>';

	// confirm to-dos -----------------------------------------------------------------------
	$('#confirm').click(function() {
		var toAdd = $('input[name=todo]').val();
		if (toAdd != '') {
			$('#list').append(li_span_p + toAdd + del_arrow_li);
			$('input').val('');
		};
	});

	$('#confirm').mouseenter(function() {
		$(this).css('background', '#FC3C2E');})
	$('#confirm').mousedown(function() {
		$(this).css('background', '#a70000');
	})
	$('#confirm').mouseup(function() {
		$(this).css('background', '#FC3C2E');
	})
	$('#confirm').mouseleave(function() {
		$(this).css('background', '#FC6259');})

	$('#todo').keypress(function(e) {
		var code = e.which;
		if (code == 13) {
			e.preventDefault();
			var toAdd = $('input[name=todo]').val();
			if (toAdd != '') {
				$('#list').append(li_span_p + toAdd + del_arrow_li);
				$('input').val('');
			}
		}
	})
	// confirm to-dos -----------------------------------------------------------------------
	
	// complete to-dos ---------------------
	$(document).on('click', '.arrow-left', function() {
		var toAdd = $(this).parent('li').text().slice(1,-1);
		if (toAdd == '') {
			$(this).parent('li').remove();
		}
		else {
			$('.left ul').append('<li>' + toAdd + '</li>');
			$(this).parent('li').remove();
		}
	})
	$(document).on('mousedown', '.arrow-left', function() {
		$(this).css('border-right', '15px solid #ededed');
		$(this).parent('li p').css('text-decoration', 'line-through');
	})
	// complete to-dos ---------------------


	// delete to-dos ----------------------------------------
	$(document).on('click', '.delete', function() {
		var toAdd = $(this).parent('li').text().slice(1,-1);
		if (toAdd == '') {
			$(this).parent('li').remove();
		}
		else {
			$('.right ul').append('<li>' + toAdd + '</li>');
			$(this).parent('li').remove();
		}
	})
	// delete to-dos ----------------------------------------


	// empty trash ----------------------------------
	$(document).on('click', '.right h3', function() {
		$('.right ul').empty();
	});
	// empty trash ----------------------------------

	// clear to-dos ---------------------------------
	$(document).on('click', '.left h3', function() {
		$('.left ul').empty();
	})
	// clear to-dos ---------------------------------

	// undo to-dos --------------------------------
	$(document).on('click', '.left ul li, .right ul li', function() {
		var toAdd = $(this).text();
		$('#list').append(li_span_p + toAdd + del_arrow_li);
		$(this).remove();
	})
	// undo to-dos --------------------------------

	// save to local storage----------------------
	
	$(document).on('click', '#save', function() {
		var theList = document.getElementById('list');
		var comList = document.getElementById('completed');
		var traList = document.getElementById('trash');
		localStorage.setItem('todoList', theList.innerHTML);
		localStorage.setItem('completed', comList.innerHTML);
		localStorage.setItem('trash', traList.innerHTML);
	});

	function loadToDo() {
		if(localStorage.getItem('todoList')) {
			var theList = document.getElementById('list');
			var comList = document.getElementById('completed');
			var traList = document.getElementById('trash');
			theList.innerHTML = localStorage.getItem('todoList');
			comList.innerHTML = localStorage.getItem('completed');
			traList.innerHTML = localStorage.getItem('trash');
		}
	};
	
	$(document).on('click', '#clear', function() {
		if (confirm('Are you sure to delete ALL permanently?')) {
			$('#completed').empty();
			$('#trash').empty();
			$('#list').empty();
			localStorage.clear();
		};
	});
	// save to local storage----------------------

	// effects ------------------------
	$('.left').fadeTo(0, .3);
	$('.left').mouseenter(function() {
        $(this).fadeTo(100, 1);
    })
	$('.left').mouseleave(function() {
        $(this).fadeTo(100, .3);
    })

    $('.right').fadeTo(0, .1);
	$('.right').mouseenter(function() {
        $(this).fadeTo(100, 1);
    })
	$('.right').mouseleave(function() {
        $(this).fadeTo(100, .1);
    })

    $('h1').mouseenter(function() {
        $(this).fadeTo(100, .70);
    })
    $('h1').mouseleave(function() {
        $(this).fadeTo(100, 1);
    })
    // effects ------------------------
});
