"use client";

import { fetchData, postDataIntoDb } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  const [bookmarkFormData, setbookmarkFormData] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [bookmarks, setBookmarks] = useState();
  useEffect(() => {
    fetchData()
      .then((data) => setBookmarks(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    postDataIntoDb(bookmarkFormData);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Card className="w-[650px] m-auto my-5">
          <CardHeader>
            <CardTitle>Create Bookmark</CardTitle>
            <CardDescription>Create Bookmark with Title, url</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    value={bookmarkFormData.title}
                    id="title"
                    placeholder="Title of your Bookmark"
                    onChange={(e) =>
                      setbookmarkFormData({
                        ...bookmarkFormData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Url</Label>
                  <Input
                    value={bookmarkFormData.url}
                    id="url"
                    placeholder="url of your Bookmark"
                    onChange={(e) =>
                      setbookmarkFormData({
                        ...bookmarkFormData,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Description</Label>
                  <Textarea
                    value={bookmarkFormData.description}
                    placeholder="Type your Description here..."
                    onChange={(e) =>
                      setbookmarkFormData({
                        ...bookmarkFormData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="">
            <Button onClick={handleSubmit}>Add Bookmark</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-3">
        {bookmarks?.length > 0 ? (
          bookmarks.map((item) => (
            <Card className="w-[400px] m-auto my-5 h-40">
              <div className="ml-5 mt-4">
                <CardTitle className="mb-4">{item.title}</CardTitle>
                <Link
                  className="text-blue-600"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </Link>
                <p>{item.description}</p>
              </div>
            </Card>
          ))
        ) : (
          <CardTitle>No Bookmarks</CardTitle>
        )}
      </div>
    </div>
  );
}
