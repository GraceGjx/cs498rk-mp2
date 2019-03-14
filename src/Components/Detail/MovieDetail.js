import React, { Component } from 'react';
import { Image, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class MovieDetail extends Component {

    render(){
        const movieList = this.props.movielist;
        const curIdx = this.props.curIdx;
        const movie = movieList[curIdx];

        /* Check for invalid movie poster url */
        let posterUrl;
        if(movie.poster_path === null){
            posterUrl = require("../movie_poster_detail_placeholder.png");
        } else {
            posterUrl = "https://image.tmdb.org/t/p/w342/" + movie.poster_path;
        }

        return (
            <div>
            <Grid padded columns={2}>
            <Grid.Column width={8}>
                <Image src={posterUrl} />
            </Grid.Column>

            <Grid.Column width={8}>
                <h3>{movie.title}</h3>
                <p><Icon name="calendar alternate"/>
                Release: {movie.release_date}</p>
                <p><Icon name="thumbs up outline"/>Rate: {movie.vote_average}</p>
                <p><Icon name="film"/>Overview: </p>
                <p>{movie.overview}</p>
            </Grid.Column>

            </Grid>
            </div>

        );
    }
}

MovieDetail.propTypes = {
    curIdx: PropTypes.number,
    movieList: PropTypes.array
}

export default MovieDetail;
