import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom';

export default function AddJobPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.post("/jobs", payload),
    onSuccess: () => {
      toast.success("Job posted succesfully✅");
      queryClient.invalidateQueries({ queryKey: ["my-jobs", user?.email] });
      navigate("/myAddedJobs");
    },
    onError: (err) => toast.error("Job posted failed 🚫"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const jobData = {
      title: form.title.value.trim(),
      userEmail: user?.email, 
      category: form.category.value,
      summary: form.summary.value.trim(),
      coverImage: form.coverImage.value.trim(),
      createdAt: new Date().toISOString(),
    };

    mutate(jobData);
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-base-100 p-10 shadow-2xl rounded-3xl space-y-5">
        <h2 className="text-3xl font-black uppercase text-center mb-6">Add New Job</h2>
        <input name="title" className="input input-bordered w-full" placeholder="Job Title" required />
        <select name="category" className="select select-bordered w-full" required>
          <option value="Web Development">Web Development</option>
          <option value="Graphics Designing">Graphics Designing</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Content Writing">Content Writing</option>
        </select>
        <textarea name="summary" className="textarea textarea-bordered w-full h-32" placeholder="Short Summary" required />
        <input name="coverImage" className="input input-bordered w-full" placeholder="Image URL" required />
        <button type="submit" disabled={isPending} className="btn btn-primary w-full text-white uppercase font-bold">
          {isPending ? "Posting..." : "Post Job Now"}
        </button>
      </form>
    </div>
  );
}
