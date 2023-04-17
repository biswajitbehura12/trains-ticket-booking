

const asyncPostCall = async (path,reqBody,type) => {
 
    try {
      let a;
      let token="Bearer "+localStorage.getItem("token");

      if(path == "/trains/train-booking" || path=="/trains/train-ticket-byuser" ){
        a= {
          method: type,
          headers: {
            'Content-Type': 'application/json',
            "Authorization":token
            },
            body: JSON.stringify(reqBody)
          }
      }else
      if(type=="GET"){
      a=  {
          method: type,
          headers: {
            'Content-Type': 'application/json'
            },
          }
      }else{
       a= {
          method: type,
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
          }
      }
        const response = await fetch(`https://booking-ticket-trains.onrender.com${path}`, a
       );
         const data = await response.json();
         return data;
       } catch(error) {
          console.log(error)
         } 
    }
    
    export default asyncPostCall;