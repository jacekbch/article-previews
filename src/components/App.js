import React from 'react';
import { Container } from 'reactstrap';
import Header from './Header';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Container></Container>
            </div>
        );
    }
}