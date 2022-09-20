import {FC} from "react";
import {UserGateway} from "../authorization/UserGateway";
import {UserContext} from "../../context/userContext";
import {OwnerItems} from "./OwnerItems";

interface OwnerPageProps{
    setOwnerMode : (val :boolean)=>void
}

export const OwnerPage : FC<OwnerPageProps> = ({setOwnerMode})=>{
    return <UserGateway quit={()=>{setOwnerMode(false) }}>
        <UserContext.Consumer>{
            context=><OwnerItems token={context.auth.token!}/>
        }</UserContext.Consumer>
    </UserGateway>
}
