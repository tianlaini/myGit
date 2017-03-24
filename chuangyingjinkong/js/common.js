var t = n = 0,
    count;
function showAuto()
{
    // alert("haha");
    n = n >= (count - 1) ? 0 : ++n;
    $("#banner li").eq(n).trigger('click');
}
$(function() {
    // $(document).ready(function() {
    count = $("#banner_list > div").length;
    $("#banner_list > div:not(:first-child)").hide();
    $("#banner li").click(function() {
        var i = $("#banner li").index(this); //获取Li元素内的值，即1，2，3，4
        n = i;
        if (i >= count) return;
        $("#banner_list > div").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
        document.getElementById("banner").style.background = "";
        // $(this).toggleClass("on");
        if(!$(this).hasClass("on")){
            $(this).addClass("on");
        }
        $(this).siblings().removeAttr("class");
    });
    t = setInterval("showAuto()", 8000);
    // $("#banner").hover(function() { clearInterval(t) }, function() { t = setInterval("showAuto()", 4000); });
    // })
    header_nav(); //头部菜单选中
})



/*头部菜单选中*/
function header_nav() {
    //header nav bar
    var _nav_current = $('.header_nav_link li.active');
    var current_i = _nav_current.index();
    if (current_i == -1) {
        return false;
    }
    var _bar = $('#header_bar');
    _bar.css('left', current_i != 0 ? (_nav_current.offset().left + 17) : (_nav_current.offset().left - 1));
    _bar.show();
    $('.header_nav_link li').hover(
        function() {
            var _this = $(this);
            if (!_this.hasClass('active')) {
                var to = $(this).index() == 0 ? $(this).offset().left - 1 : $(this).offset().left + 17;
                _bar.stop().animate({
                    'left': to + 'px'
                }, 300);
            }
        },
        function() {
            var to = current_i != 0 ? (_nav_current.offset().left + 17) : _nav_current.offset().left - 1;
            _bar.stop().animate({
                'left': to + 'px'
            }, 300);
        }

    );
    $(window).resize(function() {
        var to = current_i != 0 ? ($('#header_bar_c').offset().left + 17) : $('#header_bar_c').offset().left - 1;
        $('#header_bar').css('left', to);
    });
}

/*Taps选项函数*/
// function switchTaps(content,tabs,current) {
//     $("#"+content+" > div").hide(); // Initially hide all content
//     $("#"+tabs+" li:first a").attr("id",current); // Activate first tab
//     $("#"+content+" > div:first").fadeIn(); // Show first tab content
//     $("#"+tabs+" a").on("click",function(e) {
//         e.preventDefault();
//         if ($(this).attr("id") == current){ //detection for current tab
//             return;       
//         } else{
//             $("#"+content+" > div").hide(); //Hide all content
//             $("#"+tabs+" a").attr("id",""); //Reset id's      
//             $(this).attr("id",current); // Activate this
//             $($(this).attr('name')).fadeIn(); // Show content for current tab
//             if ($(this).attr('name') == "#tab3") {
//                 console.log("就是这个Tab！")
//                 $('#tab3').tinyscrollbar();
//             }
//         }
//     });
// }
function switchTaps(content,tabs,current) {
    $("#"+content+" > div").hide(); // Initially hide all content
    $("#"+tabs+" li:first a").attr("id",current); // Activate first tab
    $("#"+content+" > div:first").fadeIn(); // Show first tab content
    $("#"+tabs+" a").on("click",function(e) {
        e.preventDefault();
        if ($(this).attr("id") == current){ //detection for current tab
            return;       
        } else{
            $("#"+content+" > div").hide(); //Hide all content
            $("#"+tabs+" a").attr("id",""); //Reset id's      
            $(this).attr("id",current); // Activate this
            $($(this).attr('name')).fadeIn(); // Show content for current tab
            /*关于我们*/
            if ($(this).attr('name') == "#bottomTap2") {
                $('#tab1').tinyscrollbar();
            }
            if(tabs == "tabs"){
                console.log($(this).attr('name') + ":id是");
                $($(this).attr('name')).tinyscrollbar();
            }

            /*企业文化*/
            if ($(this).attr('name') == "#bottomTapIdea2") {
                $('#speechScrollBox').tinyscrollbar();
            }
            /*关于我们切换关闭*/
            if($(this).attr('name') != "#bottomTap3"){
                $(".partnerDetailBox").hide();
            }
        }
    });
}