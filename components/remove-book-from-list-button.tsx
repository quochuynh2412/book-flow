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
  bookName: string;
}
const RemoveBookFromListButton = ({
  listId,
  listName,
  bookId,
  bookName,
}: RemoveBookFromListButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button variant={"destructive"} onClick={() => setIsOpen(true)}>
        Remove
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Are you sure to remove {bookName} from {listName} ?
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
