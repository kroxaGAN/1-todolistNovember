import {FilterValuesType} from "../App";
import '../App.css';
import { IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type ButtonPropsType = {
    title?: string
    callback: () => void
    filter?: FilterValuesType
}


export const ButtonUniver = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return (

    // <Button
    //     variant="text"
    //     onClick={onClickHandler}
    //     style={{maxWidth: '100px', maxHeight: '100px', minWidth: '30px', minHeight: '30px', margin: '5px'}}
    //     color={props.filter === props.title ? 'success' : 'secondary'}
    // >{props.title}</Button>
        <IconButton
            onClick={onClickHandler}
            color={props.filter === props.title ? 'success' : 'secondary'}
        >
            <AddBox name={props.title}/>
        </IconButton>


)
}
