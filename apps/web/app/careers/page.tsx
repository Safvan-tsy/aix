"use client";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FeatureCard } from "./components/FeatureCard";

const Page = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("candidate");
    const initialData = storedData ? JSON.parse(storedData) : null;
    setData(initialData);

    if (!initialData) {
      router.push("/");
    }
  }, [router]);

  return (
    <section className="flex justify-center bg-gradient-to-tr from-green-400 to-yellow-400 min-h-screen p-2">
      {data ? (
        <>
          <FeatureCard data={data} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Page;
