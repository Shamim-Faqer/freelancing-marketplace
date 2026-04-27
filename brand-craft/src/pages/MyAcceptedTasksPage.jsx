import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import Spinner from "../components/Spinner.jsx";

export default function MyAcceptedTasksPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ডেটা ফেচ করা
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["accepted-tasks", user?.email],
    queryFn: async () => {
      const res = await api.get(`/accepted-tasks?email=${user.email}`);
      return res.data;
    },
  });

  // টাস্ক রিমুভ বা আপডেট করার মিউটেশন
  const { mutate: removeTask, isPending } = useMutation({
    mutationFn: (id) => api.delete(`/accepted-tasks/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Task updated successfully.");
      // ডেটা আপডেট হওয়ার পর লিস্ট অটো রিফ্রেশ হবে
      queryClient.invalidateQueries({ queryKey: ["accepted-tasks", user.email] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Operation failed."),
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">My Accepted Tasks</h2>
            <p className="text-base-content/60 font-medium mt-1 italic">Manage and track your active commitments</p>
          </div>
          <div className="badge badge-primary badge-lg py-4 px-6 font-bold uppercase tracking-widest">
            Total: {tasks.length}
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <article 
                key={task._id} 
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden rounded-[2rem]"
              >
                <figure className="h-48 relative">
                  <img className="w-full h-full object-cover" src={task.coverImage} alt={task.title} />
                  <div className="absolute top-4 right-4">
                     <span className="badge badge-secondary font-black uppercase text-[10px] py-3 px-4 shadow-lg">
                       {task.category}
                     </span>
                  </div>
                </figure>

                <div className="card-body p-6">
                  <h3 className="card-title text-xl font-black uppercase leading-tight mb-2">
                    {task.title}
                  </h3>
                  <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3 mb-6">
                    {task.summary}
                  </p>
                  
                  <div className="divider opacity-50 my-0"></div>
                  
                  <div className="card-actions grid grid-cols-2 gap-3 mt-4">
                    {/* Mark Done Button */}
                    <button 
                      className="btn btn-primary btn-outline font-black uppercase text-xs hover:!text-white shadow-md" 
                      onClick={() => removeTask(task._id)}
                      disabled={isPending}
                    >
                      {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Mark Done"}
                    </button>
                    
                    {/* Cancel Task Button */}
                    <button 
                      className="btn btn-error btn-ghost bg-error/10 hover:bg-error hover:text-white font-black uppercase text-xs transition-all" 
                      onClick={() => removeTask(task._id)}
                      disabled={isPending}
                    >
                      {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Cancel Task"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-100 rounded-[3rem] shadow-inner border-2 border-dashed border-base-300">
            <h3 className="text-2xl font-black text-base-content/40 uppercase tracking-tighter">No tasks accepted yet</h3>
            <p className="text-base-content/50 mt-2 font-medium">Head over to the jobs page to find new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
