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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  website: z.string().min(2, {
    message: "website must be at least 2 characters.",
  }),
  twitter: z.string().min(2, {
    message: "Twitter url must be at least 2 characters.",
  }),
  twitterToken: z.string().min(2, {
    message: "Token must be at least 2 characters.",
  }),
  noOfDays: z.string().min(1, {
    message: "Provide number of days",
  }),
});
const fieldList = [
  {
    name: "productName",
    placeholder: "name",
    label: "Product Name",
    type: "text",
  },
  {
    name: "website",
    placeholder: "product website url",
    label: "Website",
    type: "text",
  },
  {
    name: "twitter",
    placeholder: "twitter",
    label: "Twitter",
    type: "text",
  },
  {
    name: "twitterToken",
    placeholder: "token",
    label: "Twitter Token",
    type: "text",
  },
];
const DataForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      website: "",
      twitter: "",
      twitterToken: "",
      noOfDays: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fieldList.map((item) => (
          <FormField
            control={form.control}
            key={item.name}
            name={
              item.name as
                | "productName"
                | "website"
                | "twitter"
                | "twitterToken"
            }
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
        <FormField
          control={form.control}
          name="noOfDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Days</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Past number of days" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["1", "5", "7", "10"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button className="flex min-w-full" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default DataForm;
