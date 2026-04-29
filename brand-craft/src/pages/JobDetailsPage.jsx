import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import Spinner from "../components/Spinner.jsx";

export default function JobDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job-details", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data;
    },
  });

  const { mutate: acceptTask, isPending } = useMutation({
    mutationFn: (taskData) => api.post("/accepted-tasks", taskData),
    onSuccess: () => {
      toast.success("Job Accepted Successfully! ✅");
      navigate("/my-accepted-tasks");
    },
    onError: () => toast.error("Failed to accept.")
  });

  const handleAccept = () => {
    if (user?.email === job?.userEmail) return toast.error("You can't accept your own job!");

    const taskData = {
      jobId: job?._id,
      title: job?.title,
      email: user?.email,
      coverImage: job?.coverImage,
      status: "Accepted",
      acceptedAt: new Date().toISOString()
    };
    acceptTask(taskData);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card bg-primary-content shadow-2xl border border-base-300 overflow-hidden rounded-3xl">
        <figure className="h-72 md:h-96">
          <img src={job?.coverImage} className="w-full h-full object-cover" alt="job" />
        </figure>
        <div className="card-body p-10">
          <div className="badge badge-primary font-bold uppercase mb-2">{job?.category}</div>
          <h2 className="card-title text-4xl font-black uppercase mb-4">{job?.title}</h2>
          <p className="text-lg text-base-content/70 leading-relaxed mb-10">{job?.summary}</p>
          <div className="card-actions justify-end">
            <button onClick={handleAccept} disabled={isPending} className="btn btn-success btn-soft btn-lg font-black uppercase px-12">
              {isPending ? "Processing..." : "Accept This Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
