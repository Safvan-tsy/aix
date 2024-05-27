"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSchema, MultiFieldSchema, formSchema } from "./schema/userData";
import { MultiInput } from "@/components/ui/multi-input";
import { useRouter } from "next/navigation";

const DataForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      yoe: "",
      about: "",
      experience: "",
      education: "",
      locations: "",
      skills: "",
      social: "",
    },
  });
  const { reset } = form;
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("candidate", JSON.stringify(values));
    localStorage.removeItem('resume_url')
    reset();
    router.push("/careers");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-wrap justify-around w-full">
          <div className="w-full">
            {FieldSchema.map((item) => (
              <FormField
                control={form.control}
                key={item.name}
                name={item.name as "fullName" | "title" | "email" | "yoe"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={item.type}
                        placeholder={item.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}{" "}
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A description about yourself,skills, expertice, etc.."
                      id="about"
                      className="lg:min-w-96 md:min-w-80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A breif about you education ."
                      id="education"
                      className="lg:min-w-96 md:min-w-80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breif you experience which can match you with your preferred job title"
                      id="experience"
                      className="lg:min-w-96 md:min-w-80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            {MultiFieldSchema.map((item) => (
              <FormField
                control={form.control}
                key={item.name}
                name={item.name as "skills" | "locations" | "social"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={item.type}
                        placeholder={item.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}{" "}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button className="flex min-w-full" type="submit">
            Lets start
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DataForm;
