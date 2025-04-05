'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import useFetchData from '@/app/fetchdata/fetchdata';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  faCalendarAlt,
  faFolderOpen,
  faCheckCircle,
  faTag,
  faMapMarkerAlt,
  faPlayCircle,
  faStopCircle
} from "@fortawesome/free-solid-svg-icons";
import Jobs from '../../component/jobs/jobs'
import { Opportunity,newvalueOfspecific} from '@/app/component/type/type';



const dashboard = () => {
  const params = useParams();
  const indexValue = params.index ;
  console.log(params.index);
  const [jobs, setJobs] = useState<newvalueOfspecific>({
      errors: "",
    count:0,
    data:null,
    success: false,
    message: "",
    });
  
    // Fetch data
    const {data, loading, error } = useFetchData(`https://akil-backend.onrender.com/opportunities/${String(params.index)}`)
    console.log(data);
    useEffect(() => {
      if (data) {
        setJobs((prevJobs) => ({
          ...prevJobs,
          ...data, // Merge the fetched data into the jobs state
        }));
      }
    }, [data]);

    
      if (loading) {
        return <div>Loading...</div> // Show loading state
      }
    
      if (error) {
        return <div>Error fetching data: {error}</div>
    }
    console.log(jobs.data);
    


  // here we will do the  the filter  functionality based on index.

  return (
    <>
    <div className="flex gap-[62px] p-4">
      <div>
      <div className='p-4'>
      <h1 className='title'>
       Description
      </h1>
      <p className='para'>
        {jobs.data?.description}
      </p>
      </div>
      <div className='p-4'>
        <h1 className='title'>responsibilities</h1>
      <p className='para'>
      {jobs.data?.responsibilities.split(/[\n,\.]+/).map((responsibilty,index)=>(
        <li key={index} className='list-none'>
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
          {responsibilty}
        </li>
      ))}
      </p>
      </div>
      <div className='p-4'>
        <h1 className='title'>ideal candidate we want</h1>
       <li className='para'>
        {` ${jobs.data?.idealCandidate} ${jobs.data?.title}`}
       </li>
       {jobs.data?.idealCandidate.split('/[\n,]/').map((traits,index)=>(
        <li key={index} className='para'>
          {traits}
        </li>
      ))
    }
      </div>
      <div className='p-4'>
        <h1 className='title'>
          When & Where
        </h1>
        <li className='list-none para font-black text-[#25324B] ' key={0}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-500 rounded-b-full border-amber-100 p-2 text-lg" />
        {jobs.data?.whenAndWhere}
        </li>
      </div>
      </div>
  

      
      
 
      <div className="space-y-5">
  {/* About Section */}
  <div className="bg-white rounded-md shadow-sm p-5">
  <h2 className="title">About</h2>

  {/* Posted On */}
  <div className="flex items-center mb-2 text-gray-500 text-sm">
    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-500" />
    <span className="icondescription">Posted On</span>
  </div>
  <p className="detaildescription">{jobs.data?.datePosted}</p>

  {/* Deadline */}
  <div className="flex items-center mb-2 text-gray-500 text-sm">
  <FontAwesomeIcon icon={faHeart} className="mr-2 text-green-500" />
  <span className='icondescription'>deadline</span>
  </div>

  <p className="detaildescription">{jobs.data?.deadline}</p>

  {/* Location */}
  <div className="flex items-center mb-2 text-gray-500 text-sm  mr-3">
    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-500 rounded-b-full border-amber-100 p-2" />
    <span className="icondescription">Location</span>
  </div>
 {/* {jobs.data.location.map((location1,index)=>(
     <p className="detaildescription">
     {location1}
      </p>

  ))} */}

  {/* Start Date */}
  <div className="mt-4">
    <div className="flex items-center mb-2 text-gray-500 text-sm  mr-3">
      <FontAwesomeIcon icon={faPlayCircle} className="mr-2 text-green-500" />
      <span className="icondescription">Start Date</span>
      </div>
    
    <p className="detaildescription">{jobs.data?.startDate}</p>

    {/* End Date (Green Background) */}
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 mr-3">
        <FontAwesomeIcon icon={faStopCircle} className="text-green-500" />
      </div>
      <span className="icondescription">end date</span>
    </div>
    <p className="detaildescription">{jobs.data?.endDate}</p>
  </div>
</div>

  {/* Categories Section */}
  <div className="bg-white rounded-md shadow-sm p-5">
    <h2 className="title">Categories</h2>
    {jobs.data?.categories.map((category, index) => (
    
    index==0 ? <button className='text-[#FFB836] border-3 rounded-[80px] border-[#FFB836] p-2 m-2 bg-[#EB85331A]'>
      {category}
      </button>
       : <button className='text-teal-500  rounded-[80px] border-3 border-teal-100 p-2 bg-teal-100'>
      {category}
    </button>
  
    ))}
  </div>

  {/* Required Skills Section */}
  <div className="bg-white rounded-md shadow-sm p-5">
    <h2 className="title">Required Skills</h2>
  
      {jobs.data?.requiredSkills.map((skill, index) => (
        // <li key={index} className="flex items-center text-sm mb-2">
        //   <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
        //   <span>{skill}</span>
        // </li>
        <button className='text-[#4640DE]   border-[#4640DE] p-2 m-2 bg-[#F8F8FD]'>
        {skill}
       </button>
      ))}
  
  </div>
</div>
</div>
</>
  );
};

export default dashboard;


