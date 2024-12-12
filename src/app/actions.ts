"use server";
import Pool from "./utils/postgres";

export async function fetchData() {
  try {
    const client = await Pool.connect();
    const result = await client.query("SELECT * FROM bookmarks");
    const data = result.rows;
    console.log(data);
    client.release();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postDataIntoDb(data) {
  try {
    const client = await Pool.connect();
    const query = {
      text: "INSERT INTO bookmarks (title, url, description) VALUES ($1, $2, $3)",
      values: [data.title, data.url, data.description],
    };
    const result = await client.query(query);
    console.log(result);
    client.release();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
