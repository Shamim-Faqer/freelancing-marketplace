import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.js";
import Spinner from "../components/Spinner.jsx";
import JobCard from "../components/JobCard.jsx";

export default function AllJobsPage() {
  const [sort, setSort] = useState("desc");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["all-jobs", sort],
    queryFn: async () => {
      const res = await api.get(`/jobs?sort=${sort}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">


        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-primary-content p-6 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl font-extrabold text-primary">Explore Jobs</h2>
            <p className="text-base-content mt-1">Find your next career opportunity</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-medium text-base-content">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered select-primary w-full md:w-auto"
            >
              <option value="desc">Latest Posted</option>
              <option value="asc">Oldest Posted</option>
            </select>
          </div>
        </div>


        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (

          <div className="text-center py-20 rounded-2xl shadow-inner border border-dashed border-base-300 ">
            <h3 className="text-xl font-semibold text-base-content/50">No jobs found at the moment.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
