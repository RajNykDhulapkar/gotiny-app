import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const code = params["*"];

  const baseUrl = process.env.SHORT_URL_SERVICE_URL;

  if (!baseUrl) {
    // If the environment variable is not set, throw a server error
    throw new Response("Server configuration error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  try {
    const response = await fetch(`${baseUrl}/${code}`);

    if (!response.ok) {
      throw new Response("Short URL not found", {
        status: 404,
        statusText: "Not Found",
      });
    }

    const data = await response.json();

    if (!data.original_url) {
      throw new Response("Invalid redirect URL", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    return redirect(data.original_url);
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
