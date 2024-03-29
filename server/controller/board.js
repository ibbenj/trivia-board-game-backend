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

export const get_board = asyncHandler(async (req, res, next) => {
  const boardID = req.query.boardID;

  const { data: boardInfo, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", boardID);

  if (error) {
    throw error;
  }

  const boardContent = [];
  for (let i = 1; i <= 6; i++) {
    const { data: boardCategory, error } = await supabase
      .from("category")
      .select("*")
      .eq("id", data[`category_${i}`]);

    if (error) {
      throw error;
    }

    boardContent.push(boardCategory);
  }

  res.status(200).send({ boardInfo, boardContent });
});
