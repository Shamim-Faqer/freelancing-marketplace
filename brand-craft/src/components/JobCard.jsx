import { Link } from 'react-router-dom';

export default function JobCard({ job }) {

  if (!job) return <p>Nothing Founded</p>;

  return (
    <div className="card bg-primary-content shadow-xl border border-gray-200 p-4">

      <figure className="h-48 overflow-hidden rounded-lg">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </figure>


      <div className="p-4">

        <span className="badge badge-primary mb-2">{job.category}</span>


        <h2 className="text-lg text-primary font-bold">{job.title}</h2>


        <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>


        <p className="text-sm text-gray-600">
          {job.summary ? job.summary.slice(0, 80) + "..." : " See Details..."}
        </p>


        <div className="card-actions mt-4">
          <Link to={`/allJobs/${job._id}`} className="btn btn-success btn-soft glass w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}
