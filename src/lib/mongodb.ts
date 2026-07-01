import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
let db: Db

export async function connectDB() {
  if (db) return db
  client = new MongoClient(uri, options)
  await client.connect()
  db = client.db('wanderlust')
  console.log('Connected to MongoDB')
  return db
}

export function getDB() {
  return db
}

export function getClient() {
  return client
}
