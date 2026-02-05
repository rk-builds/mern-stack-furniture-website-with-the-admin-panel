import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { createContext } from 'react'

export let LoginContext = createContext()

export default function MainContext({children}) {

  const [id, setId] = useState(Cookies.get('ID') ?? '');

  useEffect(() => {
    if (id) {
      Cookies.set('ID', id);
    } else {
      Cookies.remove('ID'); 
    }
  }, [id]);

  let obj={id,setId}
  return (
    <LoginContext.Provider value={obj}>
      {children}
    </LoginContext.Provider>
  )
}
