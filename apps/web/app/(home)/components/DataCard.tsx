import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataForm from "./DataForm";
import Image from "next/image";
import logo from "@/public/aix_logo.png";

const DataCard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <Image width={200} height={200} src={logo} alt="logo" />
      <Card className="xl:min-w-[60rem]">
        <CardHeader>
          <CardTitle className="text-blue-500 flex justify-center">
            Candidate Information
          </CardTitle>
          <CardDescription>
            This data is required to use the features
          </CardDescription>
        </CardHeader>
        <CardContent className="lg:p-6 xl:p-8 2xl:p-10 w-full">
          <DataForm />
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default DataCard;
