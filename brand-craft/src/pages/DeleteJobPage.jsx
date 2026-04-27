import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";

export default function DeleteJobPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/jobs/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Job deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      navigate("/myAddedJobs");
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Delete failed."),
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-error/20 overflow-hidden">
        <div className="h-2 bg-error w-full"></div>
        <div className="card-body items-center text-center p-8">
          <h2 className="card-title text-2xl font-black text-base-content uppercase tracking-tight">Delete Job?</h2>
          <p className="text-base-content/70 text-sm mt-2">This action is permanent and cannot be reversed.</p>
          <div className="card-actions justify-center gap-3 mt-10 w-full">
            <button className="btn btn-ghost flex-1 font-bold" onClick={() => navigate(-1)} disabled={isPending}>Go Back</button>
            <button className="btn btn-error text-white flex-1 font-bold" onClick={() => mutate()} disabled={isPending}>
              {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Delete Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
