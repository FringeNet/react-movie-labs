import Grid from "@mui/material/Grid2";
import MovieCard from "./MovieCard";

export default function MovieList(props){
    return props.movies.map((m) => (
        <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
            <MovieCard key={m.id} movie={m}/>
        </Grid>
    ));
}