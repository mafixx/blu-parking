import { createContext, ReactNode, useContext, useState } from "react";

type TypeUserContext ={
    balance: number;
    avatar: string;
    withdrawBalance: (value: number) => void;
};

const UserContext = createContext<TypeUserContext>(null!);

export function UserProvider({children}: { children: ReactNode}){
    const [balance, setBalance] = useState(1000);
    const [avatar, setAvatar] = useState("https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png");

    function withdrawBalance(value: number){
        if(value > balance){
            throw new Error("Invalid balance");
        }

        setBalance(balance - value);
    }

    return(
        <UserContext.Provider value={{avatar, balance, withdrawBalance}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => useContext(UserContext);