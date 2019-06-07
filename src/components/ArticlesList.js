import React from 'react';
import Axios from 'axios';
import { SERVER_URL, MONTHS_NAMES_NO, CATEGORY_DATASOURCE_MAP } from './../constants';
import { Label, Input } from 'reactstrap';
import Article from './Article';
import './../scss/ArticlesList.scss';

export default class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            error: false,
            dataSources: {
                sports: true,
                fashion: false
            },
            sortByDate: 'desc'
        };
    }

    componentDidMount() {
        const articlesPromises = [
            this.getArticles('sports'),
            this.getArticles('fashion')
        ];

        this.setState({ loading: true });
        Promise.all(articlesPromises)
            .then(response => {
                const articles = response.reduce((all, current) => (all.push(...current), all), []);
                this.setState({ articles, error: false, loading: false });
            })
            .catch(() => {
                this.setState({ error: true, loading: false });
            });
    }

    getArticles(type) {
        return Axios.get(`${SERVER_URL}/articles/${type}`)
            .then(response => response.data.articles);
    }

    onDataSourceChange(type, event) {
        this.setState({
            dataSources: {
                ...this.state.dataSources,
                [type]: event.target.checked
            }
        });
    }

    toggleSortByDate(event) {
        event.preventDefault();
        this.setState({
            sortByDate: this.state.sortByDate === 'asc' ? 'desc' : 'asc'
        });
    }

    getDateTimestamp(date) {
        const dateParts = date.split(' ');
        const day = dateParts[0].replace('.', '');
        const month = MONTHS_NAMES_NO.indexOf(dateParts[1]);
        const year = dateParts[2];
        return new Date(year, month, day).getTime() / 1000;
    }

    render() {
        let articles = [...this.state.articles];

        articles = articles.filter(a => this.state.dataSources[CATEGORY_DATASOURCE_MAP[a.category]]);
        articles = articles.sort((a, b) => {
            const revert = this.state.sortByDate === 'asc' ? 1 : -1;
            return (this.getDateTimestamp(a.date) - this.getDateTimestamp(b.date)) * revert;
        });

        return (
            <div className="articles-list">
                <div className="data-sources">
                    <h6>Data sources:</h6>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={this.state.dataSources.fashion}
                            onChange={event => this.onDataSourceChange('fashion', event)}
                        />
                        Fashion
                    </Label>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={this.state.dataSources.sports}
                            onChange={event => this.onDataSourceChange('sports', event)}
                        />
                        Sports
                    </Label>
                </div>
                <div className="sort">
                    <a href="#" onClick={event => this.toggleSortByDate(event)}>
                        Sort by date
                    </a>
                    { this.state.sortByDate === 'asc' ? <span>&uarr;</span> : <span>&darr;</span> }
                </div>
                <div className="articles">
                    {articles.map(article =>
                        <Article
                            key={article.id}
                            image={article.image}
                            title={article.title}
                            preamble={article.preamble}
                            date={article.date}
                        />
                    )}
                    {articles.length === 0 && !this.state.loading && !this.state.error &&
                        <div className="no-articles">No articles to display.</div>}
                    {this.state.loading && <div className="loading">Loading...</div>}
                    {this.state.error && <div className="error">Server error. Please try again.</div>}
                </div>
            </div>
        );
    }
}