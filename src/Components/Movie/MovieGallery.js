import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';

import MovieItem from './MovieItem.js';

class MovieGallery extends Component {



    render(){
        const metaData = this.props.movie;

        return (
            <div>
            <Grid columns={5}>
            { metaData.map((meta, index) => (
                <Grid.Column key={index}>
                    <MovieItem movielist={metaData} curIdx = {index}/>
                </Grid.Column>
            ))}
            </Grid>

            </div>

);
}
}

export default MovieGallery;
