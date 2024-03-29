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
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookList } from "@/types/interfaces";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

interface AddBookToListButtonProps {
  bookId: string;
  bookTitle: string;
}

const formSchema = z.object({
  listId: z.string().min(10, { message: "Please select a list to add to" }),
  message: z.string().optional(),
});

const AddBookToListButton = ({
  bookId,
  bookTitle,
}: AddBookToListButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lists, setLists] = useState<BookList[] | null>(null);
  const { loggedIn } = useAuth();
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listId: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading2(true);
    await axios.post(
      `/api/list/${values.listId}/book/${bookId}?note=${values.message}&title=${bookTitle}`
    );
    setLoading2(false);
    setIsOpen(false);
    form.reset();
    window.location.reload();
  };
  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      const response = await axios.get(`/api/list?bookId=${bookId}`);
      setLists(response.data.lists);
      setLoading(false);
    }
    if (loggedIn) {
      fetchList();
    }
  }, [loggedIn, loading2]);
  return (
    <>
      <Button className="rounded-full hover:bg-rose-900 bg-rose-800 font-serif" onClick={() => setIsOpen(true)}>Add this book to list</Button>
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
                        <FormLabel>List</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={""}
                        >
                          <FormControl>
                            <SelectTrigger disabled={lists?.length === 0}>
                              <SelectValue
                                placeholder={
                                  lists?.length === 0
                                    ? "No valid list to add to, try creating one"
                                    : "Select a list to add to"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lists?.length == 0 && <></>}
                            {lists?.length !== 0 &&
                              lists?.map((list) => (
                                <SelectItem key={list.id} value={list.id}>
                                  {list.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your note" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-24" disabled={loading2}>
                      Add
                    </Button>
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
