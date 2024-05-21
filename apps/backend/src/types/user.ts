interface UserContactype {
  gmail: string;
  twitter: string;
  github: string;
  linkedin: string;
  personalWebsite: string;
}

interface UserExperienceType {
  org: string;
  duration: string;
  description: string;
}

interface UserEducationType {
  institution: string;
  duration: string;
  course_name: string;
  description: string;
}
export interface UserDataType {
  fullName: string;
  title: string;
  location: string[];
  contact: UserContactype;
  about: string;
  skills: string[];
  education: UserEducationType[];
  experience: UserExperienceType[];
}
