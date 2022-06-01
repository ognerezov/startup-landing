import React, {FC} from 'react'
import EmailDialog from "../dialogs/EmailDialog";

interface CategoryViewerProps {
    id : string
    title : string
    onExit : ()=>void
}

export const CategoryViewer : FC<CategoryViewerProps> = props => {
    return props.id ? <EmailDialog
        title={props.title}
        isOpen={true}
        onClose={props.onExit}
        onSuccess={props.onExit}/> : null
}