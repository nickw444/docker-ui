import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, ActiveStateMixin, IndexRoute } from 'react-router'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const Loader = require('react-loader');
const reqwest = require('reqwest');

const DOCKER_HOST = '';

const App = React.createClass({
    mixins: [ActiveStateMixin],
    render: function() {
      return (
        <div>
          <Navbar>
            <Navbar.Brand>
              <Link to="/">Docker-UI</Link>
            </Navbar.Brand>
            <Nav>
            </Nav>
          </Navbar>
          <div id="page" className="container">
            {this.props.children}
          </div>
        </div>
    )
    }
})

const NoMatch = React.createClass({
  render: function() {
    return (<h1>4 oh 4</h1>)
  }
})

const Catalog = React.createClass({
  componentDidMount: function() {
    reqwest({
      url: `${DOCKER_HOST}/v2/_catalog`,
      crossOrigin: true,
      withCredentials: true,
      error: function(err) {console.error(err)},
      success: (body) => {
        this.setState({
          loaded: true,
          repositories: body.repositories,
        });
      }
    });
  },
  getInitialState: function() {
    return {
      loaded: false,
      repositories: []
    }
  },
  render: function() {
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <Panel header="Repositories">
            <ListGroup fill>
              { this.state.repositories.map((repo, key) => {
                return (<Link to={ `/tags/${repo}` } key={key} className="list-group-item">{ repo }</Link>)
              })}
            </ListGroup>
          </Panel>
        </Loader>
      </div>
    )
  }
})

const Tags = React.createClass({
  componentDidMount: function() {
    reqwest({
      url: `${DOCKER_HOST}/v2/${ this.props.params.repo }/tags/list`,
      crossOrigin: true,
      withCredentials: true,
      error: function(err) {console.error(err)},
      success: (body) => {
        this.setState({
          loaded: true,
          tags: body.tags,
        });
      }
    });
  },
  getInitialState: function() {
    return {
      tags: [],
      loaded: false,
    }
  },
  render: function() {
    return (
      <div>
        <h1>{ this.props.params.repo }</h1>
        <Loader loaded={this.state.loaded}>
          <Panel header="Tags">
            <ListGroup fill>
              { this.state.tags.map((tag, key) => {
                return (<ListGroupItem key={key}>{ tag }</ListGroupItem>)
              })}
            </ListGroup>
          </Panel>
        </Loader>
      </div>
    )
  }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Catalog} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/tags/:repo" component={Tags} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById("app"))