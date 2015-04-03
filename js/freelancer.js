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
var chartData = {};
var myLineChart;
var ctx;

var enableSimulation = function(){
    $("#stopSimulation").prop('disabled', false);
    $("#startSimulation").prop('disabled', true);
    $("#measurementPanel").fadeOut(2000);
    $("#settingsPanel").fadeOut(2000);
    $("#simulationSettings").fadeOut(2000);
};

var disableSimulation = function(){
    $("#stopSimulation").prop('disabled', true);
    $("#startSimulation").prop('disabled', false);
    $("#measurementPanel").fadeIn(2000);
    $("#settingsPanel").fadeIn(2000);
    $("#simulationSettings").fadeIn(2000);
};

var randomColorGeneator = function () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};

$(document).ready(function(){ 
    $('#myChart').css('width', $(window).width()/3+'px');
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
          if(myLineChart && myLineChart.datasets && myLineChart.datasets.length > 0){
            while(myLineChart.datasets[0].points.length > 0)
                myLineChart.removeData();
          }
          //chartData["labels"] = [1, 2, 3, 4, 5, 6, 7];
          if(key && password && domain){
            if(frequency && simulationData.length > 0){
                timerId = setInterval(function(){ 
                    enableSimulation();
                    count++;
                    if(simulationData.length === 0 || count > countToStop){
                        disableSimulation();
                        clearInterval(timerId);
                    }             
                    else{
                        if(count > simulationData.length - 1)
                            count = 0;
                        WAYLAY.pushDomainData(domain, key, password, simulationData[count], resource); 
                        var point = simulationData[count];
                        var date = new Date();
                        myLineChart.addData(_.values(point),date.getHours() + ":" + date.getMinutes() +":" +date.getSeconds());
                        if(count > 20)
                            myLineChart.removeData();
                    }
                        
                }, frequency * 1000);
            }
          } else {
            if(frequency && simulationData.length > 0){
                timerId = setInterval(function(){ 
                    enableSimulation();
                    count++;
                    if(simulationData.length === 0 || count > countToStop){
                        disableSimulation();
                        clearInterval(timerId);
                    } 
                    else {
                        if(count > simulationData.length - 1)
                            count = 0;
                        WAYLAY.pushData(simulationData[count], resource);
                        var point = simulationData[count];
                        var date = new Date();
                        myLineChart.addData(_.values(point), date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds());
                        if(count > 20)
                            myLineChart.removeData();

                    }
                    }, frequency*1000);
            }
          }  
    });
    $("#stopSimulation").click(function(e){
        e.preventDefault();
        clearInterval(timerId);
        disableSimulation();
    });
    $("#filename_json").change(function(e) {
        var ext = $("input#filename_json").val().split(".").pop().toLowerCase();
        if($.inArray(ext, ["json"]) == -1) {
            alert('Upload JSON');
            return false;
        }

        if (e.target.files != undefined) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var settings = JSON.parse(e.target.result);
                $('#domain').val(settings.domain);
                $('#key').val(settings.key);
                $('#secret').val(settings.secret);
            };
            reader.readAsText(e.target.files.item(0));
        }
        return false;
    });
    $("#filename_csv").change(function(e) {
        var ext = $("input#filename_csv").val().split(".").pop().toLowerCase();
        if($.inArray(ext, ["csv"]) == -1) {
            alert('Upload CSV');
            return false;
        }

        if (e.target.files != undefined) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var html = '<div id="datatable"> <table style="width:100%;">';

                var rows = e.target.result.split("\n");
                var params = rows[0].split(",");
                chartData = {labels : [], datasets:[]};
                var k =0;
                params.forEach(function(param){
                    chartData["datasets"][k++] = {
                        label: param, 
                        data:[],
                        fillColor: "rgba(230,220,220,0.1)",
                        strokeColor: randomColorGeneator(), 
                        highlightFill: randomColorGeneator(),
                        highlightStroke: randomColorGeneator()
                    };
                });
                if($("#myChart").length > 0)
                    ctx = $("#myChart").get(0).getContext("2d");
                myLineChart = new Chart(ctx).Line(chartData);
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
                html += "</table></div>";
                $('#datatable').replaceWith(html);

                var settingsHTML = '<div id="settings"><label style="width: 90px;text-align: right;" for="frequency">Freq.[s]:</label><input style="width: 300px" type="number" id="frequency" name="frequency" value="1"/></div>';
                $('#settings').replaceWith(settingsHTML);

                var countHTML = '<div id="count"><label style="width: 90px;text-align: right;" for="countToStop">#records:</label><input style="width: 300px" type="number" id="countToStop" name="countToStop" value="' + (rows.length - 1)+'"/></div>';
                $('#count').replaceWith(countHTML);

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

    $(".optionName").popover({ trigger: "hover" });

    var toc = $("#toc").tocify({
          selectors: "h2,h3,h4,h5",
          extendPage: false
        }).data("toc-tocify");

    $("#navigation .nav").tinyNav({
            active: 'selected', // String: Set the "active" class
            label: ''
        });

});
