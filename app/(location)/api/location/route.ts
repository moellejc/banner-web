import { auth } from '@/app/(auth)/auth';

export async function POST(request: Request) {
  try {
    const {
      lat,
      lon
    }: {
      lat: number;
      lon: number;
    } = await request.json();

    const session = await auth();

    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    
  } catch (error) {
    return new Response('An error occurred while processing your request!', {
      status: 500,
    });
  }
}