"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  formData: FormData,
  pitchContent: string
) => {
  const session = await auth();

  if (!session || !session.user) {
    return parseServerActionResponse({
      error: "Authentication required",
      status: "ERROR",
    });
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const link = formData.get("link") as string;

  if (!title || !description || !category || !link || !pitchContent) {
    return parseServerActionResponse({
      error: "All fields are required",
      status: "ERROR",
    });
  }

  try {
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const startup = {
      _type: "startup",
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      image: link.trim(),
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user.id,
      },
      pitch: pitchContent.trim(),
    };

    const result = await writeClient.create(startup);

    return parseServerActionResponse({
      _id: result._id,
      error: null,
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Pitch creation error:", error);
    return parseServerActionResponse({
      error: "Failed to create pitch",
      status: "ERROR",
    });
  }
};
