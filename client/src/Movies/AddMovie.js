import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovie = (props) => {
    const [addMovie, setAddMovie] = useState(initialState)

    const onChange = e => {
        setAddMovie({
            ...addMovie,
            id: props.movieList.length + 1,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/movies', addMovie)
        .then(res => {
            console.log(res.data)
            setAddMovie(initialState)
            props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Add Movie</h2>
                <input
                    name='title'
                    type='text'
                    placeholder='Movie title'
                    value={addMovie.title}
                    onChange={onChange}
                />
                <input
                    name='director'
                    type='text'
                    placeholder='director'
                    value={addMovie.director}
                    onChange={onChange}
                />
                <input 
                    name='metascore'
                    type='text'
                    placeholder='metascore'
                    value={addMovie.metascore}
                    onChange={onChange}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie