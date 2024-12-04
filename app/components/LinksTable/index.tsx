import { useState } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { useLoaderData } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { LoaderData } from "~/routes/_index";
import { formatDate, formatRelativeTime } from "~/lib/utils";

const LinksTable = () => {
  const loaderData = useLoaderData<LoaderData>();
  const [_, setCopiedId] = useState<string | null>(null);

  if (loaderData.error) {
    return (
      <Alert className="z-[4] w-full max-w-xl" variant="destructive">
        <AlertDescription>{loaderData.error}</AlertDescription>
      </Alert>
    );
  }

  const urls = loaderData.data?.data || [];

  if (!urls.length) {
    return (
      <Alert className="z-[4] w-full max-w-xl">
        <AlertDescription>
          No URLs found. Create your first short link above!
        </AlertDescription>
      </Alert>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (url: string | undefined) => {
    const iconSize = "w-5 h-5";

    if (!url) {
      return <div className={`${iconSize} bg-gray-600 rounded-sm`} />;
    }

    if (url.includes("twitter.com")) {
      return <div className={`${iconSize} bg-blue-400 rounded-full`} />;
    }
    if (url.includes("youtube.com")) {
      return <div className={`${iconSize} bg-red-600 rounded-sm`} />;
    }
    if (url.includes("vimeo.com")) {
      return <div className={`${iconSize} bg-blue-500 rounded-sm`} />;
    }
    return <div className={`${iconSize} bg-gray-600 rounded-sm`} />;
  };

  return (
    <div className="rounded-lg border bg-background z-[4]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground">Short Link</TableHead>
            <TableHead className="text-muted-foreground">
              Original Link
            </TableHead>
            <TableHead className="text-muted-foreground text-center">
              Clicks
            </TableHead>
            <TableHead className="text-muted-foreground">Created At</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.ShortURL} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <a
                    href={url.ShortURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {"gotiny.fun/" + url.ShortURL}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:cursor-pointer"
                    onClick={() => handleCopy("gotiny.fun/" + url.ShortURL)}
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPlatformIcon(url.OriginalURL)}
                  <a
                    href={url.OriginalURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline truncate max-w-md"
                  >
                    {url.OriginalURL}
                  </a>
                </div>
              </TableCell>
              <TableCell className="text-center text-muted-foreground">
                {url.ClickCount}
              </TableCell>
              <TableCell className="text-muted-foreground">
                <span title={formatDate(url.CreateAt)}>
                  {url.CreateAt}
                  {formatRelativeTime(url.CreateAt)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinksTable;
