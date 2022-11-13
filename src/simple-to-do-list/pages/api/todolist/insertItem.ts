// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = [{
  name: string,
  done: boolean
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const body = req.body;
  const { name } = body;
  try{
    fetch('https://localhost:7167/api/ToDoList/AddToDo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `"${name}"`
    }).then( (response) => { 
      console.log(name);
      return response;
    }
    ).then( (data) =>
    {
      return res.status(200).json({});
    })
  } catch(e)
  {
    return res.status(500).send("Server Error" + e);
  }
  
}
