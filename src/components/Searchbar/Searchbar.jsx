import { useState } from "react";
import {Form,Button,SpanLabel,Input} from './Searchbar.styled'
import propTypes from 'prop-types'


export const Searchbar =({onSubmit}) =>{
    const [query,setQuery] = useState("");



    const handleChange = e =>{
        const q = e.currentTarget.value.toLowerCase().trim();
        setQuery(q)
    }

    const handleSubmit = e =>{
        e.preventDefault();

        onSubmit(query);
        setQuery("")
    }

        return(
            <Form onSubmit={handleSubmit}>
                <Button type='submit'>
                    <SpanLabel>Search</SpanLabel>
                </Button>
                <Input
                type="text"
                name="query"
                onChange={handleChange}
                value={query}
                required
                autoFocus
                placeholder="Type image to find"
                />
            </Form>
        )
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,

}