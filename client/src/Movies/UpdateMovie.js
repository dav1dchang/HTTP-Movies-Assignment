import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {
    const [updateMovie, setUpdateMovie] = useState(initialState)
    const { id } = useParams()
    const { push } = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setUpdateMovie(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const onChange = e => {
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then(res => {
            props.setMovieList(
                props.movieList.map((movie) => {
                    if(movie.id === id){
                        return res.data
                    }else {
                        return movie
                    } 
                })
            )
            push(`/`)
            setUpdateMovie(initialState)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={onSubmit}>
                <input
                    name='title'
                    type='text'
                    placeholder='Movie title'
                    value={updateMovie.title}
                    onChange={onChange}
                />
                <input
                    name='director'
                    type='text'
                    placeholder='director'
                    value={updateMovie.director}
                    onChange={onChange}
                />
                <input 
                    name='metascore'
                    type='text'
                    placeholder='metascore'
                    value={updateMovie.metascore}
                    onChange={onChange}
                />
                <button>Save your changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie