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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  bookListName: z.string().min(2).max(50),
});

interface CreateBookListButtonProps {
  setRefresh: (state: boolean) => void;
}

const CreateBookListButton = ({ setRefresh }: CreateBookListButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loggedIn } = useAuth();
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookListName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await axios.post("/api/list", {
      ...values,
    });
    setLoading(false);
    setRefresh(true);
    handleClose();
  };

  return (
    <>
      <span
        onClick={() => setIsOpen(true)}
        className="font-semibold text-xl cursor-pointer"
      >
        <Plus />
      </span>
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
          {!!loggedIn && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-xl">
                  Create a book list
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="bookListName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book list name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the name of the book list"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={loading}>
                      Create
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

export default CreateBookListButton;
