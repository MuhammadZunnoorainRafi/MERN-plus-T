import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div>
      <Helmet>
        <title>Not Found - Blogverse</title>
      </Helmet>
      <div className="mt-24 text-3xl text-center font-bold font-mono tracking-widest text-red-500">
        Page('{location.pathname}') Not Found
      </div>
    </div>
  );
}

export default NotFound;
