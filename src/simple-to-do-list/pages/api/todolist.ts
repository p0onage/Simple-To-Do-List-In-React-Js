// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = [{
  name: string,
  done: boolean
}]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch(`https://localhost:7167/ToDoList`)
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data)
    })
	} catch (err) {
		console.log(err);
    res.status(500);
	}
  
}
