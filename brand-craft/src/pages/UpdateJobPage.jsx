import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import Spinner from "../components/Spinner.jsx";

export default function UpdateJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.put(`/jobs/${id}`, payload),
    onSuccess: () => {
      toast.success("Job updated!");
      navigate("/myAddedJobs");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const updatedData = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
    };
    mutate(updatedData);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-10 flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-base-100 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-black mb-6 uppercase">Update Job</h2>
        <input name="title" defaultValue={job?.title} className="input input-bordered w-full mb-4" />
        <select name="category" defaultValue={job?.category} className="select select-bordered w-full mb-4">
          <option>Web Development</option>
          <option>Digital Marketing</option>
          <option>Graphics Designing</option>
        </select>
        <textarea name="summary" defaultValue={job?.summary} className="textarea textarea-bordered w-full mb-4 h-32" />
        <input name="coverImage" defaultValue={job?.coverImage} className="input input-bordered w-full mb-4" />
        <button className="btn btn-primary w-full uppercase" disabled={isPending}>{isPending ? "Saving..." : "Update Job"}</button>
      </form>
    </div>
  );
}
