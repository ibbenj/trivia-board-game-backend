import asyncHandler from "express-async-handler";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Supabase Anonymous Key is missing');
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);


export const game_get_all_name = asyncHandler(async (req, res, next) => {

  // create game
  const { data, error } = await supabase
    .from("game")
    .select("id, title");

  if (error) {
    console.error(error.message);
    throw error;
  }

  res.status(200).send({ gameList: data });
});

const getFinalBoard = async (finalID) => {
  const { data: finalBoard, error } = await supabase
    .from("final_board")
    .select("*")
    .eq("id", finalID)

  if (error) {
    throw error;
  }

  return finalBoard;
}

const getBoard = async (boardID) => {
  const { data: boardInfo, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", boardID)

  if (error) {
    throw error;
  }

  const boardContent = [];
  for(let i=1;i<=6;i++){
    const { data: boardCategory, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", boardInfo[0][`category_${i}`]);

  if (error) {
    throw error;
  }

  boardContent.push(boardCategory[0]);
  }

  return { boardInfo, boardContent };
}

export const game_get_one = asyncHandler(async (req, res, next) => {
  const gameID = req.query.gameID;

  const { data: gameInfo, error } = await supabase
  .from("game")
  .select("*")
  .eq("id", gameID);

  if (error) {
    throw error;
  }

  const game = gameInfo[0];
  console.log("and",game.single_board);

  const board1 = await getBoard(game.single_board);
  const board2 = await getBoard(game.double_board);
  const finalBoard = await getFinalBoard(game.final_board);

res.status(200).send({ board1, board2, finalBoard });
});

const createFinalBoard = async () => {
  const { data, error } = await supabase
    .from("final_board")
    .insert([
      {
        category: "N/A",
        question: "N/A",
        answer: "N/A",
      },
    ])
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

const createCategory = async () => {
  const { data, error } = await supabase
    .from("category")
    .insert([
      {
        title: "N/A",
        q1: "N/A",
        a1: "N/A",
        q2: "N/A",
        a2: "N/A",
        q3: "N/A",
        a3: "N/A",
        q4: "N/A",
        a4: "N/A",
        q5: "N/A",
        a5: "N/A",
      },
    ])
    .select("*")
    .single();

  if (error) {
    throw error;
  }


  return data.id;
};

const createBoard = async () => {
  const cat1 = await createCategory();
  const cat2 = await createCategory();
  const cat3 = await createCategory();
  const cat4 = await createCategory();
  const cat5 = await createCategory();
  const cat6 = await createCategory();

  const { data, error } = await supabase
    .from("board")
    .insert([
      {
        category_1: cat1,
        category_2: cat2,
        category_3: cat3,
        category_4: cat4,
        category_5: cat5,
        category_6: cat6,
      },
    ])
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

export const game_create = asyncHandler(async (req, res, next) => {
  const singleBoard = await createBoard();
  const doubleBoard = await createBoard();
  const finalBoard = await createFinalBoard();

  // create game
  const { data, error } = await supabase
    .from("game")
    .insert([
      {
        title: "N/A",
        single_board: singleBoard,
        double_board: doubleBoard,
        final_board: finalBoard,
      },
    ])
    .select("*")
    .single();
    
  if (error) {
    console.error(error.message);
    throw error;
  }

  res.status(200).send({ id: data.id });
});
