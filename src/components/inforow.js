import React from 'react'
import {Typography,Card,CardContent} from '@material-ui/core'
import './inforow.css'

function Inforow({title, cases, total,active, isRed, ...props}) {
    return (
        <div className="infoBox">
                <Card
                  onClick={props.onClick}
                  className={`infoBox ${active && "infoBox--selected"} ${
                    isRed && "infoBox--red"
                  }`} >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className='infoBox__cases'>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
            
        </div>
    )
}

export default Inforow
