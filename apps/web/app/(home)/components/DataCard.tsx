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

const DataCard = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500">
            Social Sentiment Analyzer
          </CardTitle>
          {/* <CardDescription>Input</CardDescription> */}
        </CardHeader>
        <CardContent>
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
