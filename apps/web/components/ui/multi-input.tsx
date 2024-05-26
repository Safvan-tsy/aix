"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "./form";

export function MultiInput({
  fieldName,
  label,
}: {
  fieldName: string;
  label: string;
}) {
  const { control, getValues } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: fieldName,
    }
  );

  let [inputValue, setInputValue] = React.useState("");

  function addValues() {
    append({ value: inputValue });
    setInputValue("");
  }

  return (
    <div className="">
      <div className="flex items-center gap-x-4 mb-4">
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder={fieldName}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full"
            />
          </FormControl>
        </FormItem>
        <Button type="button" onClick={addValues}>
          Add
        </Button>
      </div>
      <ul className="flex flex-col pl-3 list-disc gap-y-1">
        {fields.map((field, index) => (
          <li key={field.id} className="flex gap-x-3 items-center">
            <p className="w-full">{getValues(`${fieldName}.${index}.value`)}</p>
            <div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="18"
                  fill="none"
                  viewBox="0 0 16 18"
                >
                  <path
                    fill="#DA1E28"
                    d="M3 18c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 011 16V3H0V1h5V0h6v1h5v2h-1v13c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0113 18H3zM13 3H3v13h10V3zM5 14h2V5H5v9zm4 0h2V5H9v9z"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
