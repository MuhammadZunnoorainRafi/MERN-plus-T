import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div className="mt-24 text-3xl text-center font-bold font-mono tracking-widest text-red-500">
      Page('{location.pathname}') Not Found
    </div>
  );
}

export default NotFound;
