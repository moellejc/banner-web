import { auth } from "@/app/(auth)/auth";
import {
  reverseGeocode,
  searchPlacesByCoords,
  placeDetailsFromID,
} from "@/lib/location/google";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    } = body.coords;

    const session = await auth();
    
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    // convert lat, lon into an address
    const addressResponse = await reverseGeocode({ latitude, longitude });
    if (
      !Object.hasOwn(addressResponse, "results") ||
      addressResponse.results.length < 1
    ) {
      return new Response(
        `An error occurred while finding geocoded location!`,
        {
          status: 500,
        }
      );
    }

    // convert address into details about a place
    const placeDetails = await placeDetailsFromID(
      addressResponse.results[0].place_id
    );

    return new Response(JSON.stringify(placeDetails), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      `An error occurred while processing your request! ${error}`,
      {
        status: 500,
      }
    );
  }
}
