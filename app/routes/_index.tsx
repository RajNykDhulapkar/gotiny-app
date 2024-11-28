import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import LinksTable from "~/components/LinksTable";
import { Alert, AlertDescription } from "~/components/ui/alert";
import LinkInput from "~/components/ui/link-input";
import { getGuestId } from "~/sessions.server";

export type ActionData = {
  message?: string;
  data?: { shortUrl: string };
  error?: string;
};

export interface URLEntity {
  ID: string;
  ShortURL: string;
  OriginalURL: string;
  UserID: string;
  CreateAt: string;
  UpatedAt: string;
  ClickCount: number;
}

export interface LoaderData {
  data?: {
    data: URLEntity[]; // Nested data structure from the API response
    message?: string;
  };
  error?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { guestId, commitSession } = await getGuestId(request);
  const baseUrl = process.env.SHORT_URL_SERVICE_URL;

  if (!baseUrl) {
    const headers = { "Set-Cookie": await commitSession() };
    return json<LoaderData>(
      { error: "Server configuration error" },
      { status: 500, headers }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/urls/${guestId}`);
    const responseData = await response.json();
    const headers = { "Set-Cookie": await commitSession() };

    return json<LoaderData>({ data: responseData }, { headers });
  } catch (error) {
    const headers = { "Set-Cookie": await commitSession() };
    return json<LoaderData>(
      { error: "Failed to fetch URLs" },
      { status: 500, headers }
    );
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const { guestId, commitSession } = await getGuestId(request);

  const formData = await request.formData();
  const url = formData.get("url");

  console.log("URL", url);

  if (typeof url !== "string" || !url.trim()) {
    return json<ActionData>(
      { error: "Invalid URL provided." },
      { status: 400 }
    );
  }

  const baseUrl = process.env.SHORT_URL_SERVICE_URL;
  if (!baseUrl) {
    return json<ActionData>(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/create-short-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ long_url: url, user_id: guestId }),
    });

    const responseData = await response.json();

    const headers = { "Set-Cookie": await commitSession() };

    if (!response.ok) {
      return json<ActionData>(
        {
          error: responseData.message || "Failed to create short URL.",
        },
        { status: response.status, headers }
      );
    }

    if (!responseData.short_url) {
      return json<ActionData>(
        {
          error: "Invalid response from URL service.",
        },
        { status: 500, headers }
      );
    }

    return json<ActionData>(
      {
        message: "URL shortened successfully",
        data: { shortUrl: responseData.short_url },
      },
      { status: 200, headers }
    );
  } catch (error) {
    const headers = { "Set-Cookie": await commitSession() };
    return json<ActionData>(
      { error: "Server Error." },
      { status: 500, headers }
    );
  }
}

export default function Index() {
  const [url, setUrl] = useState("");
  const actionData = useActionData<ActionData>();

  return (
    <>
      <div className="z-[3] w-full max-w-xl space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block leading-[1.2] text-transparent bg-clip-text">
            Shorten Your Loooong Links :)
          </span>
        </h1>
        <p className="text-center text-muted-foreground">
          Gotiny streamlines your online experience with easy URL shortening.
        </p>
        <Form method="post" className="flex space-x-2">
          <LinkInput
            name="url"
            type="url"
            placeholder="Enter your link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </Form>
        {actionData?.error && (
          <Alert variant="destructive">
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}
        {actionData?.data?.shortUrl && (
          <Alert>
            <AlertDescription>
              {actionData.message}:{" "}
              <a
                href={actionData.data.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                {actionData.data.shortUrl}
              </a>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <LinksTable />
    </>
  );
}
