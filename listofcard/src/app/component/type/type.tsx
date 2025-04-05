export interface Opportunity{
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
  } | null;

}
export interface  newvalue{
    errors: string,
    count: string,
    data:Opportunity[],
    success: Boolean,
    message:string

}




export interface newvalueOfspecific {
  errors: string | null;  // Changed to accept null
  count: number;          // Changed from string to number
  data: newOpportunity | null;      // Changed from array to single object
  success: boolean;       // Changed Boolean to boolean (primitive)
  message: string;
}

export interface newOpportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: "inPerson" | "virtual";
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
  orgWebsite: string;      // Added missing field
  isPaid: boolean;
  average_rating: number;
  total_reviews: number;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };                      // Removed null as API always returns object
}