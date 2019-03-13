import React, { Component } from 'react';
import { Item, Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import MovieDetail from '../Detail/MovieDetail.js';
import { nextButton as NextButtonCss} from '../Custome.module.scss';


class MovieItem extends Component {

    state = {
        open:false,
        curIdx : this.props.curIdx
    }

    show = dimmer => () => this.setState({dimmer, open: true})
    close = () => this.setState({open:false})
    pre= () => this.setState({curIdx: this.state.curIdx - 1})
    next= () => this.setState({curIdx: this.state.curIdx + 1})

    render() {
        const { open, dimmer, curIdx } = this.state;
        const movieList = this.props.movielist;
        const movie = movieList[this.props.curIdx];

        /* Check curIdx boundary */
        let preButton, nextButton;
        if(curIdx === 0){
            preButton = <Button content="PREVIOUS" floated='left' icon="left arrow" disabled/>;
            nextButton = <Button content="NEXT" floated='right' icon="right arrow" labelPosition="right" onClick={this.next}/>;
        } else if (curIdx === movieList.length-1){
            preButton = <Button content="PREVIOUS" floated='left' icon="left arrow" labelPosition="left" onClick={this.pre}/>;
            nextButton = <Button content="NEXT" floated='right' icon="right arrow" disabled/>;
        } else{
            preButton = <Button content="PREVIOUS" floated='left' icon="left arrow" labelPosition="left" onClick={this.pre}/>;
            nextButton = <Button content="NEXT" floated='right' icon="right arrow" labelPosition="right" onClick={this.next}/>;
        }

        /* Check for invalid movie poster url */
        let posterUrl;
        if(movie.poster_path === null){
            posterUrl = require("../movie_poster_placeholder.png");
        } else {
            posterUrl = "http://image.tmdb.org/t/p/w154/" + movie.poster_path;
        }

        return (
            <div>
            <Item onClick={this.show('inverted')}>
                <Item.Image src={posterUrl} />
            </Item>

            <Modal open={open} dimmer={dimmer} onClose={this.close}>
                <Modal.Content>
                    <MovieDetail movielist={movieList} curIdx={curIdx}/>
                </Modal.Content>

            <div className={NextButtonCss}>
                {preButton}
                {nextButton}
            </div>

            </Modal>
            </div>
        );
    }
}

MovieItem.propTypes = {
    curIdx: PropTypes.number,
    movieList: PropTypes.array
}

export default MovieItem;
