$(window).load(function() {$(".page-loader").delay(1500).fadeOut("slow");});
$(document).ready(function(){
Screv();
$('body').niceScroll({ cursoropacitymax: 0.8, cursorwidth: 9,cursorcolor:"#00182e"});
/*------------------------------------------------------------------------*/
var wH = $(window).height();
if (wH> 750) {
$('.big-bgr').css('min-height',wH);
$('#canvas').attr('height',wH);
}else {
  $('.big-bgr').css('min-height',750);
  $('#canvas').attr('height',750);
}
$('.current-lang,.user-link a').addClass('hvr-overline-from-right');
$('.c-box-in').addClass('hvr-push');
$('.fot-links a').addClass('hvr-underline-from-left');
$('.cit-box:first-of-type').addClass('active');
/*------------------------------------------------------------------------*/
$('.hdr-menu-wrap > ul a').click(function(e) {
  e.preventDefault();
  var box = $(this).attr('href');
  $('html, body').animate({
      scrollTop: $(box).offset().top
  }, 1500);
});
$('.d-arrow').click(function(e) {
  e.preventDefault();
  $('html, body').animate({
      scrollTop: $('#section-OUR-PARTNERS').offset().top
  }, 1500);
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
        $('.gototop').addClass("gototop-show");
    } else {
        $('.gototop').removeClass("gototop-show");
    }
});
$('.gototop').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 400);
    return false;
});
$(document).on('click','.why-nav a',function(e) {
  e.preventDefault();
  var currnt = $('.n-active');
  if ($(this).parent().hasClass('n-active')) {} else {
    currnt.removeClass('n-active')
    $(this).parent().addClass('n-active');

  }

});
$('.vd-play-btn').click(function(e) {
  e.preventDefault();
  var video = $(this).attr('href')
  $(video).get(0).play();
  $(video).parent().addClass('playing');
});
/*------------------------------------------------------------------------*/
$('.hdr-menu-wrap ul').append('<li class="line-b"></li>');
$.fn.firstWord = function() {
  var text = this.text().trim().split(" ");
  var first = text.shift();
  this.html((text.length > 0 ? "<span>"+ first + "</span> " : first) + text.join(" "));
};
$(".block-title h2,.block-title2 h2,.block-title3 h2,.vdo-title h2,.title02 h2").each(function(){
  $(this).firstWord();
})
setTimeout(function() {
  var Bheight = $('.sec-hwr .s-right').outerHeight();
  var BBheight = $('.sec-wwd .s-left').outerHeight();
  $('.sec-hwr .s-left').css('height',Bheight);
  $('.sec-wwd .s-right').css('height',BBheight);
    }, 1);

