import React from 'react';
import { Input, Select, Radio, Form, Button, Icon, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MovieList from '../Movie/MovieList.js';
import { Header as HeaderCss, Search as SearchCss} from '../Custome.module.scss';

class SearchMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initialItems: [],
            items: [],
            /* code 0: new search; code 1: have some result; code 2: no result found*/
            stateCode: 0,
            /* Set default result to ascending */
            order: "ascending",
            sort: "title"
        }
    }

    componentDidMount() {
        /*Get movie in the first 5 pages */
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=209b45fafd497a0fdc9b0a2e2f4da457&page=';
        for (let i = 1; i <=5; i+=1){
            axios.get(url+i.toString()).then(
                res => {
                /* Get Movie */
                if(i === 1){
                    this.setState({initialItems: res.data.results});
                } else {
                    this.setState({initialItems: this.state.initialItems.concat(res.data.results)});
                }            });
        }
    }

    /* Helper function to filter movie while user typeing */
    filterMovie(event){
        var curMovieList = this.state.initialItems;
        if(event.target.value === ""){
            this.setState({stateCode: 0});
        } else {
            this.setState({stateCode: 1});
        }
        curMovieList = curMovieList.filter(function(item){
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
            });
        this.setState({items: curMovieList});
        if(curMovieList.length === 0){
            this.setState({stateCode: 2});
        }
    }

    /* Helper function to handle order change */
    handleOrderChange = (event, {value}) => this.setState({order:value})

    /* Helper function to handle sort change */
    handleSortChange = (event, {value}) => this.setState({sort: value})

    render(){
        const options = [
            {key: 1, text: "Title", value: "title"},
            {key: 2, text: "Rating", value: "rating"}
        ]

        let searchRes;
        if(this.state.stateCode === 0){
            searchRes = <h2>Start new search!</h2>
        } else if (this.state.stateCode === 1){
            if (this.state.sort === "rating"){
                if(this.state.order === "ascending"){
                    searchRes = <MovieList movielist={this.state.items.sort(function(a, b){return a.vote_average-b.vote_average})}/>;
                } else{
                    searchRes = <MovieList movielist={this.state.items.sort(function(a, b){return b.vote_average-a.vote_average})}/>;
                }
            }
            else{
                if(this.state.order === "ascending"){
                    searchRes = <MovieList movielist={this.state.items.sort(
                        function(a, b){
                            if(a.title < b.title)
                                return -1;
                            else
                                return 1;})}/>;
                } else {
                    searchRes = <MovieList movielist={this.state.items.sort(
                        function(a, b){
                            if(a.title < b.title)
                                return 1;
                            else
                                return -1;})}/>;
                }
            }
        } else {
            searchRes = <h2>Oops! No result found :(</h2>
        }
        return (
            <div>
                <div className={HeaderCss}>
                    <h1 className="header">The DBMovie Library</h1>
                    <Link to="/cs498rk-mp2/">
                        <Button circular icon="home" color='teal' size="large"/>
                    </Link>
                    <Divider horizontal>
                        <Icon name="pin" size="large" color="grey"/>
                    </Divider>
                </div>

                <Grid centered columns={5}>
                    <Grid.Column>
                        <Input fluid icon='search' iconPosition='left' placeholder='Search...' onChange={this.filterMovie.bind(this)}/>
                    </Grid.Column>

                    <Grid.Column>
                        <Select fluid
                            defaultValue={options[0].value}
                            options={options}
                            onChange={this.handleSortChange}
                            selection />
                    </Grid.Column>

                    <Grid.Column>
                    <Form>
                        <Form.Group inline>
                            <Form.Field
                                control={Radio}
                                label="Ascending"
                                name="orderGroup"
                                value="ascending"
                                checked={this.state.order === "ascending"}
                                onChange={this.handleOrderChange}
                            />

                            <Form.Field
                                control={Radio}
                                label="Descending"
                                name="orderGroup"
                                value="descending"
                                checked={this.state.order === "descending"}
                                onChange={this.handleOrderChange}
                            />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
                <div className={SearchCss}>
                    {searchRes}
                </div>

            </div>
        );
    }
}

export default SearchMovie;
