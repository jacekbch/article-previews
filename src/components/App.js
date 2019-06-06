import React from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import ArticlesList from './ArticlesList';

const App = () => (
    <div>
        <Header />
        <Container>
            <ArticlesList />
        </Container>
    </div>
);

export default App;