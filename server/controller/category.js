import asyncHandler from "express-async-handler";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Supabase Anonymous Key is missing");
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const update_question = asyncHandler(async (req, res, next) => {
  const { categoryID, qNo, question, answer } = req.body;

  const { data, error } = await supabase
    .from("category")
    .update([
      {
        [`q${qNo}`]: question,
        [`a${qNo}`]: answer,
      },
    ])
    .eq("id", categoryID)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  res.status(200).send({ id: data.id });
});

export const update_category = asyncHandler(async (req, res, next) => {
  const { categoryID, title } = req.body;

  const { data, error } = await supabase
    .from("category")
    .update([
      {
        title
      },
    ])
    .eq("id", categoryID)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  res.status(200).send({ id: data.id });
});