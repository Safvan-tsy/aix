"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/aix_logo.png";
import { CandidateType } from "@/app/(home)/components/schema/userData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { DarkLoader } from "@/components/ui/loader";

export const FeatureCard = ({ data }: { data: CandidateType }) => {
  const [resumePipelineData, setResumePipelineData] = React.useState<
    | { name: string; id: string; description: string; readme: string }
    | undefined
  >();
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoding] = useState(false);

  const getPayload = () => {
    let formData = {
      full_name: data.fullName,
      location: data.locations.split(","),
      skills: data.skills.split(","),
      social: data.social.split(","),
      yoe: Number(data.yoe),
      title: data.title,
      education: data.education,
      about: data.about,
      experience: data.experience,
      email: data.email,
    };
    const stringData = JSON.stringify(formData);
    return stringData;
  };
  const generateResume = async () => {
    setLoding(true);

    const payload = getPayload();
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}/pipeline/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const res = await response.json();
    console.log(res);
    if (response.ok) {
      console.log(res);
      setLoding(false);
      setResumeUrl(res.resume.resume.resume_url);
    }
  };

  // const fetchPipelines = async () => {
  //   const payload = getPayload();
  //   const url = process.env.NEXT_PUBLIC_API_URL;
  //   const response = await fetch(`${url}/pipeline/resume`, {
  //     method: "GET",
  //   });
  //   const res = await response.json();
  //   console.log(res);
  //   if (response.ok) {
  //     console.log(res);
  //     setLoding(false);
  //     setResumePipelineData(res.pipeline);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchPipelines();
  // }, []);
  return (
    <div className="flex flex-col items-center ">
      <Image width={200} height={200} src={logo} alt="logo" />
      <h2 className="font-semibold text-2xl text-gray-100">
        Hello, {data.fullName} 👋
      </h2>
      <Tabs defaultValue="resume" className="">
        <TabsList className="grid w-full grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-20 md:h-10">
          <TabsTrigger value="resume">Resume Creator</TabsTrigger>
          <TabsTrigger value="booleankeys">Boolean Texts</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">
          <Card className="xl:min-w-[60rem]">
            <CardHeader>
              <CardTitle>Resume Creator</CardTitle>
              <CardDescription>
                <a
                  href="https://instill.tech/safvan/pipelines/resume_generator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here visit instill pipeline
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeUrl ? (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  Click here to see resume
                </a>
              ) : loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={generateResume}>Generate PDF Resume</Button>
              )}
              {/* {resumePipelineData ? (
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: resumePipelineData.readme,
                  }}
                />
              ) : (
                <DarkLoader />
              )} */}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="booleankeys">
          <Card className="xl:min-w-[60rem]">
            <CardHeader>
              <CardTitle>Boolean Search Helper</CardTitle>
              <CardDescription>
                <a
                  href="https://instill.tech/safvan/pipelines/boolean_search_helper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here visit instill pipeline
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button>Generate Boolean Search Texts</Button>
              <p></p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
