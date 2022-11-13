// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = [{
  itemId: number,
  name: string,
  done: boolean
}]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const fetchTodos = async () => {
      const response = await fetch("https://localhost:7167/api/ToDoList/GetToDoList");
      const data = await response.json();
      return res.status(200).send(data)
    };
    fetchTodos();

	} catch (err) {
		console.log(err);
    return res.status(500).send({} as Data);
	}
  
}
