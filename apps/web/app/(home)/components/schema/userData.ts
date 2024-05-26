import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "please provide Name",
  }),
  title: z.string().min(2, {
    message: "please provide  Job title .",
  }),
  yoe: z.string().min(1, {
    message: "please provide Years of experience",
  }),
  email: z.string().email({ message: "Provide valid email" }),
  locations: z.string().min(2, {
    message: "please provide locations",
  }),
  skills: z.string().min(2, {
    message: "please provide skills",
  }),
  social: z.string().min(2, {
    message: "please provide  Social urls",
  }),
  education: z.string().min(2, {
    message: "please provide  education data",
  }),
  about: z.string().min(2, {
    message: "please provide about data ",
  }),
  experience: z.string().min(2, {
    message: "please provide experience data",
  }),
});
export interface CandidateType {
  fullName: string;
  title: string;
  yoe: string;
  email: string;
  locations: string;
  skills: string;
  social: string;
  education: string;
  about: string;
  experience: string;
}
export const FieldSchema = [
  {
    name: "fullName",
    placeholder: "name",
    label: "Full Name",
    type: "text",
  },
  {
    name: "title",
    placeholder: "Your preferred job title",
    label: "Job title",
    type: "text",
  },
  {
    name: "email",
    placeholder: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "yoe",
    placeholder: "years of experience",
    label: "YOE",
    type: "text",
  },
];

export const MultiFieldSchema = [
  {
    name: "skills",
    placeholder: "skills seperated by comma(,)",
    label: "Skills",
    type: "text",
  },
  {
    name: "locations",
    placeholder: "Your preferred Locations seperated by comma(,)",
    label: "Loctions",
    type: "text",
  },
  {
    name: "social",
    placeholder: "Social accounts urls seperated by comma(,)",
    label: "Social",
    type: "text",
  },
];
