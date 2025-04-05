'use client'

import React from 'react'
import job from "../../../../jobs.json"
import Jobcard  from '../joblist/joblist'
import Layout from '../layout/layout'
import Link from 'next/link'
import useFetchData from '../../fetchdata/fetchdata'
import { useState } from 'react'
import { useEffect } from 'react'
import { newvalue,Opportunity } from '../type/type'

  type FetchData<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};
      
  

const Jobs = () => {
  // Use state for storing the jobs
  const [jobs, setJobs] = useState<newvalue>({
    errors: "",
  count: "0",
  data: [],
  success: false,
  message: "",
  });

  // Fetch data
  const {data, loading, error } = useFetchData("https://akil-backend.onrender.com/opportunities/search")
 
 console.log(data);
  useEffect(() => {
    if (data) {
      setJobs(data); // Set the fetched data to state
    }
  }, [data]) // Effect will run only when data changes

  if (loading) {
    return <div>Loading...</div> // Show loading state
  }

  if (error) {
    return <div>Error fetching data: {error}</div>
}
console.log(jobs.data);
  return (
    <div>
      {/* Loop over the jobs and render Jobcard for each */}
      {jobs.data.length > 0 ? (
        jobs.data.map((job: Opportunity) => (
          <Link href={`/dashboard/${job.id}`}>
          <Jobcard key={job.id} job={job} index={job.id} /> 
          </Link>// Assuming Jobcard component expects a 'job' prop
        ))
      ) : (
        <p>No job opportunities available.</p> // Handle empty state
      )}
    </div>
  )
}

export default Jobs

