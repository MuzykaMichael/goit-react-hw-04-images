import { LoadMoreButton, LoadMoreButtonSpan } from "./Button.styled";
import propTypes from 'prop-types'


export const Button = ({onClick}) =>{
    const clickHandler = () =>{
        onClick()
    };
        return <LoadMoreButton onClick={clickHandler}><LoadMoreButtonSpan>Load more!</LoadMoreButtonSpan></LoadMoreButton>
}

Button.propTypes = {
    onClick:propTypes.func.isRequired,
}