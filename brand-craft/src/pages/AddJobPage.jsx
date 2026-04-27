import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function AddJobPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.post("/jobs", payload),
    onSuccess: () => {
      toast.success("Job added successfully!");
      // Job যোগ হওয়ার পর cache রিফ্রেশ করা যাতে অন্য পেজে আপডেট দেখা যায়
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      navigate("/allJobs"); // বা আপনার প্রয়োজনীয় রাউটে রিডাইরেক্ট করুন
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add job.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auth চেক করা
    if (!user?.email) {
      return toast.error("You must be logged in to post a job!");
    }

    const form = e.currentTarget;
    
    const jobData = {
      title: form.title.value.trim(),
      postedBy: user?.displayName || "Anonymous",
      userEmail: user?.email,
      category: form.category.value,
      summary: form.summary.value.trim(),
      coverImage: form.coverImage.value.trim(),
      createdAt: new Date().toISOString(), // সার্ভারে ডেট ফিল্ড থাকলে কাজে দিবে
    };

    mutate(jobData);
    form.reset();
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-xl mx-auto bg-base-100 p-8 shadow-xl rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold">Add New Job</h2>
        
        <input name="title" className="input input-bordered w-full" placeholder="Title" required />
        
        <select name="category" className="select select-bordered w-full" required>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Designing">Graphics Designing</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Content Writing">Content Writing</option>
        </select>
        
        <textarea name="summary" className="textarea textarea-bordered w-full" placeholder="Summary" required />
        
        <input name="coverImage" className="input input-bordered w-full" placeholder="Image URL" required />
        
        <button 
          type="submit"
          disabled={isPending} 
          className="btn btn-primary w-full text-white"
        >
          {isPending ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
