import React, { useState, useEffect } from 'react';
import axios from 'axios'


function GetData() {
    const [items , setitems] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(true);

    useEffect(()=>{
        const fetchItems = async()=>{
            

            try {
                
            const response = await axios.get("http://localhost:3000/Recipes");
            // sendData(response.data)
            setitems(response.data);
            console.log(response.data);
            setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }

        }
        fetchItems();
       
    },[])

    if (loading) return <p>Loading...</p>;
   
   

  return (
    <div>
        <h1>Database Items</h1>
        {
            items.length === 0 ? 
                <p>No items found</p>
            :
                <ul>
              {items.map((item,index)=>(
                   
                <li key={index}>{item.name}</li>
                        
                ))}
                </ul>
            
        }
      
      
    </div>
  )
}

export default GetData
