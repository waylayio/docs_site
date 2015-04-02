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

var simulationData =[];
var timerId = 0;
$(document).ready(function(){ 
    //$('.myIframe').css('height', $(window).height()+'px');
    $("#simulation").hide();
    $("#pushDomain").click(function(e){
          e.preventDefault();
          var resource = $('#resource').val();
          var data = JSON.parse($('#data').val());
          var domain = $('#domain').val();
          var key = $('#key').val();
          var password = $('#secret').val();
          if(key && password && domain){
            WAYLAY.pushDomainData(domain, key, password, data, resource); 
           } else {
            WAYLAY.pushData(data, resource); 
          }  
    });

    $("#startSimulation").click(function(e){
          e.preventDefault();
          var resource = $('#resource').val();
          var domain = $('#domain').val();
          var key = $('#key').val();
          var password = $('#secret').val();
          var frequency = $('#frequency').val();
          var countToStop = parseInt($('#countToStop').val());
          var count = 0;
          if(key && password && domain){
            if(frequency && simulationData.length > 0){
                timerId = setInterval(function(){ 
                    $("#stopSimulation").prop('disabled', false);
                    $("#startSimulation").prop('disabled', true);
                    count++;
                    if(simulationData.length === 0 || count > countToStop){
                        $("#stopSimulation").prop('disabled', true);
                        $("#startSimulation").prop('disabled', false);
                        clearInterval(timerId);
                    }             
                    else
                        WAYLAY.pushDomainData(domain, key, password, simulationData.shift(), resource); 
                }, frequency * 1000);
            }else{
                WAYLAY.pushDomainData(domain, key, password, data, resource); 
            }
          } else {
            if(frequency && simulationData.length > 0){
                timerId = setInterval(function(){ 
                    $("#stopSimulation").prop('disabled', false);
                    $("#startSimulation").prop('disabled', true);
                    count++;
                    if(simulationData.length === 0 || count > countToStop){
                        $("#stopSimulation").prop('disabled', true);
                        $("#startSimulation").prop('disabled', false);
                        clearInterval(timerId);
                    } 
                    else
                        WAYLAY.pushData(simulationData.shift(), resource); 
                    }, frequency*1000);
            }else{
                WAYLAY.pushData(data, resource); 
            }
          }  
    });
    $("#stopSimulation").click(function(e){
          e.preventDefault();
          clearInterval(timerId);
          $("#stopSimulation").prop('disabled', true);
         $("#startSimulation").prop('disabled', false);
    });
    $("#filename").change(function(e) {
        var ext = $("input#filename").val().split(".").pop().toLowerCase();
        if($.inArray(ext, ["csv"]) == -1) {
            alert('Upload CSV');
            return false;
        }

        if (e.target.files != undefined) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var html = '<table style="width:100%;">';

                var rows = e.target.result.split("\n");
                var params = rows[0].split(",");
                var count = 0;
                rows.forEach(function(row) {
                    var columns = row.split(",");
                    if(count > 0){
                        var measurement = {};
                        columns.forEach(function (col, index){
                            measurement[params[index].trim()] = parseFloat(col).toPrecision(3);
                        });
                        simulationData.push(measurement);
                    }
                    html += "<tr>";
                    columns.forEach(function (col){
                        if(count > 3)
                            return;
                        if(count === 0)
                            html += '<th style="text-align: center;">' + col.trim() + "</th>";
                        else
                            html += "<td>" + parseFloat(col.trim()).toPrecision(3) + "</td>";
                    });
                    count++;
                    html += "</tr>";
                });
                html += "</table>";
                $('#datatable').append(html);

                var settingsHTML = '<label style="width: 90px;text-align: right;" for="frequency">Freq.[s]:</label><input style="width: 300px" type="number" id="frequency" name="frequency" value="1"/>';
                $('#settings').append(settingsHTML);

                var countHTML = '<label style="width: 90px;text-align: right;" for="countToStop">#records:</label><input style="width: 300px" type="number" id="countToStop" name="countToStop" value="' + (rows.length - 1)+'"/>';
                $('#count').append(countHTML);

                $("#simulation").show();
            };
            reader.readAsText(e.target.files.item(0));
        }
        return false;
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
    if($("#toc").length > 0){
        var toc = $("#toc").tocify({
          selectors: "h2,h3,h4,h5",
          extendPage: false
        }).data("toc-tocify");

    }

    $(".optionName").popover({ trigger: "hover" });

    if( $("#navigation .nav").length > 0){
        $("#navigation .nav").tinyNav({
            active: 'selected', // String: Set the "active" class
            label: ''
        });
    }

});
