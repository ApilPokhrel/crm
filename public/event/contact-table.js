   

   class Contact{


       constructor(){}
       contactTable(){
        

        $.ajax({
            url:`http://localhost:3020/api/v1/admin/event/contacts`,
            headers:{access_token: $.cookie('access_token')},
            method:'GET',
          
        })
        .done(d => {
          console.log(d);
          let table = '';
          d.forEach(e => {
             table += `<tr>
              <td>${e.username}</td>
              <td>${e.email}</td>
              <td>${e.slug}</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
            </tr>`;
          });
        //   document.getElementById('contactData').innerHTML = table;
        })
        .fail(e=>{
            console.log(e.responseJSON);
  
        })
       }
   }