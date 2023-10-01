import React from 'react'
import AlertContext from '../context/alert/AlertContext'

const Alert = () => {
    const  alertContext  = React.useContext(AlertContext)
    const {alert} = alertContext;
    return (
        <section>
        {alert.type && <div className={`alert alert-primary`} role="alert">
            {alert.type} :  {alert.msg}
        </div>
        }
        </section>
    )
}

export default Alert
