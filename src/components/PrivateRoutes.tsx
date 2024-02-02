import { Navigate } from "react-router-dom";
const PrivateRoutes = ({ isSignedIn, children }) => {
  return isSignedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default PrivateRoutes;

