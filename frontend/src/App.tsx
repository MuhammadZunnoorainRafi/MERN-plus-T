import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import UpdateUser from './pages/UpdateUser';
import NotFound from './pages/NotFound';
import useLocalStorage from 'use-local-storage';
import CreatePost from './pages/CreatePost';
import BlogScreen from './pages/BlogScreen';
import Protect from './utils/ProtectRoutes/CreateBlogProtect';
import SingleBlogScreen from './pages/SingleBlogScreen';
import LinkProfile from './pages/LinkProfile';
import LinkProfileBlogEdit from './pages/LinkProfileBlogEdit';
import About from './pages/About';

function App() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
  const queryClient = new QueryClient();

  const [darkTheme, setDarkTheme] = useLocalStorage('theme', 'light');

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer position="bottom-center" />
          <div
            data-theme={darkTheme}
            className="flex flex-col min-h-screen justify-between "
          >
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <main className="p-2 mb-auto mt-2">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/upd-user"
                  element={
                    <Protect>
                      <UpdateUser />
                    </Protect>
                  }
                />
                <Route
                  path="/create-post"
                  element={
                    <Protect>
                      <CreatePost />
                    </Protect>
                  }
                />
                <Route path="/blogs" element={<BlogScreen />} />
                <Route path="/blogs/:id" element={<SingleBlogScreen />} />
                <Route path="/profile/:id" element={<LinkProfile />} />
                <Route
                  path="/profile/blog/:id/edit"
                  element={
                    <Protect>
                      <LinkProfileBlogEdit />
                    </Protect>
                  }
                />
                <Route path="/*" element={<NotFound />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
