import { CloudinaryUploadResponse } from "@/types/cloudinary";

export const mockRawData = [
  '{"about": {"about": "Seasoned software developer Safvan from India with 1+ years of experience excelling in both backend and frontend development, specializing in Node.js. Thrived at Unfold Solution as a backend developer crafting robust applications using Express and NestJS, with expertise in MongoDB utilization. Skilled in API testing with tools like Postman, adopting agile methodologies for increased adaptability, and venturing into DevOps tasks for Linux server management and Node.js deployment. Contributed significantly to end-to-end development and deployment processes, enhancing team productivity and project outcomes.","skills": ["Nodejs","Nestjs"]},"basic_details": {"name": "muhammed Safvan","title": "Software developer","location": ["Delhi, India"]},"contact": {"email": "safvanmanikulath@gmail.com","twitter": "https://x.com/Safvantsy","linkedin": "https://www.linkedin.com/in/muhammed-safvan-8b912a21b","personalWebsite": "https://www.safvan.dev/"},"education": {"institution": "Farook College Kozhikode","duration": "2020-2023","course_name": "B.Voc In Software Development","description": "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA."},"experience": [{"org": "Unfold Solution","duration": "1 yr 4 mo","description": "Backend developer specializing in Node.js with expertise in Express and NestJS. Proficient in MongoDB for database management, thorough API testing using Postman and Apache JMeter. Agile methodology advocate for enhanced efficiency. Skilled in DevOps tasks including managing Linux servers, deploying Node.js applications with PM2, and configuring web servers like Apache and Nginx. Key contributor to end-to-end development and deployment processes, boosting team productivity and project outcomes."}]}',
];
export const mockParsedData = {
  about: {
    about:
      "Seasoned software developer Safvan from India with 1+ years of experience excelling in both backend and frontend development, specializing in Node.js. Thrived at Unfold Solution as a backend developer crafting robust applications using Express and NestJS, with expertise in MongoDB utilization. Skilled in API testing with tools like Postman, adopting agile methodologies for increased adaptability, and venturing into DevOps tasks for Linux server management and Node.js deployment. Contributed significantly to end-to-end development and deployment processes, enhancing team productivity and project outcomes.",
    skills: ["Nodejs", "Nestjs"],
  },
  basic_details: {
    name: "muhammed Safvan",
    title: "Software developer",
    location: ["Delhi, India"],
  },
  contact: {
    email: "safvanmanikulath@gmail.com",
    twitter: "https://x.com/Safvantsy",
    linkedin: "https://www.linkedin.com/in/muhammed-safvan-8b912a21b",
    personalWebsite: "https://www.safvan.dev/",
  },
  education: {
    institution: "Farook College Kozhikode",
    duration: "2020-2023",
    course_name: "B.Voc In Software Development",
    description:
      "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
  },
  experience: [
    {
      org: "Unfold Solution",
      duration: "1 yr 4 mo",
      description:
        "Backend developer specializing in Node.js with expertise in Express and NestJS. Proficient in MongoDB for database management, thorough API testing using Postman and Apache JMeter. Agile methodology advocate for enhanced efficiency. Skilled in DevOps tasks including managing Linux servers, deploying Node.js applications with PM2, and configuring web servers like Apache and Nginx. Key contributor to end-to-end development and deployment processes, boosting team productivity and project outcomes.",
    },
  ],
};
export const mockRefactoredData = {
  fullName: "Muhammed Safvan",
  title: "Software Developer",
  location: "Delhi, India",
  contact: [
    {
      label: "email",
      url: "safvanmanikulath@gmail.com",
    },
    {
      label: "twitter",
      url: "https://x.com/Safvantsy",
    },
    {
      label: "linkedin",
      url: "https://www.linkedin.com/in/muhammed-safvan-8b912a21b",
    },
    {
      label: "personalwebsite",
      url: "https://www.safvan.dev/",
    },
  ],
  about:
    "Seasoned software developer Safvan from India with 1+ years of experience excelling in both backend and frontend development, specializing in Node.js. Thrived at Unfold Solution as a backend developer crafting robust applications using Express and NestJS, with expertise in MongoDB utilization. Skilled in API testing with tools like Postman, adopting agile methodologies for increased adaptability, and venturing into DevOps tasks for Linux server management and Node.js deployment. Contributed significantly to end-to-end development and deployment processes, enhancing team productivity and project outcomes.",
  skills: ["Nodejs", "Nestjs"],
  education: [
    {
      institution: "Farook College Kozhikode",
      duration: "2020-2023",
      course_name: "B.Voc In Software Development",
      description:
        "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
    },
  ],
  experience: [
    {
      org: "Unfold Solution",
      duration: "1 yr 4 mo",
      description:
        "Backend developer specializing in Node.js with expertise in Express and NestJS. Proficient in MongoDB for database management, thorough API testing using Postman and Apache JMeter. Agile methodology advocate for enhanced efficiency. Skilled in DevOps tasks including managing Linux servers, deploying Node.js applications with PM2, and configuring web servers like Apache and Nginx. Key contributor to end-to-end development and deployment processes, boosting team productivity and project outcomes.",
    },
  ],
};

export const mockHTMLContent = "<html><body>Test</body></html>";

export const mockCloudinaryResponse: CloudinaryUploadResponse = {
  public_id: "sample_id",
  version: 123456,
  signature: "sample_signature",
  width: 500,
  height: 500,
  format: "pdf",
  resource_type: "raw",
  created_at: "2023-06-11T12:34:56Z",
  tags: [],
  bytes: 12345,
  type: "upload",
  etag: "sample_etag",
  placeholder: false,
  url: "http://res.cloudinary.com/sample_url",
  access_mode: "",
  secure_url: "https://res.cloudinary.com/sample_url",
  original_filename: "sample.pdf",
};

