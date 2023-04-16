

const asyncPostCall = async (path,reqBody,type) => {
 
    try {
      let a;

      if(path == "/trains/train-booking" || path=="/trains/train-ticket-byuser" ){
        a= {
          method: type,
          headers: {
            'Content-Type': 'application/json',
            Authorization:`Bearer ${localStorage.getItem("token")}`
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
        const response = await fetch(`http://localhost:5000${path}`, a
       );
         const data = await response.json();
         return data;
       } catch(error) {
          console.log(error)
         } 
    }
    
    export default asyncPostCall;