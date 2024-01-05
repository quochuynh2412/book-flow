"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

interface RemoveBookFromListButtonProps {
  listId: string;
  bookId: string;
  listName: string;
  bookTitle: string;
  setRefresh: (state: boolean) => void;
}
const RemoveBookFromListButton = ({
  listId,
  listName,
  bookId,
  bookTitle,
  setRefresh,
}: RemoveBookFromListButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        variant={"destructive"}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        Remove
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Are you sure to remove {bookTitle} from {listName} ?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"destructive"}
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await axios.delete(`/api/list/${listId}/book/${bookId}`);
                setLoading(false);
                setIsOpen(false);
                setRefresh(true);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RemoveBookFromListButton;
