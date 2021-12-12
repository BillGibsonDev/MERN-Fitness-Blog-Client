// styles
import GlobalStyles from "./GlobalStyles";

// react router
import { Route, Switch } from 'react-router-dom';

// pages
import HomePage from "./pages/HomePage";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogArticle from "./pages/BlogArticle";
import CreateUser from "./pages/CreateUser.js";
import EditPostPage from "./pages/EditPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";



function App() {
  return (
    <div className="App">
      <GlobalStyles />

        <Nav />

        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route> 
          
          <Route path="/AboutPage" exact>
            <AboutPage />
          </Route>
          
          <Route path="/ContactPage" exact>
            <ContactPage />
          </Route>

          <Route path="/CreatePostPage" exact>
            <CreatePostPage />
          </Route>

          <Route path="/EditPostPage/:postId" exact>
            <EditPostPage />
          </Route>

          <Route path="/CreateUser" exact>
            <CreateUser />
          </Route>

          <Route path="/SignUpPage" exact>
            <SignUpPage />
          </Route>

          <Route path="/LoginPage" exact>
            <LoginPage />
          </Route>

          <Route path={["/post/:linkTitle/:id", "/"]}>
            <BlogArticle />
          </Route>
        </Switch>

      <Footer />
    </div>
  );
}

export default App;
