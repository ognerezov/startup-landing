import {FC} from "react";
import {PaymentProcessor} from "./PaymentProcessor";
import {ItemContext, PurchasePhase} from "../../context/context";
import {UserContext} from "../../context/userContext";

interface PaymentControllerProps{

}

export const PaymentController : FC<PaymentControllerProps> =()=>{
    return (
        <UserContext.Consumer>{userContext =>(
            <ItemContext.Consumer>{ context =>(
                <PaymentProcessor
                    email={userContext.auth.user!.email!}
                    phase={context.purchasePhase}
                    item={context.context.items![context.selectedItem!]}
                    rentalPeriod={context.rentalPeriod!}
                    onSuccess={()=>{context.setPurchasePhase(PurchasePhase.Payed)}}
                    onClose={()=>{
                        context.setPurchasePhase(PurchasePhase.NotStarted)
                        context.selectItem(undefined)
                    }}/>
            )}
            </ItemContext.Consumer>
        )}
        </UserContext.Consumer>
    )
}
