$(document).ready(function(){

  
  $('.play-button a').click(function(e) {
    e.preventDefault();
    runHomeAnimation();
  });

  ////////////////////////////////
  // Navigation
  ////////////////////////////////

  $('.nav-toggle a').click(function(e) {
    e.preventDefault();

    if ($('header nav').is(':visible')) {
      $('header nav').slideUp();
      $('.nav-toggle a').text('Menu');
      $('.nav-toggle a').removeClass('active');
    } else {
      $('header nav').slideDown();
      $('.nav-toggle a').text('Hide Menu');
      $('.nav-toggle a').addClass('active');
    }
  });

  // Load the blog feed if this is the home page
  if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
    loadFeed();
  }

  ////////////////////////////////
  // Forms
  ////////////////////////////////

  $('.tooltip').click(function(e) {
    e.preventDefault();
    
    var tipID = $(this).attr('href');

    if ($(tipID).is(':visible')) {
      $(tipID).slideUp();
    } else {
      $(tipID).slideDown();
    }
  });


  $('#contact-form').submit(function(e) {
    e.preventDefault();

    var form = $('#contact-form');

    // Only do this it there is a form.
    var formMessages = $('.form-messages');
    var submitButton = $('#submit-button');
    var originalSubmitText = $(submitButton).text();

    // Check that all the fields have been completed.
    if ($('#name').val() !== '' && 
        $('#email').val() !== '' &&
        $('#company').val() !== '' &&
        $('#phone').val() !== '' &&
        $('#details').val() !== '' &&
        $('#budget').val() !== '' &&
        $('#timeframe').val() !== '') {

      var formData = $(form).serialize();

      $(submitButton).text('Sending...');

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Reset the submit button.
        $(submitButton).text(originalSubmitText);

        // Clear the form.
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('#company').val('');
        $('#budget').val('');
        $('#timeframe').val('');
        $('#website').val('');
        $('#details').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Reset the submit button.
        $(submitButton).text(originalSubmitText);

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your request could not be completed.');
        }
      });

    } else {
      $(formMessages).addClass('error');
      $(formMessages).text('Oops! Looks like you missed out some important fields.');
    }
  });
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

function runHomeAnimation() {
  $('#home-feature').css('background', '#FFFFFF');
  $('.brand, .slogan, .home-buttons, .play-button').css('opacity', '0');
  $('.brand').css('margin-top', '2.95em');
  $('.ball').attr('style', '');

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
    delay: 400
  }, 550, 'cubic-bezier(.37,.13,.96,.25)');
  $('.ball.one').transition({ 'display': 'none' }, 0);

  $('.ball.two').transition({ 
    'height': '0',
    'width': '0',
    'margin-top': '0',
    'margin-left': '0',
    delay: 500
  }, 400, 'snap');
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

  if ($(window).width() < 860) {
    $('.brand').transition({
      'margin-top': '2em',
      delay: 500
    }, 1000, 'ease');
  } else {
    $('.brand').transition({
      'margin-top': '2.65em',
      delay: 500
    }, 1000, 'ease');
  }

  $('.home-buttons').transition({
    'opacity': 1,
    delay: 16250
  }, 1000, 'ease');

  $('.play-button').transition({
    'opacity': 1,
    delay: 17250
  }, 1000, 'ease');
}

function ord(d) {
  if(d>3 && d<21) return 'th';

  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
} 

function month(i) {
  switch (i) {
    case 0:  return "January";
    case 1:  return "February";
    case 2:  return "March";
    case 3:  return "April";
    case 4:  return "May";
    case 5:  return "June";
    case 6:  return "July";
    case 7:  return "August";
    case 8:  return "September";
    case 9:  return "October";
    case 10:  return "November";
    case 11:  return "December";
  }
}


function loadFeed() {
  var feedUrl = "http://blog.kojilabs.com/feed";

  $.ajax({
    url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=?&q=' + encodeURIComponent(feedUrl),
    dataType : 'json',
    success  : function (data) {
      if (data.responseData.feed && data.responseData.feed.entries) {
        $.each(data.responseData.feed.entries, function (i, e) {
          var date = new Date(e.publishedDate);

          if (i == 0) {
            var eleClass = 'no-border';
          } else {
            var eleClass = '';
          }

          var postHtml = '<article class="post home four columns ' + eleClass + '"><a href="' + e.link + '" target="_blank"><h3>' + e.title + '</h3><div class="post-info"><img src="/assets/img/matt-west.jpg" alt="Matt West" width="24" height="24"><div class="post-author">Matt West</div><div class="post-date"> wrote this on ' + date.getDay() + '<sup>' + ord(date.getDay()) + '</sup> ' + month(date.getMonth()) + '</div></div></a></article>';

          $('#home-blog').append(postHtml);
        });
      }
    }
  });
}
