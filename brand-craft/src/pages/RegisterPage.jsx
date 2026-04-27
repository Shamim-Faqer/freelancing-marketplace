import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth.js";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.password.value.length < 6) return toast.error("Min 6 chars required");

    try {
      await register({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
      });
      toast.success("Registration successful.");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleRegister} className="card w-96 bg-base-100 shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full text-white">Register</button>
      </form>
    </div>
  );
}
