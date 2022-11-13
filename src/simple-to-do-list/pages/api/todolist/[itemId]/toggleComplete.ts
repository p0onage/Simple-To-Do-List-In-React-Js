// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { itemId } = query;
try{
  fetch('https://localhost:7167/api/ToDoList/ToggleComplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemId),
  }).then( (response) => { 
    return response;
  }
  ).then( (data) =>
  {
    console.log(data);
    return res.status(200).json({});
  })
}
catch(e)
{
  return res.status(500).send("Server Error" + e);
}
}
