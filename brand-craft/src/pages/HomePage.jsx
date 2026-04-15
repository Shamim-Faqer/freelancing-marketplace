import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

// Components
import Partners from "./Partners";
import Services from "./Services";
import About from "./About";

// Images
import HeroRightImg from "../assets/heror-3.png";

export default function HomePage() {
  // 🔥 React Query
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["latest-jobs"],
    queryFn: () => api.get("/jobs/latest?limit=6"),
    select: (res) => res.data,
  });

  return (
    <div className="bg-base-200 min-h-screen overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-primary-content glass py-12 md:py-16 lg:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
              Empower Your Business with Brand Craft
            </h1>

            {/* DESCRIPTION */}
            <p className="py-4 md:py-6 text-gray-600 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
              Connect with top clients and skilled professionals worldwide.
              Grow your business faster with trusted freelancers.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/allJobs"
                className="btn btn-primary btn-outline px-6 md:px-8 font-bold"
              >
                Explore Jobs
              </Link>

              <Link
                to="/addJob"
                className="btn btn-primary glass bg-white px-6 md:px-8 font-bold"
              >
                Create a Job
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <img
              src={HeroRightImg}
              alt="hero"
              className="w-64 md:w-80 lg:w-96 drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= LATEST JOBS ================= */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-black uppercase">
              Latest Jobs
            </h2>
            <div className="w-20 h-1.5 bg-primary mt-2 rounded-full"></div>
          </div>

          <Link to="/allJobs" className="btn btn-ghost text-primary font-bold">
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="bg-base-100 py-12">
        <Partners />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-base-200 py-12">
        <Services />
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-base-100 py-12">
        <About />
      </section>
    </div>
  );
}
