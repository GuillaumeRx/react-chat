import React from 'react';
import Formulaire from './Formulaire';
import Message from './Message';
import base from '../base';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animations.css';

class App extends React.Component {

    state = {
        messages: {}
    }

    componentWillMount() {
        this.ref = base.syncState('/messages', {
            context: this,
            state: 'messages'
        });
    }

    componentDidUpdate() {
        //Sticky scroll
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    addMessage = message => {
        // Copier le state
        const messages = {...this.state.messages};
        // Ajouter le message avec une clé timestamp
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;
        // Supprimer si plus de 10 messages
        Object.keys(messages).slice(0, -10).map(key => messages[key] = null);
        // Mettre ajoute le State
        this.setState({ messages });

    };

    isUser = (pseudo) => {
        return pseudo === this.props.params.pseudo;
    };

    render() {

    const messages = Object.keys(this.state.messages).map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />);

        return(
            <div className="box">
                <div className="messages" ref={input => this.messages = input}>
                    <ReactCSSTransitionGroup
                        component="div"
                        className="message"
                        transitionName="message"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                    {messages}
                    </ReactCSSTransitionGroup>
                </div>
                <Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140} />
            </div>
        );
    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

}

export default App;