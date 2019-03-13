import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Button, Divider, Icon } from 'semantic-ui-react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

import MovieGallery from '../Movie/MovieGallery.js';
import { Header as HeaderCss, Gallery as GalleryCss} from '../Custome.module.scss';

class Home extends Component {
    state = {
        movies: [],
        genres: [],
        filter: "all",
        hasMore: true,
        page: 1
    }

    /* Helper function for making api request */
    getMovieHelper(value, page){
        let newUrl;
        if(value === "" || value === "all"){
            newUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=209b45fafd497a0fdc9b0a2e2f4da457&page='+page;
        } else{
            newUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=209b45fafd497a0fdc9b0a2e2f4da457&page='+page+'&with_genres='+value;
        }
        axios.get(newUrl).then(
            res => {
            if(res.data.page === res.data.total_pages){
                this.setState({hasMore: false});
            }
            /* Get Movie */
            if(page === 1){
                this.setState({movies: res.data.results});
            } else {
                this.setState({movies: this.state.movies.concat(res.data.results)});
            }
        });
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=209b45fafd497a0fdc9b0a2e2f4da457').then(
            res => {
                /* Get Genre list */
                this.setState({genres: res.data.genres, page:1});
            });
        /* Get Movie data */
        this.getMovieHelper("",this.state.page);
    }

    /* Helper function when user change filter */
    handleFilterChange(event, {value}){
        this.setState({filter: value, page:1});
        this.getMovieHelper(value,this.state.page);
    }

    /* Helper function for getting more data, timeout in 1.5s */
    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({page: this.state.page+1});
            this.getMovieHelper(this.state.filter, this.state.page);
        }, 1500);
    }

    render() {
        const { genres } = this.state;
        return (
            <div>
                <div className={HeaderCss}>
                    <h1 className="header">The DBMovie Library</h1>

                    <Link  to="/cs498rk-mp2/search">
                        <Button circular icon="search" color='teal' size="large"/>
                    </Link>

                    <Divider horizontal>
                        <Icon name="pin" size="large" color="grey"/>
                    </Divider>
                </div>

                <div className={GalleryCss}>
                <Grid centered columns={2}>
                    <Grid.Column width={3}>
                        <Menu pointing secondary vertical>
                        <Menu.Item
                            name="All"
                            value="all"
                            active={this.state.filter === "all"}
                            onClick = {this.handleFilterChange.bind(this)}
                            />
                        {genres.map((genre, index) => (
                            <Menu.Item key={index}
                                name={genre.name}
                                value={genre.id}
                                active={this.state.filter === genre.id}
                                onClick = {this.handleFilterChange.bind(this)}
                                />
                        ))}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={13}>
                        <InfiniteScroll
                            dataLength={this.state.movies.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<Icon loading color="teal" name="spinner" size="big"/>}>
                            <MovieGallery movie={this.state.movies}/>
                        </InfiniteScroll>
                    </Grid.Column>
                </Grid>
                </div>
        </div>
    );
  }
}

export default Home;
