import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import Spinner from "../components/Spinner.jsx";

export default function MyAcceptedTasksPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["accepted-tasks", user?.email],
    queryFn: async () => {
      const res = await api.get(`/accepted-tasks?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: removeTask, isPending } = useMutation({
    mutationFn: (id) => api.delete(`/accepted-tasks/${id}`),
    onSuccess: () => {
      toast.success("Updated!");
      queryClient.invalidateQueries({ queryKey: ["accepted-tasks", user?.email] });
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-black uppercase mb-8">Accepted Tasks ({tasks.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task._id} className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h3 className="card-title font-bold uppercase">{task.title}</h3>
              <div className="card-actions mt-4 grid grid-cols-2 gap-2">
                <button className="btn btn-primary btn-sm" onClick={() => removeTask(task._id)} disabled={isPending}>Done</button>
                <button className="btn btn-error btn-outline btn-sm" onClick={() => removeTask(task._id)} disabled={isPending}>Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
