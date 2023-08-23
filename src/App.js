import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { PostsContext } from "./context/PostsContext";
import { PostDetailContext } from './context/PostDetailContext';

import NewAccount from './pages/NewAccount';
import HomePage from "./pages/HomePage";
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import LogIn from './pages/LogIn';
import AddPost from './pages/AddPost';
import DetailPage from './pages/DetailPage';
import { PostCommentContext } from './context/PostCommentContext';
import MyPost from './pages/MyPost';
import ModPost from './pages/ModPost';
import Success from './pages/Success';


function App() {
  return (
    <PostsContext>
      <PostDetailContext>
        <PostCommentContext>
          <BrowserRouter>
            <Routes>
              <Route
                exact path='/'
                element={<LogIn />}
              />
              <Route
                path='/newAccount'
                element={<NewAccount />}
              />
              <Route 
                path="/success/:token" 
                element={<Success />} />
              <Route element={<ProtectedRoutes/>}>
                <Route
                  path='/home'
                  element={<HomePage/>} />
                  <Route
                  path='/addPost'
                  element={<AddPost/>} />
                  <Route
                  path='/modPost/:postId'
                  element={<ModPost/>} />
                  <Route
                  path='/detail/:postId'
                  element={<DetailPage/>} />
                  <Route
                  path='/myPost'
                  element={<MyPost/>} />
                  
                </Route>
            </Routes>
          </BrowserRouter>
        </PostCommentContext>
      </PostDetailContext>
    </PostsContext>
  );
}

export default App;
