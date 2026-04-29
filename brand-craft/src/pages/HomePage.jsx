import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../utils/api.js";
import Spinner from "../components/Spinner.jsx";
import JobCard from "../components/JobCard.jsx";
import Partners from "./Partners.jsx";
import Services from "./Services.jsx";
import About from "./About.jsx";
import HeroRightImg from "../assets/heror-3.png";

export default function HomePage() {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["latest-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs?limit=6");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative bg-primary-content py-12 md:py-16 lg:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
              Empower Your Business with Brand Craft
            </h1>
            <p className="py-4 md:py-6 text-gray-600 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
              Connect with top clients and skilled professionals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/allJobs" className="btn btn-primary btn-outline px-6 font-bold">Explore Jobs</Link>
              <Link to="/addJob" className="btn btn-primary px-6 font-bold">Create a Job</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <img src={HeroRightImg} alt="hero" className="w-64 md:w-80 lg:w-96 drop-shadow-xl" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-black uppercase">Latest Jobs</h2>
            <div className="w-20 h-1.5 bg-primary mt-2 rounded-full"></div>
          </div>
          <Link to="/allJobs" className="btn btn-ghost text-primary font-bold">View All →</Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
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
            {jobs && jobs.length > 0 ? (
              jobs.slice(0, 6).map((job) => (
                <motion.div
                  key={job._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 opacity-50">No jobs available.</div>
            )}
          </motion.div>
        )}
      </section>

      <section className="py-12"><Partners /></section>
      <section className="py-12"><Services /></section>
      <section className="py-12"><About /></section>
    </div>
  );
}
