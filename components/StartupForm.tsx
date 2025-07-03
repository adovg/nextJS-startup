"use client";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { cn } from "@/lib/utils"; // Убедитесь, что у вас есть этот хелпер

const StartupForm = () => {
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await createPitch(prevState, formData, pitch);

      if (result?.status === "SUCCESS" && result._id) {
        toast.success("Startup pitch created successfully");
        setIsRedirecting(true);
        router.push(`/startup/${result._id}`);
        return { ...result, shouldRedirect: true };
      }

      throw new Error(result?.error || "Failed to create pitch");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form"
      );
      return {
        ...prevState,
        error: "Submission failed",
        status: "ERROR",
        shouldRedirect: false,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
    shouldRedirect: false,
  });

  // Стили для формы
  const formClasses =
    "space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-900";
  const inputClasses =
    "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <form
      action={formAction}
      className={formClasses}
      onSubmit={(e) => {
        if (isRedirecting) {
          e.preventDefault();
        }
      }}
    >
      <div>
        <label htmlFor="title" className={labelClasses}>
          Title (min 3 characters)
        </label>
        <Input
          id="title"
          name="title"
          required
          minLength={3}
          className={inputClasses}
          placeholder="Startup Title"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Description (min 20 characters)
        </label>
        <Textarea
          id="description"
          name="description"
          required
          minLength={20}
          className={inputClasses}
          placeholder="Startup description"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="category" className={labelClasses}>
          Category (min 3 characters)
        </label>
        <Input
          id="category"
          name="category"
          required
          minLength={3}
          className={inputClasses}
          placeholder="Tech, Health, Education..."
        />
      </div>

      <div>
        <label htmlFor="link" className={labelClasses}>
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          required
          type="url"
          className={inputClasses}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="pitch" className={labelClasses}>
          Pitch (min 10 characters)
        </label>
        <div className="mt-1">
          <MDEditor
            value={pitch}
            onChange={setPitch}
            height={300}
            className="rounded-lg border border-gray-300"
            textareaProps={{
              id: "pitch",
              name: "pitch",
              placeholder: "Describe your idea and the problem it solves",
              required: true,
              minLength: 10,
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending || isRedirecting}
        className={cn(
          "w-full py-3 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg",
          (isPending || isRedirecting) && "opacity-75 cursor-not-allowed"
        )}
      >
        {isPending || isRedirecting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            Submit Pitch
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {state.error && <p className={errorClasses}>{state.error}</p>}
    </form>
  );
};

export default StartupForm;
