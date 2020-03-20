import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './components/Background/Background';
import Background from './components/Background/Background';

function App() {
  return (
    <div >
      <Background>
        {/* <Container>
          <Router>
            <div>
              <Header />
              <div className="content_div">
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/blog/led-matrix" component={LED_Matrix} />
                <Route exact path="/projects" component={Projects} />
                <Route path="/contact" component={Contact} />
              </div>
            </div>
          </Router>
        </Container> */}
      </Background>
    </div>
  );
}

export default App;