$('.sec-hwr .block-title2 h2').prepend('<i class="lnr lnr-bookmark"></i> ');
$('.sec-wwd .block-title2 h2').prepend('<i class="lnr lnr-thumbs-up"></i> ');
/*------------------------------------------------------------------------*/
$('.map-list li:nth-child(odd) .v-line').append('<i class="lnr lnr-arrow-right"></i>');
$('.map-list li:nth-child(even) .v-line').prepend('<i class="lnr lnr-arrow-left"></i>');
/*------------------------------------------------------------------------*/
$('.part-thumbnl').slick({
  infinite: true,
  slidesToShow: 5,autoplay:true,
  autoplaySpeed:6000,
  speed:500,
  slidesToScroll: 5,
  appendArrows:$('.part-thumbnl-arrow'),
  prevArrow:'<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
  nextArrow:'<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
  responsive: [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 740,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }

]
});
/*------------------------------------------------------------------------*/
$('.vd-wrap').slick({
  infinite: true,
  slidesToShow: 3,autoplay:true,
  autoplaySpeed:6000,
  speed:500,
  slidesToScroll: 1,
  arrows: false,
  dots:true,
  responsive: [
  {
    breakpoint: 740,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]
});
/*------------------------------------------------------------------------*/
$('.directors-slider').slick({
  infinite: true,
  centerMode: true,
  slidesToShow: 3,
  autoplay:true,
  autoplaySpeed:4000,
  speed:1000,
  slidesToScroll: 1,
//  arrows: false,
  dots:true,
  responsive: [
  {
    breakpoint: 940,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
],
    //appendArrows:$('.slide-arrow'),
    prevArrow:'<button type="button" class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
    nextArrow:'<button type="button" class="slick-next"><i class="lnr lnr-chevron-right"></i></button>'
});
/*------------------------------------------------------------------------*/
$('.vdo-slider').slick({
  slidesToShow: 1,
  fade:true,
  autoplay:false,
  autoplaySpeed:4000,
  speed:1000,
  slidesToScroll: 1,
    appendArrows:$('.v-arrow'),
    prevArrow:'<button type="button" class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
    nextArrow:'<button type="button" class="slick-next"><i class="lnr lnr-chevron-right"></i></button>'
});
/*------------------------------------------------------------------------*/
$('.current-lang').click(function(e) {
  e.preventDefault();
  $('#lang ul').toggleClass('show-langs');
});
$('.wrapp').click(function () {
    $('#lang ul').removeClass('show-langs');
});
$('.current-lang').click(function (event) {
    event.stopPropagation();
});
$('.cit-box-detls').html($('.cit-box.active p').html());
var a = -($('.cirlec-slider-bg').width() / 2);
var b = $('.cirlec-slider-bg .cit-box').length;
var c = 360 / b;
rotateCircle(c, 'domReady');
$(".cirlec-slider-bg").on("click", ".cit-box", function(e) {
    if ($(this).hasClass('active')) {} else {
        $('.cirlec-slider-bg .cit-box').removeClass("active");
        $(this).addClass('active');
        var dataAngle = parseInt($(this).attr('data-angle'));
        var maxangle = 360 - dataAngle;
        rotateCircle(maxangle, 'onitemClick')
        var txxt = $(this).find('p').html();
        $('.cit-box-detls').html(txxt);
    }
});
function rotateCircle(maxangle, type) {
    $('.cirlec-slider-bg .cit-box').each(function(index) {
        if (type == 'onitemClick') {
            var maxAngle = maxangle;
            var dataAngle2 = parseInt($(this).attr('data-angle'));
            var maxangle2 = dataAngle2 + maxAngle;
            var d = (index) * c;
        }
        if (type == 'domReady') {
            var maxAngle = maxangle;
            var maxangle2 = (index) * maxAngle;
        }
        var m = [
            "translate(-50%, -50%) rotate(", -90, "deg) translateY(" + a + "px) rotate(", 90, "deg)"
        ];
        m[1] = maxangle2;
        m[3] = 0 - maxangle2;
        $(this).css({
            "transform": m.join("")
        });
        $(this).attr('data-angle', maxangle2);
    })
}
/*------------------------------------------------------------------------*/
function Screv(){
  $('.current-lang').attr('data-sr', 'enter left, move 50px');
  var count = $('.user-link > li').length;
  for (var i = 0; i <= count; ++i) {$(".user-link > li:nth-child("+i+")").attr("data-sr", "wait 0."+(i*2)+"s, enter left, move 50px");}
  $('.logo').attr('data-sr', 'wait 0.6s,scale up 30%');
  $('.hdr-menu-wrap').attr('data-sr', 'wait 0.8s,enter left, move 150px');
  var count = $('.hdr-menu-wrap > ul > li').length;
  for (var i = 0; i <= count; ++i) {$(".hdr-menu-wrap > ul > li:nth-child("+i+")").attr("data-sr", "wait 1."+i+"s, scale up 30%");}
  $('.b-text h2').attr('data-sr', 'wait 1s,enter left, move 150px');
  $('.b-text h2+h3').attr('data-sr', 'wait 1.4s,enter left, move 150px');
  $('.b-text p,.b-text img').attr('data-sr', 'wait 1.8s,enter left, move 150px');
  $('.b-text .btns-').attr('data-sr', 'wait 2s,scale up 30%');
  $('.social-box').attr('data-sr', 'wait 2.5s,hustle 40%');
  $('.d-arrow').attr('data-sr', 'wait 3s,enter bottom, move 50px');
  $('.block-title').attr('data-sr', 'hustle 40%');
  $('.a-block').attr('data-sr', 'hustle 10%');
  $('.sec04 .block-title2,.sec04 .s-right p,.sec04 .btns-,.sec05 .block-title2,.sec05 .s-right p,.sec05 .btns-,.block-title3 h2').attr('data-sr', 'enter bottom, move 50px');
  $('.sperater').attr('data-sr', 'hustle 60%');
  $('.map-list li:nth-child(odd)').attr('data-sr', 'enter right, move 50px');
  $('.map-list li:nth-child(even)').attr('data-sr', 'enter left, move 50px');
  var count = $('.s-detail-list > li').length;
  for (var i = 0; i <= count; ++i) {
    if (i > 9) {
      $(".s-detail-list > li:nth-child("+i+")").attr("data-sr", "wait 1."+(i)+"s, enter right, move 40px");
    }else {
      $(".s-detail-list > li:nth-child("+i+")").attr("data-sr", "wait 0."+(i)+"s, enter right, move 40px");
    }
  }
}
$('.s-detail-list li').each(function(index, el) {
  $(this).prepend("<i>"+(index+1)+"</i>");
});
/*------------------------------------------------------------------------*/
$('.social-box a').tooltipster({theme: 'social-title tooltipster-default',animation: 'grow',position : 'top'});
$('.social a').tooltipster({theme: 'social-title2 tooltipster-default',animation: 'grow',position : 'top'});
var controller = new ScrollMagic.Controller();
var tIs = new TimelineLite();
    var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 1500})
        .setPin("#a-block")
        .triggerHook(0)
        .setTween(tIs.to(".c02", 3, {y: -60, x: 140,scale:1}))
        .setTween(tIs.to(".c03", 3, {y: -60, x: -140,scale:1},0))
        .setTween(tIs.to(".c-ss", 3, {y: 60, scale:0.5, opacity:0},0.3))
        .setTween(tIs.to(".c-title1", 3, {scale:0, opacity:0},0))
        .setTween(tIs.to(".c-title2", 3, {scale:1, opacity:1},0))
        .setTween(tIs.to(".c05", 3, {opacity:1},0.2))
        .setTween(tIs.to(".vdo-btn i", 3, {opacity:1,x: 10},0.3))
        .setTween(tIs.to(".vdo-btn em", 3, {opacity:1,x: -10},0.4))
        .setTween(tIs.to(".vdo-btn span", 3, {opacity:1,x: -00},0.5))
        .setTween(tIs.to(".vdo-btn u", 3, {opacity:1,width:160},1))
        .addTo(controller);
/*------------------------------------------------------------------------*/
window.sr = new scrollReveal({mobile: true,over: '1.5s',vFactor:  0.50});
/*------------------------------------------------------------------------*/
});
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#c3e2ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#c3e2ff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }
);
particlesJS('particles-js2',
  {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#c3e2ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 1,
          "color": "#83b4f1"
        },
        "polygon": {
          "nb_sides": 20
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": true
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#c3e2ff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }
);
