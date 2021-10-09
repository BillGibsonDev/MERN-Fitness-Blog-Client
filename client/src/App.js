// styles
import GlobalStyles from "./GlobalStyles";

// react router
import { Route, Switch } from 'react-router-dom';

// pages
import HomePage from "./pages/HomePage";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogMaker from "./pages/BlogMaker";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BlogArticle from "./components/BlogArticle";

function App() {
  return (
    <div className="App">
      <GlobalStyles />

            <Nav />

        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route> 
          
          <Route path="/AboutPage"  exact>
            <AboutPage />
          </Route>
          
          <Route path="/ContactPage" exact>
            <ContactPage />
          </Route>

          <Route path="/BlogMaker" exact>
            <BlogMaker />
          </Route>

          <Route path={["/post/:linkTitle/:id", "/"]}>
            <HomePage />
          </Route>
        </Switch>

      <Footer />
    </div>
  );
}

export default App;
