/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});


//BACK TO TOP

    $(document).ready(function(){ 

        $('.myIframe').css('height', $(window).height()+'px');
        $("#push").click(function(e){
              e.preventDefault();
              var resource = $('#resource').val();
              var data = JSON.parse($('#data').val());
              WAYLAY.pushData(data, resource); 

              /*setInterval(function() {
                WAYLAY.getData(resource, function(data){console.log(data);}); 

              }, 10000); */
          });
          $("#pushDomain").click(function(e){
              e.preventDefault();
              var resource = $('#resource').val();
              var data = JSON.parse($('#data').val());
              var domain = $('#domain').val();
              var key = $('#key').val();
              var password = $('#secret').val();
              WAYLAY.pushDomainData(domain, key, password, data, resource); 
          });
        
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        }); 
 
        $('.scrollup').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
        
        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar-fixed-top'
        })

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function() {
            $('.navbar-toggle:visible').click();
        });
        /*var toc = $("#toc").tocify({
              selectors: "h2,h3,h4,h5",
              extendPage: false
            }).data("toc-tocify");*/

        $(".optionName").popover({ trigger: "hover" });
        
        /*$("#navigation .nav").tinyNav({
            active: 'selected', // String: Set the "active" class
            label: ''
        });*/
 
    });
