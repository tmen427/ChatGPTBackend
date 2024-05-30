
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import 'dotenv/config';
import {PGVectorStore} from "@langchain/community/vectorstores/pgvector";

import pg  from "pg";
//import pkg from 'pg';
//const { Client } = pkg; //or// const Client = pkg.Client

import express from "express";
const app = express()
import cors from "cors"; 


const StoredVector= async(search) => {

    //the batchSize is immportant, if the batchsize is smaller then size of the document the you will get errors
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY1, // In Node.js defaults to process.env.OPENAI_API_KEY
      batchSize: 2000, // Default value if omitted is 512. Max is 2048
    });
    
    
    const reusablePool = new pg.Pool({
      host: "127.0.0.1",
      port: 5433,
      user: "postgres",
      password: "postgres",
      database: "api",
    });

    
    const originalConfig = {
      pool: reusablePool,
      tableName: "testlangchain",
      collectionName: "sample",
      collectionTableName: "collections",
      columns: {
        idColumnName: "id",
        vectorColumnName: "vector",
        contentColumnName: "content",
        metadataColumnName: "metadata",
      },
    };
    
    //set up database connection, initialize needs to be only ran once 
     await PGVectorStore.initialize(embeddings, originalConfig);
    
    const pgvectorStore = new PGVectorStore(embeddings, originalConfig);
    
    //store text as a vector 
    // fs.readFile('./speech.txt', (err, data) => {
    //   if (err) throw err;
    
    //   pgvectorStore.addDocuments([
    //   {pageContent: data.toString(), metadata: { a:6} }
    //  ])
    
    // })
        
    //retrieve the vectors from postgres and use chatopenai to respond!
    let llm = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY1, modelName: "gpt-3.5-turbo-1106" });  
    
    const chain = await RetrievalQAChain.fromLLM(llm, pgvectorStore.asRetriever());
    
    
    const response = await chain.call({
     query: search
    });
    
      return response; 
    }

 export {StoredVector}; 