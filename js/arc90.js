$(function () {
  'use strict';

  var isMobile = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase()),
      isTablet = /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()),
      $window = $(window),
      $body = $('body'),
      $meetTheTeam = $('#meet-the-team'),
      $workNav = $('#work-nav'),
      $mainNav = $('#nav-links'),
      $navToggle = $('#nav-toggle'),
      $contactForm = $('#contact-form'),
      $contactSubmit = $('#contact-submit'),
      $togglingNav = $mainNav.hasClass('mobile-active') ? $mainNav : $workNav,
      $onlyTheBeginning = $('#only-the-beginning'),
      $projectNarrative = $('#project-narrative'),
      $interactions = $('#featured-interactions'),
      windowWidth = $window.width(),
      wrapperWidth = $('.wrapper:first').width(),
      SLIDESHOW_SPACER = 20,
      ARROW_ANIMATE_SPEED = 600,
      CORNELL_ANIMATE_TIMEOUT = 200,
      SLIDE_SPEED = 150,
      SLIDESHOW_SPEED = 300,
      MOBILE_WIDTH_THRESHOLD = 748,
      THROTTLE = 20,
      BUTTON_FADE_SPEED = 100,
      Slideshow,
      onResize,
      onScroll,
      sizeProjectFooter,
      contactFormIsValid,
      toggleNav;

  // Modernizer?
  if (isMobile || isTablet) {
    $body.addClass('touch');
  }

  toggleNav = function () {
    if ($togglingNav.is(':visible')) {
      $togglingNav.slideUp(SLIDE_SPEED, function () {
          $navToggle.removeClass('active');
      });
    } else {
      $navToggle.addClass('active');
      $togglingNav.slideDown(SLIDE_SPEED);

      $window.one('scroll', toggleNav);
    }
  };

  $navToggle.click(function (ev) {
    ev.preventDefault();

    toggleNav();
  });

  $('.interaction-video .video-icon').click(function (ev) {
    var $this = $(this),
        video = $this.data('video-element'),
        videoEl = document.getElementById(video),
        showButton = function () {
          $this.fadeIn(BUTTON_FADE_SPEED);
        };

    videoEl.addEventListener('ended', showButton);

    if (videoEl.paused) {
      videoEl.play();
      $this.fadeOut(BUTTON_FADE_SPEED);
    } else {
      videoEl.pause();
    }
  });

  contactFormIsValid = function () {
    var $inputs = $contactForm.find('input, textarea'),
        email = $contactForm.find('input[name=email]').val(),
        isValid = true;

    _.each($inputs, function (input) {
      if ($(input).val().length === 0) {
        isValid = false;
      }
    });

    return isValid;
  };

  $('#contact-submit').click(function (ev) {
    ev.preventDefault();

    if (!contactFormIsValid()) {
      $contactForm.find('.error-message').show();

      return;
    }

    $contactForm.find('.error-message').hide();

    $contactSubmit.removeClass().addClass('sending');

      var $name = $contactForm.find('input[name=name]'),
        $email = $contactForm.find('input[name=email]'),
        $message = $contactForm.find('textarea'),
        name = $name.val(),
        email = $email.val(),
        message = $message.val();

    $.ajax({
      url: $contactForm.attr('action'),
      type: 'POST',
      data: $contactForm.serialize(),
      success : function () {
        $contactSubmit.removeClass().addClass('sent');
      },
      error: function (){
        $contactSubmit.removeClass().addClass('error');
      }
    });
  });

  sizeProjectFooter = function () {
    if (wrapperWidth < MOBILE_WIDTH_THRESHOLD) {
      $projectNarrative.css('margin-bottom', 0);

      return;
    }

    var meetTheTeamHeight = $meetTheTeam.outerHeight();

    if (meetTheTeamHeight > 0) {
      $projectNarrative.css('margin-bottom', meetTheTeamHeight);
    }
  };

  onScroll = function () {
    var scrollTop = $window.scrollTop(),
        arrowOffset,
        cornellPhasesOffset;

    if ($onlyTheBeginning.length) {
      cornellPhasesOffset = $onlyTheBeginning.offset().top;

      if (scrollTop + 300 > cornellPhasesOffset) {
        $('#cornelltech-phase-1').addClass('fade');

        _.delay(function () {
          $('#cornelltech-phase-2').addClass('fade');

          _.delay(function () {
            $('#cornelltech-phase-3').addClass('fade');
          }, CORNELL_ANIMATE_TIMEOUT);
        }, CORNELL_ANIMATE_TIMEOUT);
      }
    }
  };

  onResize = function () {
    wrapperWidth = $('.wrapper:first').width();
    windowWidth = $window.width();

    var readabilityheight = $('#project-after').height(),
        boldDesignHeight = $('#bold-ideas-image-01').height();

    $('#project-before-after').height(readabilityheight);
    $('#bold-design').height(boldDesignHeight);

    if ($interactions.length) {
      var width = $interactions.find('video').first().width();

      $interactions.find('video').height(width);
    }

    sizeProjectFooter();
  };

  $('#project-before-after').imagesLoaded(onResize);
  $('#bold-design').imagesLoaded(onResize);
  $meetTheTeam.imagesLoaded(sizeProjectFooter);

  Slideshow = function (options) {
    this._setSettings(options || {});
    this.initialize.apply(this, arguments);
  };

  _.extend(Slideshow.prototype, {
    initialize : function () {
      _.bindAll(this, 'onNext', 'onPrev', 'resize', 'setActive');

      this.el = this.options.el;
      this.index = 0;
      this.max = this.el.find('img').length;
      this.next = $('#slideshow-next');
      this.prev = $('#slideshow-prev');

      this.el.imagesLoaded(this.resize);
      this.bindEvents();
      this.toggleControls();

      $window.resize(_.throttle(this.resize, THROTTLE, {trailing: false}));
    },

    bindEvents : function () {
      this.prev.click(this.onPrev);
      this.next.click(this.onNext);
    },

    resize : function () {
      if (windowWidth < MOBILE_WIDTH_THRESHOLD) {
        this.el.width('');
        this.el.css('left', 0);
        return;
      }

      var images = this.el.find('li'),
          width = 0,
          offset = (windowWidth - wrapperWidth) / 2;

      $.each(images, function (i, el) {
        width += $(el).width() + SLIDESHOW_SPACER;
      });

      this.el.width(width);
      this.width = width;

      this.animate(false);

      this.setActive();
    },

    setActive : function () {
      if (!this.el.hasClass('active')) {
        this.el.addClass('active');
      }
    },

    onPrev : function (ev) {
      ev.preventDefault();

      if (this.index === 0) {
        return;
      }

      this.index -= 1;

      this.animate(true);
    },

    onNext :  function (ev) {
      ev.preventDefault();

      if (this.index === this.max - 1) {
        return;
      }

      this.index += 1;

      this.animate(true);
    },

    toggleControls : function () {
      if (this.index <= 0) {
        this.prev.hide();
      } else {
        this.prev.show();
      }

      if (this.index >= this.max - 1) {
        this.next.hide();
      } else {
        this.next.show();
      }
    },

    animate : function (change) {
      change = change ? 'animate' : 'css';

      var newImg = this.el.find('li')[this.index],
          offset = $(newImg).offset().left,
          newLeft = (this.el.find('li').width() + SLIDESHOW_SPACER) * this.index;

      this.el[change]({
        left : - newLeft + ((windowWidth - wrapperWidth) / 2)
      }, SLIDESHOW_SPEED);

      this.toggleControls();
    },

    _setSettings: function(options) {
      this.options = options;
    }
  });

  $window.scroll(_.throttle(onScroll, THROTTLE));
  $window.resize(_.throttle(onResize, THROTTLE));
});