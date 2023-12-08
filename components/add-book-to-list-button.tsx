"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookList } from "@/types/interfaces";

interface AddBookToListButtonProps {
  bookId: string;
}

const formSchema = z.object({
  listId: z.string(),
});

const AddBookToListButton = ({ bookId }: AddBookToListButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lists, setLists] = useState<BookList[] | null>(null);
  const { loggedIn } = useAuth();
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.post(`/api/list/${values.listId}/book/${bookId}`);
  };
  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      const response = await axios.get("/api/list");
      setLists(response.data.lists);
      setLoading(false);
    }
    if (loggedIn) {
      fetchList();
    }
  }, [loggedIn]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add this book to list</Button>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          {!loggedIn && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-xl">
                  Please log in to use this functionality.
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Link href="/login">
                  <Button>Log in</Button>
                </Link>
              </DialogFooter>
            </>
          )}
          {!!loggedIn && loading && (
            <div className="w-full h-full flex items-center flex-col">
              <Loader2 className="h-24 w-24 animate-spin" />
              <p>Loading...</p>
            </div>
          )}
          {!!loggedIn && !loading && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-xl">
                  Select a list to add this book to
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="listId"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a list to add to" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lists?.map((list) => (
                              <SelectItem key={list.id} value={list.id}>
                                {list.bookListName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add</Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBookToListButton;
