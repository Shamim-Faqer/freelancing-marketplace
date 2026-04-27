import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email: e.target.email.value, password: e.target.password.value });
      toast.success("Login successful.");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full text-white">Login</button>
        <Link to="/register" className="text-sm text-center block text-primary">New here? Register</Link>
      </form>
    </div>
  );
}
