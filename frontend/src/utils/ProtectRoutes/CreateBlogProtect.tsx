import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/rtkHooks';

function Protect({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}

export default Protect;
