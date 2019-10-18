import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FileButton from './components/FileButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/custom.css';
import * as Bootstrap from 'react-bootstrap';

ReactDOM.render(
  <div className={'main bg-main'}>
    <Bootstrap.Nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
      <Bootstrap.Container>
        <a className="navbar-brand" href="#">
          Start Bootstrap
        </a>
        <Bootstrap.Nav.Item>
          <Bootstrap.Nav.Link href="/home">Active</Bootstrap.Nav.Link>
        </Bootstrap.Nav.Item>
        <Bootstrap.Nav.Item>
          <Bootstrap.Nav.Link eventKey="link-1">Link</Bootstrap.Nav.Link>
        </Bootstrap.Nav.Item>
        <Bootstrap.Nav.Item>
          <Bootstrap.Nav.Link eventKey="link-2">Link</Bootstrap.Nav.Link>
        </Bootstrap.Nav.Item>
        <Bootstrap.Nav.Item>
          <Bootstrap.Nav.Link eventKey="disabled" disabled>
            Disabled
          </Bootstrap.Nav.Link>
        </Bootstrap.Nav.Item>
      </Bootstrap.Container>
    </Bootstrap.Nav>
    <section>
      <Bootstrap.Container fluid={true}>
        <Bootstrap.Col lg={{ span: 8, offset: 2 }}>
          <Bootstrap.Row>
            <h1 className="mt-5">Draw your google maps timeline</h1>
            <p>
              App for drawing a path between all the GPS Point that google
              knows. See Getting Started for extracting your data from google.
            </p>
          </Bootstrap.Row>
        </Bootstrap.Col>
        <Bootstrap.Col lg={{ span: 2, offset: 5 }}>
          <Bootstrap.Row>
              <FileButton/>
          </Bootstrap.Row>
        </Bootstrap.Col>
        <Bootstrap.Col lg={{ span: 4, offset: 4 }}>
          <Bootstrap.Row>
              <FileButton/>
          </Bootstrap.Row>
        </Bootstrap.Col>
        <Bootstrap.Col lg={{ span: 2, offset: 5 }}>
          <Bootstrap.Row>
              <FileButton/>
          </Bootstrap.Row>
        </Bootstrap.Col>
      </Bootstrap.Container>
    </section>
  </div>,
  document.getElementById('root')
);
