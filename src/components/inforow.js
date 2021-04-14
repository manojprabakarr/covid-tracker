import React from 'react'
import {Typography,Card,CardContent} from '@material-ui/core'

function Inforow({title, cases, total}) {
    return (
        <div className="infoBox">
                <Card >
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
