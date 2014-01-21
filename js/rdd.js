$(function () {
  'use strict';

  var isMobile = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase()),
      isTablet = /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()),
      $window = $(window),
      $body = $('body'),
      windowWidth = $window.width(),
      windowHeight = $window.height(),
      onResize,
      onScroll,
      onCoordChange,
      THROTTLE = 20,
      BREAK1 = 800,
      BREAK2 = 1600,
      BREAK3 = 2400,
      $follow = $("#follow-feature"),
      $recommend = $("#recommend-feature"),
      $article1 = $("#article-1"),
      $article2 = $("#article-2"),
      $article3 = $("#article-3"),
      $article4 = $("#article-4"),
      $article5 = $("#article-5");

  // Modernizer?
  if (isMobile || isTablet) {
    $body.addClass('touch');
  }

  $("#container").height(windowHeight * 6);
  $("#intro").css('top', windowHeight / 2);

  onScroll = function () {
    var scrollTop = $window.scrollTop(),
      windowWidthHalf = (windowWidth / 2),
      windowHeightHalf = (windowHeight / 2),
      start = -50;

    if (scrollTop < windowHeight) {
      $follow.removeClass();
      $recommend.removeClass();


      $article1.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 80),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 170)
      });

      $article2.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 190),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 130)
      });

      $article3.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 180),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 10)
      });

      $article4.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 200),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf + 100)
      });

      $article5.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 60),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf + 140)
      });
    } else if (scrollTop >= windowHeight && scrollTop < windowHeight + 500) {
      $follow.addClass('visible')

    } else if (scrollTop >= windowHeight + 500 && scrollTop < windowHeight * 2 + 500) {
      if (!$follow.hasClass('fixed')) {
        $follow.addClass('fixed').css({
          top: scrollTop + windowHeightHalf
        });
      }

      $article1.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 80),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 170)
      });

      $article2.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 190),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 130)
      });

      $article3.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 180),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf - 10)
      });

      $article4.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 200),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf + 100)
      });

      $article5.css({
        top: onCoordChange(scrollTop, start, windowHeightHalf - 60),
        left: onCoordChange(scrollTop, windowWidthHalf, windowWidthHalf + 140)
      });

    } else if (scrollTop >= windowHeight * 2 && scrollTop < windowHeight * 3) {
        $recommend.addClass('visible');

     } else if (scrollTop >= windowHeight * 3) {
    //   $follow.removeClass('visible');
    // }
    }
  };

  onResize = function () {

  };

  onCoordChange = function (yCoord, start, end) {
    var offset = 0;

    if (yCoord >= windowHeight && yCoord < windowHeight * 2) {
        offset = windowHeight;

    } else if (yCoord >= windowHeight * 2 && yCoord < windowHeight * 3) {
        offset = windowHeight * 2;

    } else if (yCoord >= windowHeight * 3) {
        offset = windowHeight * 3;

    }

    var distancePerPixel = (end - start) / windowHeight,
    diff = start + (yCoord * distancePerPixel);

    return diff;
  };

  onScroll();

  $window.scroll(_.throttle(onScroll, THROTTLE));
  $window.resize(_.throttle(onResize, THROTTLE));
});