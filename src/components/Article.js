import React from 'react';
import './../scss/Article.scss';

const Article = ({image, title, preamble, date}) => (
    <article className="article-box">
        <div className="img" style={{backgroundImage: `url(${image})`}} />
        <div className="content">
            <div className="header">
                <div className="title">{title}</div>
                <div className="date">{date}</div>
            </div>
            <div className="preamble">{preamble}</div>
        </div>
    </article>
);

export default Article;