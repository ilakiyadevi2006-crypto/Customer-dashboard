import {useState,useEffect} from "react";
import "./app.css";
const API =""
function app(){
    const[cusname,setCusname]=useState("");
    const[cusId,setCusId]=useState(null);
    const[orderDetails,setOrderDetails]=useState('');
    const[status,setStatus]=useState('');
    const[amount,setAmount]=useState('');
    const[orderdate,setOrderdate]=useState('');
    const[cusNote ,setCusNote]=useState('');
}
async function getCustomer(cusId) {
    const responce = await fetch(API);
    try{
    if(!responce.ok)
        throw new_Error("Request Failed");
        setCustomer(await json());
}
catch(error){
    console.log("Start the backend First");
}

}
useEffect(()=>getCustomer(),[]);
function SearchComponent(){
    const[cusId,setCusId]=useState('');
    const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter something to search.");
      return;
    }
    console.log("Searching for:", cusId);
  };
}
return{

    <div classname:"container">
    <h1>Customer Dashboard!!!</h1>
    <body>
    <input
       type="text"
       placeholder="Enter Search Item"
       value={cusId}
       onChange={(e)=>setCusId(e.target.value)}>
        </input>
       <button onClick={handleSearch}>
       Search
       </button>
       <button onClick={handleClick}>
        {isResolved ? "Yes":"No"}
       </button>
       </body>
       </div>
       }
export default app;



