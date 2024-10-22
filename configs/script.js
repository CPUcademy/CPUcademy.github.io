const englishText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex.";
const polishText = "Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim.";
const englishTextE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex. Fusce feugiat sapien ligula, sit amet varius tortor aliquet sed. Donec rhoncus ante nec nibh fringilla sodales. Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim. Vivamus consequat urna at magna elementum, vel vulputate turpis laoreet.";
const polishTextE = "Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim. Vivamus consequat urna at magna elementum, vel vulputate turpis laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex. Fusce feugiat sapien ligula, sit amet varius tortor aliquet sed. Donec rhoncus ante nec nibh fringilla sodales.";

const englishFlag = "files/englishFlag.png";
const polishFlag = "files/polishFlag.png";
if(window.location.pathname.endsWith('index.html') || (window.location.pathname.endsWith('cv.html')))
{
  textElement = document.getElementById('cv');
  if(window.location.pathname.endsWith('cv.html'))
  {
    textElement.innerHTML = englishTextE;
  }
  else
  {
    textElement.innerHTML = englishText;
  }

  function language(additional) 
  {
      if(additional)
      {
        text1 = document.getElementById('importantlinks');
        text2 = document.getElementById('services');
        text3 = document.getElementById('donations');
      }
      imgElement = document.querySelector('#flag');

      if (textElement.innerHTML === englishText || textElement.innerHTML === englishTextE) {
        if(additional)
        {
          textElement.innerHTML = polishText
          text1.innerHTML = "Ważne odnośniki"
          text2.innerHTML = "Moje usługi"
          text3.innerHTML = "Darowizny na rozwój moich bezpłatnych kursów"
        }
        else
        {
          textElement.innerHTML = polishTextE
        }
      } else {
        if(additional)
        {
          textElement.innerHTML = englishText
          text1.innerHTML = "Important links"
          text2.innerHTML = "My services"
          text3.innerHTML = "Donations for the development of my free courses"
        }
        else
        {
          textElement.innerHTML = englishTextE
        }
      }
      if (imgElement.src.includes(polishFlag)) {
        imgElement.src = englishFlag;
      } else {
        imgElement.src = polishFlag;
      }
  }
}

/*!
 * This message applies to the code below.
 * Start Bootstrap - SB Admin 2 v4.1.3 (https://startbootstrap.com/theme/sb-admin-2)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin-2/blob/master/LICENSE)
 * Bootstrap v4.6.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors
 * Copyright 2011-2021 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

(function($) {
  "use strict";
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery);
