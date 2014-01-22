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
      resetFeatures,
      onCoordChange,
      THROTTLE = 2,
      BREAK1 = 800,
      BREAK2 = 1600,
      BREAK3 = 2400,
      NEXT_DELAY = 1000,
      oldScrollTop = 0,
      $follow = $("#follow-feature"),
      $recommend = $("#recommend-feature"),
      $save = $("#save-feature"),
      $choice = $("#editorschoice-feature"),
      $article1 = $("#article-1"),
      $article2 = $("#article-2"),
      $article3 = $("#article-3"),
      $article4 = $("#article-4"),
      $article5 = $("#article-5");

  // Modernizer?
  if (isMobile || isTablet) {
    $body.addClass('touch');
  }

  $("#container").height(windowHeight * 6 + (NEXT_DELAY * 3));
  $("#intro").css('top', windowHeight / 2);

  resetFeatures = function () {
      $("#article-icons > li").removeClass('hidden');

      $follow.removeClass();

      $recommend.removeClass();

      $save.removeClass();
  };

  onScroll = function () {
    var scrollTop = $window.scrollTop(),
      scrollingUp = scrollTop > oldScrollTop,
      windowWidthHalf = (windowWidth / 2),
      windowHeightHalf = (windowHeight / 2),
      start = -50;

    oldScrollTop = scrollTop;

    if (scrollTop < windowHeight) {
       resetFeatures();

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
    } else if (scrollTop >= windowHeight && scrollTop < windowHeight + NEXT_DELAY) {
      $follow.addClass('visible');
      $recommend.removeClass('visible');
      $save.removeClass('visible');
      $choice.removeClass('visible');

    } else if (scrollTop >= windowHeight + NEXT_DELAY && scrollTop < windowHeight * 2 + NEXT_DELAY) {
      // Reset our scrollTop to be from the start of this section
      scrollTop = scrollTop - windowHeight - NEXT_DELAY;
      $("#article-icons > li").removeClass('hidden');
      $follow.removeClass('visible');

      $article1.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 80, windowHeightHalf - 260),
        left: onCoordChange(scrollTop, windowWidthHalf - 170, windowWidthHalf + 150)
      });

      $article2.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 190, windowHeightHalf - 200),
        left: onCoordChange(scrollTop, windowWidthHalf - 130, windowWidthHalf + 70)
      });

      $article3.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 180, windowHeightHalf - 160),
        left: onCoordChange(scrollTop, windowWidthHalf - 10, windowWidthHalf + 110)
      });

      $article4.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 200, windowHeightHalf - 80),
        left: onCoordChange(scrollTop, windowWidthHalf + 100, windowWidthHalf + 80)
      });

      $article5.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 60, windowHeightHalf - 40),
        left: onCoordChange(scrollTop, windowWidthHalf + 140, windowWidthHalf + 160)
      });

    } else if (scrollTop >= windowHeight * 2 + NEXT_DELAY && scrollTop < windowHeight * 2 + (NEXT_DELAY * 2)) {
      $recommend.addClass('visible');
      $follow.removeClass('visible');
      $save.removeClass('visible');
      $choice.removeClass('visible');

    } else if (scrollTop >= windowHeight * 2 + (NEXT_DELAY * 2) && scrollTop < windowHeight * 3 + (NEXT_DELAY * 2)) {
      // Reset our scrollTop to be from the start of this section
      scrollTop = scrollTop - windowHeight * 2 - (NEXT_DELAY * 2);
      $("#article-icons > li").removeClass('hidden');
      $recommend.removeClass('visible');

      $article1.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 260, windowHeightHalf - 110),
        left: onCoordChange(scrollTop, windowWidthHalf + 150, windowWidthHalf - 190)
      });

      $article2.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 200, windowHeightHalf - 200),
        left: onCoordChange(scrollTop, windowWidthHalf + 70, windowWidthHalf - 150)
      });

      $article3.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 160, windowHeightHalf - 260),
        left: onCoordChange(scrollTop, windowWidthHalf + 110, windowWidthHalf - 15)
      });

      $article4.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 80, windowHeightHalf - 200),
        left: onCoordChange(scrollTop, windowWidthHalf + 80, windowWidthHalf + 135)
      });

      $article5.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 40, windowHeightHalf - 110),
        left: onCoordChange(scrollTop, windowWidthHalf + 160, windowWidthHalf + 175)
      });

     } else if (scrollTop >= windowHeight * 2 + (NEXT_DELAY * 2) && scrollTop < windowHeight * 2 + (NEXT_DELAY * 3)) {
      $save.addClass('visible');
      $follow.removeClass('visible');
      $recommend.removeClass('visible');
      $choice.removeClass('visible');

    } else if (scrollTop >= windowHeight * 3 + (NEXT_DELAY * 3) && scrollTop < windowHeight * 4 + (NEXT_DELAY * 3)) {
      $save.removeClass('visible');

      scrollTop = scrollTop - windowHeight * 3 - (NEXT_DELAY * 3);

      $article1.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 110, start),
        left: onCoordChange(scrollTop, windowWidthHalf - 190, windowWidthHalf)
      });

      $article2.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 200, start),
        left: onCoordChange(scrollTop, windowWidthHalf - 150, windowWidthHalf)
      });

      $article3.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 260, start),
        left: onCoordChange(scrollTop, windowWidthHalf - 15, windowWidthHalf)
      });

      $article4.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 200, start),
        left: onCoordChange(scrollTop, windowWidthHalf + 135, windowWidthHalf)
      });

      $article5.css({
        top: onCoordChange(scrollTop, windowHeightHalf - 110, start),
        left: onCoordChange(scrollTop, windowWidthHalf + 175, windowWidthHalf)
      });

    } else if (scrollTop >= windowHeight * 4 + (NEXT_DELAY * 3) && scrollTop < windowHeight * 4 + (NEXT_DELAY * 4)) {
      $choice.addClass('visible');
    }
  };

  onResize = function () {
    onScroll();
  };

  onCoordChange = function (yCoord, start, end) {
    var distancePerPixel = (end - start) / windowHeight,
    diff = start + (yCoord * distancePerPixel);

    return diff;
  };

  onScroll();

  $window.scroll(_.throttle(onScroll, THROTTLE));
  $window.resize(_.throttle(onResize, THROTTLE));
});