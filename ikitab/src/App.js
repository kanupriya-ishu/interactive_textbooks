import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserTextbook from "./pages/userTextbook/UserTextbook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import NewBook from "./pages/newBook/NewBook";
import Book from "./pages/book/Book";
import EditBook from "./pages/editBook/EditBook";
import LessonDetail from "./pages/lessonDetail/LessonDetail";
import NewLesson from "./pages/newLesson/NewLesson"
import NavBar from "./components/navBar/NavBar";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
        <Route path="/userTextbooks">
          <UserTextbook />
        </Route>
        <Route path="/newBook">
          <NewBook />
        </Route>
        <Route path="/editBook">
          <EditBook />
        </Route>
        <Route path="/book/:id">
          <Book />
        </Route>
        <Route path="/books/:bookid/lessons/:lesson_id">
          <LessonDetail />
        </Route>
        <Route path="/books/:id/newLesson">
          <NewLesson />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;