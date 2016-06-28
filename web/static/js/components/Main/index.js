import React from "react";
import { connect } from "react-redux";
import Avatar from 'react-toolbox/lib/avatar';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


class Main extends React.Component {
  render() {
    const { visitors } = this.props;
    return <main role="main">
      <div className="jumbotron">
        <h2>Welcome to Phoenix!</h2>
        <p className="lead">A productive web framework that<br />does not compromise speed and maintainability.</p>
        <div><Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" /></div>
      </div>

      <div className="row marketing">
        <div className="col-lg-12 col-lg-offset-4">
          <h3>Visitors:</h3>
        </div>
      </div>
      <div className="row marketing">
        <div className="col-lg-4">
          <h3>Total: {visitors.total}</h3>
        </div>
        <div className="col-lg-4">
          <h3>Max. online: {visitors.max_online}</h3>
        </div>
        <div className="col-lg-4">
          <h3>Online: {visitors.online}</h3>
        </div>
      </div>

      <div className="row marketing">
        <div className="col-lg-6">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="http://phoenixframework.org/docs/overview">Guides</a>
            </li>
            <li>
              <a href="http://hexdocs.pm/phoenix">Docs</a>
            </li>
            <li>
              <a href="https://github.com/phoenixframework/phoenix">Source</a>
            </li>
          </ul>
        </div>

        <div className="col-lg-6">
          <h4>Help</h4>
          <ul>
            <li>
              <a href="http://groups.google.com/group/phoenix-talk">Mailing list</a>
            </li>
            <li>
              <a href="http://webchat.freenode.net/?channels=elixir-lang">#elixir-lang on freenode IRC</a>
            </li>
            <li>
              <a href="https://twitter.com/elixirphoenix">@elixirphoenix</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="row marketing">
        <Card style={{width: '350px'}}>
          <CardTitle
            avatar="https://placeimg.com/80/80/animals"
            title="Avatar style title"
            subtitle="Subtitle here"
          />
          <CardMedia
            aspectRatio="wide"
            image="https://placeimg.com/800/450/nature"
          />
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
          <CardText>blaaa text</CardText>
          <CardActions>
          </CardActions>
        </Card>
      </div>
    </main>;
  }
};

const mapStateToProps = (state) => {
  return {
    visitors: state.visitors
  };
};
export default connect(mapStateToProps)(Main);