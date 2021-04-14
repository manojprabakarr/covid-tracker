import React from 'react'
import './tabledata.css'
import numeral from 'numeral'



function Tabledata({countries}) {
    return (
        <div className="table">
           {countries.map((country)=> (
               <tr>
                   <td>{country.country}</td>
                   <td>
                       <strong>
                       {numeral(country.cases).format("0,0")}
                       </strong>
                   </td>

               </tr>


           ))}
            
        </div>
    )
}

export default Tabledata
