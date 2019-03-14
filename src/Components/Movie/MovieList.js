import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

import MovieItem from './MovieItem.js';
import { SearchList as SearchListCss} from '../Custome.module.scss';


export default class MovieList extends React.Component {
    render() {
        const metaData = this.props.movielist;
        return (
            <div className={SearchListCss}>
            { metaData.map((meta, index) => (
                <div key={index}>
                    <Grid centered columns={5}>
                    <Grid.Column>
                        <MovieItem movielist={metaData} curIdx = {index}/>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>{meta.title}</h4>
                        <p>Rating: {meta.vote_average}</p>
                    </Grid.Column>
                    </Grid>
                    <Divider />
                </div>
            ))}
            <p>Display results in the first 10 pages...</p>
            </div>


        );
    }
}
