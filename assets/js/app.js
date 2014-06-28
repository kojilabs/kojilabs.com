$(document).ready(function(){

	// @todo Use page visibility API here (if available)

	var canvasWidth = $('#home-feature').width();
	var canvasHeight = $('#home-feature').height();

  // Conception (0 - 2000 ms)
  keyFrameOne('.ball.one', 30, 30, 1100, 800);
  keyFrameOne('.ball.two', 60, 60, 1200, 300);
  keyFrameOne('.ball.three', 40, 40, 1000, 0);
  keyFrameOne('.ball.four', 80, 80, 800, 1200);

  var spacing = 60;
  var ballSize = 38;


  // Come to center (2000 - 4000 ms)
  keyFrameTwo('.ball.one', ballSize, ballSize, (canvasWidth/2)-spacing, canvasHeight/2);
  keyFrameTwo('.ball.two', ballSize, ballSize, canvasWidth/2, (canvasHeight/2)-spacing);
  keyFrameTwo('.ball.three', ballSize, ballSize, (canvasWidth/2)+spacing, canvasHeight/2);
  keyFrameTwo('.ball.four', ballSize, ballSize, canvasWidth/2, (canvasHeight/2)+spacing);


  // Spin (4000 - )
  $('.ball.one').css({ 
  	transformOrigin: (ballSize/2 + spacing) +'px ' + (ballSize/2) + 'px' 
  }).transition({ rotate: '630deg', delay: 100 }, 7000/1.5, 'linear');

  $('.ball.two').css({ 
  	transformOrigin: (ballSize/2) +'px ' + (ballSize/2 + spacing) + 'px' 
  }).transition({ rotate: '540deg', delay: 500 }, 6000/1.5, 'linear');

  $('.ball.three').css({ 
  	transformOrigin: '-' + (spacing - (ballSize/2)) +'px ' + (ballSize/2) + 'px' 
  }).transition({ rotate: '630deg', delay: 1000 }, 7000/1.5, 'linear');

  $('.ball.four').css({ 
  	transformOrigin: (ballSize/2) +'px ' + '-' + (spacing - (ballSize/2)) + 'px' 
  }).transition({ rotate: '540deg', delay: 0 }, 6000/1.5, 'linear');


  // Fall out ()
  $('.ball.four').transition({ 
  	transformOrigin: '0 0',
  	rotate: '0deg',
  	top: canvasHeight/2 - spacing + 'px'
  }, 0);

  $('.ball.four').transition({ 
		'top': '50%',
		'left': canvasWidth/2 + ballSize*1.5 + spacing + 'px'
  }, 1000, 'linear');


  $('.ball.three').transition({ 
  	transformOrigin: '0 0',
  	rotate: '0deg',
  	top: canvasHeight/2 - spacing + 'px',
  	left: '50%'
  }, 0);

  $('.ball.three').transition({ 
		'top': '50%',
		'left': canvasWidth/2 + spacing - ballSize/2 + 'px'
  }, 750, 'linear');


  $('.ball.two').transition({ 
  	transformOrigin: '0 0',
  	rotate: '0deg',
  	top: canvasHeight/2 + spacing + 'px',
  	left: '50%'
  }, 0);

  $('.ball.two').transition({ 
		'top': '50%',
		'left': canvasWidth/2 - ballSize*1.5 - spacing + 'px'
  }, 1000, 'linear');

  $('.ball.one').transition({ 
  	transformOrigin: '0 0',
  	rotate: '0deg',
  	top: canvasHeight/2 + spacing + 'px',
  	left: '50%'
  }, 0);

  $('.ball.one').transition({ 
		'top': '50%',
		'left': canvasWidth/2 - spacing + ballSize/2 + 'px'
  }, 750, 'linear');


  // Refine ()
  $('.ball.one').transition({ 
  	'height': '100px',
  	'width': '100px',
		'margin-top': '-50px',
		'margin-left': '-50px',
		delay: 750
  }, 250, 'snap');
  $('.ball.one').transition({ 'display': 'none' }, 0);

  $('.ball.two').transition({ 
  	'height': '0',
  	'width': '0',
		'margin-top': '0',
		'margin-left': '0',
		delay: 500
  }, 500, 'snap');
  $('.ball.two').transition({ 'display': 'none' }, 0);


  $('.ball.four').transition({ 
  	'top': '-=15px', 
		delay: 1500
  }, 300, 'in-out').transition({
  	'top': '120%',
  	'width': '28px',
  	'height': '28px',
		'margin-top': '0',
		'margin-left': '-14px',
  }, 1000, 'easeOutExpo').transition({ 'display': 'none' }, 0);


  // Simplify ()
  $('.ball.three').transition({ 
  	'top': '50%',
  	'left': '50%',
		delay: 1500
  }, 1000, 'linear');

  // Grow ()
  $('.ball.three').transition({ 
  	'height': '3000px',
  	'width': '3000px',
  	'margin-top': '-1500px',
		'margin-left': '-1500px',
		// 'border-radius': '0px',
		// 'background': '#811fab',
		delay: 300
  }, 2000, 'linear');

  $('.ball.three').transition({ 
  	'height': '100%',
  	'width': '100%',
  	'top': '0',
		'left': '0',
		'margin-top': '0',
		'margin-left': '0',
		'border-radius': '0'
  }, 0);

  // Koji Labs
  $('.brand').transition({
  	'opacity': 1,
  	delay: 14000
  }, 1000, 'ease');

  $('.slogan').transition({
  	'opacity': 1,
  	delay: 14500
  }, 2000, 'ease');

});


function keyFrameOne(ele, height, width, duration, delay) {
	$(ele).transition({
		height: height + 10 + 'px',
		width: height + 10 + 'px',
		'margin-top': '-' + ((height+10)/2) + 'px',
		'margin-left': '-' + ((width+10)/2) + 'px',
		delay: delay
	}, duration-300, 'in-out').transition({
		height: height + 'px',
		width: height + 'px',
		'margin-top': '-' + ((height)/2) + 'px',
		'margin-left': '-' + ((width)/2) + 'px',
		delay: 0
	}, 300, 'ease');
}

function keyFrameTwo(ele, height, width, x, y) {
	$(ele).css({ 
  	transformOrigin: '50% 50%'
  }).transition({
		height: height + 'px',
		width: height + 'px',
		'margin-top': '-' + (height/2) + 'px',
		'margin-left': '-' + (width/2) + 'px',
		'top': y + 'px',
		'left': x + 'px'
	}, 2000);
}
