$(function () {
  // 进入页面fade出现效果
  $(".animation_1").animated("fadeIn", "fadeOutDown");
  // $(".animation_2").animated("fadeInLeft", "fadeOutDown");
  // $(".animation_3").animated("fadeInRight", "fadeOutDown");
  // 回到顶部
  $(".logo").click(function() {
    $('body,html').animate({
      scrollTop: 0
    },
    500);
    return false;
  });
  // 点击导航跳转
  $(".mnu a").on("click", function (event) {
    event.preventDefault();
    var hr = $(this).attr("href");
    $("body, html").animate({
      scrollTop: $(hr).offset().top - 80
    }, 1000);
    var ww = $(window).width();
    if (ww < 991) {
      $(".sandwich").removeClass("active");
      $(".mnu").hide();
    }
  });
  // 切换手机版本时，导航标识出现
  $(".toggle_mnu").click(function () {
    $(".sandwich").toggleClass("active");
    $(this).toggleClass("active");
    $(".mnu").toggle();
  });
  // 向下滑动导航吸顶
  $(window).on("scroll", function () {
    var sc = $(this).scrollTop();
    if (sc > 0) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });
});