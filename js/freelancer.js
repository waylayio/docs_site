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

var validateEmail = function (email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

$(document).ready(function(){  
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

    $(".optionName").popover({ trigger: "hover" });
    
    try {
        var terminal = new Terminal();
        terminal.setHeight("280px");
        terminal.setWidth('570px');
        terminal.input('Welcome, please enter your e-mail address to start download:', function (input) {
            if(validateEmail(input)){
                terminal.print('Welcome ' + input);
                terminal.sleep(1000, function () {
                    MAIL.sendMail(input);
                    terminal.input('Please select your OS (1-linux, 2-MAC, 3-windows):', function (input) {
                        terminal.clear();
                        terminal.print('To start the demo run these commands in a terminal/console:');
                        if(input == "1"){
                            terminal.print('$ sudo docker run -p 8080:8080/tcp -i --name waylay waylay/demo');
                            terminal.print('$ open http://localhost:8080/');
                        } else if(input == "2"){
                            terminal.print('$ docker run -p 8080:8080/tcp -i --name waylay waylay/demo');
                            terminal.print('$ open http://$(boot2docker ip):8080/');
                        } else if(input == "3"){
                            terminal.print('$ docker run -p 8080:8080/tcp -i --name waylay waylay/demo');
                            terminal.print('$ boot2docker ip');
                            terminal.print('$ start http://[ip reported by above command]:8080/');
                        } else {
                            terminal.clear();
                            terminal.print("OS selection not recognised please try again..");
                            terminal.sleep(5000, function () {
                                location.reload();
                            });
                        }
                    });
                });
            } else {
                terminal.print("E-mail doesn't seem right, please try again..");
                terminal.sleep(1000, function () {
                    location.reload();
                });
            }
        });
        $('#terminal').append(terminal.html);
    }
    catch(err) {
    }

    var toc = $("#toc").tocify({
          selectors: "h2,h3,h4,h5",
          extendPage: false
        }).data("toc-tocify");

    $("#navigation .nav").tinyNav({
            active: 'selected', // String: Set the "active" class
            label: ''
    });

});
