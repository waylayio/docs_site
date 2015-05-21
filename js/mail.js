if (!window.MAIL) {
  MAIL = {
    sendMail: function(user) {
       var message = {
        key: "5aua0geSdN677OPe6KAWWw",
        message: {
            text: "new docker user " + user,
            subject: "new download request" ,
            from_email: user,
            from_name: user,
            to: [
                {
                    email: "support@waylay.io",
                    name: "waylay",
                    type: "to"
                }
            ],
            headers: {
                "Reply-To": user
            },
        }
      };

      $.ajax({
        type: "POST",
           crossDomain: true,
           url: "https://mandrillapp.com/api/1.0/messages/send.json",
           headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
           data: JSON.stringify(message),
           dataType: "json",
           success: function(data) {
              console(data);
            }, 
           error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
         }
        });

    }
  }
}