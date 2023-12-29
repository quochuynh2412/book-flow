"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateBookListButton from "@/components/create-list-button";
import DeleteListButton from "@/components/delete-list-button";
import { useEffect, useState } from "react";
import { BookList } from "@/types/interfaces";
import axios from "axios";
import RemoveBookFromListButton from "@/components/remove-book-from-list-button";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const ListPage = () => {
  const [currentListIndex, setCurrentListIndex] = useState<number | null>(null);
  const [lists, setLists] = useState<BookList[] | null>(null);
  useEffect(() => {
    async function fetchList() {
      const response = await axios.get(`/api/list?`);
      if (lists != null && lists.length >= 1) {
        setCurrentListIndex(0);
      }
      setLists(response.data.lists);
    }
    fetchList();
  }, []);
  return (
    <div>
      <Header />
      <div className="h-screen w-full mx-auto p-5 flex flex-col gap-5 box-border md:flex-row md:w-3/4">
        <div className="mx-auto w-full md:basis-1/4">
          <div className="w-full h-14 p-3 border border-gray-200 bg-[#f5f4f4] box-border rounded-t-md font-semibold flex justify-between items-center">
            <p>My List</p>
            <CreateBookListButton />
          </div>
          {lists?.map((list, index) => (
            <div
              key={list.id}
              onClick={() => {
                setCurrentListIndex(index);
              }}
              className={`w-full h-14 p-3 border border-gray-200 flex items-center cursor-pointer ${
                index == lists.length - 1 ? "rounded-b-md" : ""
              } ${index == currentListIndex ? "bg-[#337ab7] text-white" : ""} `}
            >
              {list.name}
            </div>
          ))}
        </div>

        <div className="mx-auto h-full w-full flex flex-col md:basis-3/4">
          <div className="w-full h-14 p-3 bg-[#f5f4f4] border border-gray-200 box-border rounded-t-md font-semibold flex justify-between items-center">
            {currentListIndex === null ? (
              <>
                <p>You have not selected a list</p>
              </>
            ) : (
              <>
                {lists != null && (
                  <>
                    <p>{lists[currentListIndex].name}</p>
                    <DeleteListButton
                      listId={lists[currentListIndex].id}
                      name={lists[currentListIndex].name}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {currentListIndex === null ? (
            <div
              className="w-full h-full flex border border-gray-200 rounded-b-md items-center justify-center text-xl text-gray-500
                        "
            >
              Please select a list to see the content of it
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                {lists != null &&
                  lists[currentListIndex].books.length > 0 &&
                  lists[currentListIndex].books.map((book, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <div className="w-full h-14 p-3 border border-gray-200 box-border flex justify-between items-center">
                          <Link
                            key={book.title}
                            href={`/book/${book.bookId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p>{book.title}</p>
                          </Link>
                          <RemoveBookFromListButton
                            key={index}
                            listId={lists[currentListIndex].id}
                            listName={lists[currentListIndex].name}
                            bookId={book.bookId}
                            bookTitle={book.title}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{book.note}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}

                {lists != null && lists[currentListIndex].books.length == 0 && (
                  <div
                    className="w-full h-full flex border border-gray-200 rounded-b-md items-center justify-center text-xl text-gray-500
                                   "
                  >
                    You have not added book to this list
                  </div>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListPage;
