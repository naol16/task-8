'use client'
import React from 'react'
import Image from 'next/image';
type Opportunity = {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: "inPerson" | "virtual"; // Since we have only these two types
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    createdBy: string;
    orgID: string;
    datePosted: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: string | null;
    perksAndBenefits: string | null;
    createdAt: string;
    updatedAt: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    isPaid: boolean;
    average_rating: number;
    total_reviews: number;
    engagementType: string;
    paymentOption: {
      currency: string;
      paymentType: string;
    };
  };

interface jobprops{
  job:Opportunity
  index:string

}

const Jobcard: React.FC<jobprops>= ({job,index}) => {
  return (
    <div className='mt-4'>
      <div className=' shadow-sm  rounded-[25px] border-[#D6DDEB] flex gap-4 p-[24px] m-12'>
        <div>
        <Image src={job.logoUrl} alt="social media" width={66} height={59}/>
        </div>
        <div>
          <h1 className='title'>{job.title}</h1>
          <p className='text-lg text-[#7C8493] font-[Epilogue] font-weight'>{job.orgName}.{job.location}</p>
          <p className='para'>
            {job.description}
          </p>
        <div className='flex gap-2 pt-4'>
        <button className='text-teal-500  rounded-[80px] border-3 border-teal-100 p-2 bg-teal-100'>
          {job.opType}
        </button>
        <button className='text-[#FFB836] border-3 rounded-[80px] border-[#FFB836] p-2'>
          education
        </button>
        <button className='text-[#4640DE]   border-3 rounded-[80px] border-[#4640DE] p-2'>
         {job.requiredSkills[0]}
        </button>
        </div>
      </div>
 
      </div>

      </div>

  )
}

export default Jobcard
