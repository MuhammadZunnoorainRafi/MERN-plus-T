import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className=" homeBgGradient p-2 pt-20 rounded-lg min-h-[74vh] ">
      <Helmet>
        <title>Home - Blogverse</title>
      </Helmet>
      <div className=" flex min-h-[40vh] rounded-xl shadow-xl drop-shadow-lg backdrop-blur-xl bg-slate-50/20 max-w-xl  mx-auto flex-col items-center space-y-2 justify-center">
        <h1 className="font-bold mb-0 text-slate-800 text-xl md:text-3xl font-mono">
          Welcome to Blogverse 😃
        </h1>
        <Link
          className=" text-lg  text-white bg-blue-700 hover:bg-blue-900 tracking-widest btn btn-wide glass"
          to="/create-post"
        >
          Create Blog
        </Link>
        <Link
          className=" text-lg  tracking-widest btn btn-wide  bg-emerald-700 hover:bg-emerald-900 text-white glass"
          to="/blogs"
        >
          View Blogs
        </Link>
      </div>
    </div>
  );
}

export default Home;
