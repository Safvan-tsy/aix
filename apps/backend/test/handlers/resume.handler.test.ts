import { describe, expect, it, vi } from "vitest";
import { createMocks } from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import puppeteer, { Browser, Page } from "puppeteer";
import {
  capitalizeFirstLetterOfEachWord,
  generateData,
  getParsedData,
  getRefactoredData,
} from "../../src/handlers/resume.handler";

const rawData = [
  '{"about": {"about": "Seasoned software developer Safvan from India with 1+ years of experience excelling in both backend and frontend development, specializing in Node.js. Thrived at Unfold Solution as a backend developer crafting robust applications using Express and NestJS, with expertise in MongoDB utilization. Skilled in API testing with tools like Postman, adopting agile methodologies for increased adaptability, and venturing into DevOps tasks for Linux server management and Node.js deployment. Contributed significantly to end-to-end development and deployment processes, enhancing team productivity and project outcomes.","skills": ["Nodejs","Nestjs"]},"basic_details": {"name": "muhammed Safvan","title": "Software developer","location": ["Delhi, India"]},"contact": {"email": "safvanmanikulath@gmail.com","twitter": "https://x.com/Safvantsy","linkedin": "https://www.linkedin.com/in/muhammed-safvan-8b912a21b","personalWebsite": "https://www.safvan.dev/"},"education": {"institution": "Farook College Kozhikode","duration": "2020-2023","course_name": "B.Voc In Software Development","description": "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA."},"experience": [{"org": "Unfold Solution","duration": "1 yr 4 mo","description": "Backend developer specializing in Node.js with expertise in Express and NestJS. Proficient in MongoDB for database management, thorough API testing using Postman and Apache JMeter. Agile methodology advocate for enhanced efficiency. Skilled in DevOps tasks including managing Linux servers, deploying Node.js applications with PM2, and configuring web servers like Apache and Nginx. Key contributor to end-to-end development and deployment processes, boosting team productivity and project outcomes."}]}',
];
const parsedData = {
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
const refactoredData = {
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

describe("generateData", () => {
  it("should respond with resume data", async () => {
    // const mockNext = vi.fn();
    // const { req, res } = createMocks<Request, Response>({
    //   method: "POST",
    //   body: rawData,
    // });
  

    // await generateData(req, res, mockNext);
    
    // expect(getParsedData).toHaveBeenCalledWith(req.body);
    // expect(getRefactoredData).toHaveBeenCalledWith(parsedData);
    // expect(res._getStatusCode()).toBe(200);
    // expect(JSON.parse(res._getData())).toEqual(refactoredData);
  });
});

describe("getParsedData", () => {
  it("should parse string to json and remove \n char", () => {
    expect(getParsedData(rawData)).toEqual(parsedData);
  });
});

describe("getRefactoredData", () => {
  it("should return refactored data", () => {
    expect(getRefactoredData(parsedData)).toEqual(refactoredData);
  });
  it("should return refactored data even if education and experience is not array", () => {
    let dataToRefactor: any = parsedData;
    dataToRefactor.education = {
      institution: "Farook College Kozhikode",
      duration: "2020-2023",
      course_name: "B.Voc In Software Development",
      description:
        "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
    };

    expect(getRefactoredData(dataToRefactor)).toEqual(refactoredData);
  });
  it("should return educationexperience as array of objects ", () => {
    let dataToRefactor: any = parsedData;
    dataToRefactor.education = {
      education: [
        {
          institution: "Farook College Kozhikode",
          duration: "2020-2023",
          course_name: "B.Voc In Software Development",
          description:
            "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
        },
      ],
    };
    const result = getRefactoredData(dataToRefactor);
    expect(result.education).toEqual([
      {
        institution: "Farook College Kozhikode",
        duration: "2020-2023",
        course_name: "B.Voc In Software Development",
        description:
          "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
      },
    ]);
  });
});

describe("capitalizeFirstLetterOfEachWord", () => {
  it("it should return string with first letter of each word as capital", () => {
    expect(capitalizeFirstLetterOfEachWord("software developer")).toBe(
      "Software Developer"
    );
  });
});

describe("pdfGenerator", () => {
  it("should generate a PDF from the provided data", () => {

  });
});

describe("uploadPdfToCloudinary", () => {
  it("", () => {});
});

describe("getUploadedUrl", () => {
  it("", () => {});
});

describe("generateResume", () => {
  it("", () => {});
});
