if (!window.WAYLAY) {
  WAYLAY = {
    pushParamValue: function(parameter, value, resource) {
         $.ajax({
           type: "POST",
             crossDomain: true,
             url: "https://data.waylay.io/resources/" + resource,
             headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
             data: JSON.stringify({parameter: value}),
             dataType: "json",
             success: function(data) {
                alert(data.message);
              }, 
             error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              alert("error");
         }
         });  
      },
      pushData: function(data, resource) {
         $.ajax({
           type: "POST",
             crossDomain: true,
             url: "https://data.waylay.io/resources/" + resource,
             headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
             data: JSON.stringify(data),
             dataType: "json",
             success: function(data) {
              }, 
             error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              alert("error");
         }
         });  
      },
      getData: function(resource, callback) {
         $.ajax({
           type: "GET",
             crossDomain: true,
             url: "https://data.waylay.io/resources/" + resource +"/current",
             success: function(data) {
                callback(data);
              }, 
             error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              alert("error");
         }
         });  
      },
      pushDomainParamValue: function(domain, user, pass, parameter, value, resource) {
         $.ajax({
           type: "POST",
             crossDomain: true,
             url: "https://data.waylay.io/resources/" + resource + "?domain=" + domain,
             headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Basic " + btoa(user + ":" + pass)
            },
             data: JSON.stringify({parameter: value}),
             dataType: "json",
             success: function(data) {
                console.log(data.message);
              }, 
             error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              alert("error");
         }
         });  
      },
      pushDomainData: function(domain, user, pass, data, resource) {
         $.ajax({
           type: "POST",
             crossDomain: true,
             url: "https://data.waylay.io/resources/" + resource + "?domain=" + domain,
             headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Basic " + btoa(user + ":" + pass)
            },
             data: JSON.stringify(data),
             dataType: "json",
             success: function(data) {
                console.log(data.message);
             }, 
             error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              alert("error");
         }
         });  
      }
  }
}
