import {FilterValuesType} from "../App";
import '../App.css';


type ButtonPropsType={
    title:string
    callback:()=>void
    filter?:FilterValuesType
}


export const Button=(props:ButtonPropsType)=>{
    const onClickHandler=()=>{
        props.callback()
    }
    return(
        <button className={props.filter===props.title ? "active-filter" :""} onClick={onClickHandler}>{props.title} </button>
    )
}
