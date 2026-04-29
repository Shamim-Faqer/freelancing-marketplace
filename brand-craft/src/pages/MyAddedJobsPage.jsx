import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import Spinner from "../components/Spinner.jsx";

export default function MyAddedJobsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["my-jobs", user?.email],
    queryFn: async () => {
      const res = await api.get(`/my-jobs?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: deleteJob, isPending } = useMutation({
    mutationFn: (id) => api.delete(`/jobs/${id}`),
    onSuccess: () => {
      toast.success("Deleted!");
      queryClient.invalidateQueries({ queryKey: ["my-jobs", user?.email] });
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black uppercase mb-8 text-primary">My Posted Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="card bg-base-100 shadow-xl border border-base-300">
              <figure className="h-40"><img src={job.coverImage} className="w-full h-full object-cover" alt="job" /></figure>
              <div className="card-body">
                <h3 className="card-title font-bold uppercase">{job.title}</h3>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/updateJob/${job._id}`} className="btn btn-outline btn-xs">Edit</Link>
                  <button className="btn btn-error btn-xs" onClick={() => window.confirm("Sure?") && deleteJob(job._id)} disabled={isPending}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
