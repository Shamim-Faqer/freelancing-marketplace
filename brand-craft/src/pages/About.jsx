import React from 'react'

function About() {
  return (
    <div><section className="max-w-6xl mx-auto py-20 px-4">
        <div className="card glass bg-primary text-primary-content shadow-2xl image-full before:!bg-opacity-80 before:!bg-primary overflow-hidden rounded-[3rem]">
          <figure>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="About IT Workly" className="w-full h-full object-cover" />
          </figure>
          <div className="card-body items-center text-center py-16 md:py-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-primary bg-primary-content p-2 rounded glass tracking-tighter">About Brand Craft</h2>
            <p className="text-lg md:text-xl max-w-3xl opacity-90 leading-relaxed font-medium">
              We focus on transparent freelance matching, secure communication, and a simple task lifecycle from job posting to completion. Our mission is to bridge the gap between world-class talent and high-impact opportunities.
            </p>
            <div className="card-actions mt-10">
              <button className="btn btn-primary-content text-primary border-none btn-wide btn-lg font-black shadow-lg hover:scale-105 hover:bg-white transition-all uppercase">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default About