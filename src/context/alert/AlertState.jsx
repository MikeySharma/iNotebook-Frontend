import AlertContext from "./AlertContext";
import {useState} from 'react';

const AlertState = ({children}) => {
    const [alert, setAlert] = useState({msg: '', type: ''});
    const useAlert = (message, type) =>{
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() =>{
            setAlert({
                msg: '',
                type: ''
            })
        }, 1500)
    }

  return (
    <AlertContext.Provider value={{alert, setAlert, useAlert}}>
        {children}  
    </AlertContext.Provider>
  )
}

export default AlertState
