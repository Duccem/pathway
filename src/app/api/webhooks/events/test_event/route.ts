import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';

export const POST = verifySignatureAppRouter(async (req: Request) => {
  const data = await req.json();
  console.log(data);
  return Response.json({ message: 'Event received' });
});