export const mockResumePipelineData = {
  name: "users/safvan/pipelines/resume_generator-test",
  uid: "eb824a37-b7c3-403c-9af3-99cafbc39b73",
  id: "resume_generator",
  description:
    "Generate ATS friendly resume. This Saves your hours time wasted on multiple cycles of formatting the perfect one.",
  recipe: {},
  create_time: "2024-05-08T16:16:40.448469Z",
  update_time: "2024-05-27T07:43:33.243143Z",
  delete_time: null,
  sharing: {
    users: {
      "*/*": {
        enabled: true,
        role: "ROLE_EXECUTOR",
      },
    },
    share_code: null,
  },
  metadata: {
    components: [
      {
        id: "about",
        note: null,
        x: 397.56635802469134,
        y: -1355.5794816570512,
      },
    ],
  },
  owner_name: "users/safvan",
  releases: [],
  readme: "",
  permission: {
    can_edit: true,
    can_trigger: true,
    can_release: false,
  },
  visibility: "VISIBILITY_PUBLIC",
  owner: {
    user: {
      name: "users/safvan",
      uid: "f4cc2907-78fb-4537-85d4-3807806fb71f",
      id: "safvan",
      create_time: "2024-05-05T12:43:35.658471Z",
      update_time: "2024-05-20T13:18:34.488917Z",
      profile: {
        display_name: "safvan",
        bio: "https://www.safvan.dev/",
        avatar: "https://api.instill.tech/core/v1beta/users/safvan/avatar",
        public_email: "",
        company_name: "",
        social_profile_links: {
          github: "https://github.com/Safvan-tsy",
          x: "https://x.com/Safvantsy",
        },
      },
    },
  },
  data_specification: {
    input: {
      properties: {
        about: {
          description: "A description about yourself,skills, expertice, etc..",
          instillFormat: "string",
          instillUiMultiline: true,
          instillUiOrder: 2,
          title: "About",
        },
        education: {
          description: "A breif about you education .",
          instillFormat: "string",
          instillUiMultiline: true,
          instillUiOrder: 8,
          title: "Education",
        },
        email: {
          instillFormat: "string",
          instillUiOrder: 3,
          title: "Email",
        },
        experience: {
          description:
            "Breif you experience which can match you with your preferred job title",
          instillFormat: "string",
          instillUiMultiline: true,
          instillUiOrder: 7,
          title: "Experience",
        },
        full_name: {
          instillFormat: "string",
          title: "Full Name",
        },
        location: {
          description: "your preferred location",
          instillFormat: "array:string",
          instillUiOrder: 4,
          title: "Location",
        },
        skills: {
          instillFormat: "array:string",
          instillUiOrder: 9,
          title: "Skills",
        },
        social: {
          description:
            "Urls of your personal website and social media accounts",
          instillFormat: "array:string",
          instillUiOrder: 5,
          title: "Social ",
        },
        title: {
          description: "Your preferred job title",
          instillFormat: "string",
          instillUiOrder: 1,
          title: "Title",
        },
        yoe: {
          description: "Total years of relevent experience",
          instillFormat: "number",
          instillUiOrder: 6,
          title: "YOE",
        },
      },
      type: "object",
    },
    output: {
      properties: {
        resume: {
          description: "",
          instillFormat: "semi-structured/json",
          instillShortDescription: "The body of the response",
          instillUIOrder: 4,
          title: "Resume",
          type: "",
        },
      },
      type: "object",
    },
  },
  tags: [],
  stats: {
    number_of_runs: 4,
    last_run_time: "2024-06-11T08:38:11.011055Z",
  },
};

export const mockPipelineRequestBody = {
  full_name: "Muhammed safvan",
  location: ["kerala India", "delhi India", "remote"],
  skills: ["Nodejs", "javascript"],
  social: ["https://www.safvan.dev/"],
  yoe: "1.5",
  title: "Software Developer",
  education:
    "Unfold Solution\n1 yr 4 mo\nSoftware Engineer:\nThrived as a backend developer specializing in Node.js, extensively utilizing frameworks like Express and NestJS.\nFocused on crafting robust applications, leveraging MongoDB as the primary database, and ensuring meticulous project documentation.\nConducted rigorous API testing using tools such as Postman and Apache JMeter to ensure the reliability and functionality of developed solutions.\nEmbraced agile methodologies for the software development lifecycle, contributing to increased adaptability and efficiency in project workflows.\nVentured into DevOps tasks, demonstrating proficiency in managing Linux servers, deploying Node.js applications via PM2, and configuring versatile web servers like Apache and Nginx.\nContributed significantly to end-to-end development and deployment processes, playing a crucial role in enhancing team productivity and elevating project outcomes.",
  about:
    "A seasoned software developer from India proficient in Node.js backend development. I also excel in frontend development incorporating various technologies With strong emphasis on delivering high-quality solutions. My expertise spans both backend and frontend realms, With over 1+ years of experience.\n\n",
  experience:
    "B.Voc In Software Development\nFarook College Kozhikode\n2020-2023:\nFocused three-year Software Development degree, deepening computer science fundamentals.\nExplored Data Structures, Algorithms, and expanded web development skills.\nApplied diverse coding languages—C, Java, Python, and .NET—in projects, strengthening proficiency in these versatile tools.\nAchieved a commendable 75.7% CGPA, reflecting mastery in foundational software development and computer science.",
  email: "safvanmanikulath@gmail.com",
};
