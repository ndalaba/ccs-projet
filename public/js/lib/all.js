$(document).ready(function() {
  function e(e) {
    var t = $("title").attr("data-titre");
    $("title").html(t + " | " + e)
  }

  function t(t, a, n) {
    $("#page-wrapper").css({
      opacity: "0.3",
      cursor: "wait"
    }), $.get(t, function(t) {
      $("#page-wrapper").html(t), e(a), $("ul.nav a").removeClass("selected"), void 0 !== n && n.addClass("selected"), $("#page-wrapper").fadeIn(500), r = !0, $("html, body").animate({
        scrollTop: 0
      }, "fast"), $("#page-wrapper").css({
        opacity: "1",
        cursor: "default"
      })
    })
  }
  $("#main-menu").metisMenu(), $(window).bind("load resize", function() {
    $(this).width() < 768 ? $("div.sidebar-collapse").addClass("collapse") : $("div.sidebar-collapse").removeClass("collapse")
  });
  var a = function() {
    var e = ["home", "maersk", "users"];
    $("#main-menu li a").removeClass("active-menu"), $("#main-menu li ul").removeClass("in"), e.forEach(function(e) {
      $("#page-wrapper ." + e).length && ($("#main-menu #" + e).addClass("active-menu"), $("#main-menu #" + e).parent("li").find("ul").addClass("in"))
    })
  };
  a(), $("#select_all").change(function() {
    var e = $(this).closest("form").find(":checkbox");
    $(this).is(":checked") ? e.prop("checked", !0) : e.prop("checked", !1)
  })
});
