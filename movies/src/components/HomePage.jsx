import Grid from "@mui/material/Grid2";
import MovieList from "./MovieList";
import {useEffect, useState} from "react";
import Header from "./Header";
import FilterMoviesCard from "./FilterMoviesCard";

export default function HomePage(props){
    // const movies = props.movies;
    const [movies, setMovies] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&include_adult=false&page=1`
        )
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                return json.results;
            })
            .then((movies) => {
                setMovies(movies);
            });
    }, []);

    return (
        <Grid container>
            <Grid size={12}>
                <Header title={"Home Page"} />
            </Grid>
            <Grid container sx={{flex: "500px 1 0"}}>
                <Grid key="find" size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
                    <FilterMoviesCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
};