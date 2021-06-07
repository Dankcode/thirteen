import { createContext } from 'react'

export const Direct = createContext({
    didRedirect: false, 
    playerDidRedirect: () => {}, 
    playerDidNotRedirect: () => {}
})