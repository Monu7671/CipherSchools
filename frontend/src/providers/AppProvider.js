import React, { createContext, useState } from 'react'



export const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState()
    const [showSignInModal, setShowSignInModal] = useState(false)
    return (
        <AppContext.Provider
            value={{



                userData,
                setUserData: (value) => setUserData(value),
                showSignInModal,
                setShowSignInModal: (value) => setShowSignInModal(value),
                // getUserData: () => getUserData()


            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider