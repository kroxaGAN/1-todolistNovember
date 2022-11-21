import {FilterValuesType} from "../App";
import '../App.css';
import {Button} from "@mui/material";


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

    <Button
        variant="contained"
        className={props.filter === props.title ? "active-filter" : ""}
        onClick={onClickHandler}
        style={{maxWidth: '100px', maxHeight: '100px', minWidth: '30px', minHeight: '30px', margin: '5px'}}
    >{props.title}</Button>
)
}
