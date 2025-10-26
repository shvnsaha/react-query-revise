import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import PostsTraditional from "./components/PostsTraditional"
import Home from "./pages/Home"
import PostRQ from "./components/PostRQ"
import './App.css';


function App() {


  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Traditional Posts</Link>
              </li>
              <li>
                <Link to="/rq-posts">RQ Posts</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/posts' element={<PostsTraditional />} />
            {/* <Route exact path='/posts/:postId' element={<PostDetails />} /> */}
            <Route exact path='/rq-posts' element={<PostRQ />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
