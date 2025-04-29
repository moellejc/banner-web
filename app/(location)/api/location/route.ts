import { auth } from "@/app/(auth)/auth";
import { placesClient } from "@/lib/location/google";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
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

    // let center = new google.maps.LatLng(latitude, longitude);
    // Construct request
    const placeRequest = {
      // required parameters
      fieldMask: [
        "displayName",
        "location",
        "businessStatus",
        "formattedAddress",
        "types",
      ],
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude,
          },
          radius: 500,
        },
      },
      // optional parameters
      // includedPrimaryTypes: ['restaurant'],
      maxResultCount: 20,
      rankPreference: "POPULARITY",
      language: "en-US",
      region: "us",
    };

    // Run Maps Place Request

    //@ts-ignore
    const placesResponse = await placesClient.searchNearby(placeRequest, {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "places.displayName,places.displayName,places.location,places.businessStatus,places.formattedAddress,places.types",
        },
      },
    });

    console.log(placeRequest.locationRestriction.circle.center);
    console.log(placesResponse);
    return new Response(JSON.stringify(placesResponse), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Internal server error finding place from location coords");
    console.log(error);
    return new Response(
      `An error occurred while processing your request! ${error}`,
      {
        status: 500,
      }
    );
  }
}
