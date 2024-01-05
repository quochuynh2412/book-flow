"use client"

// firebase
import { collection, doc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";

// for react hooks
import { useEffect, useState } from "react";

// for shadcn
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  'question-1': z.string().min(10).max(1000)
})

const questionsSet = [
  {
    question: "Receive personal book recommendations based on the input, whether it be your wildest dreams or your deepest fears. The more you tell us, the better we can serve you.",
  }
]

export default function PersonalityTest() {


  // nested state for the user genres
  const [userGenres, setUserGenres] = useState<string[]>([]);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);


  // useeffect to get the user personality type
  useEffect(() => {
    // action on update
    if (userGenres.length > 0) {
      // toast({
      //   title: "We think you may like ...",
      //   description: (
      //     <>
      //       {
      //         userGenres.map((genre, index) => {
      //           return (
      //             <div key={index}>
      //               <span>{genre.split("@")[0]}</span>
      //               <span> with a confidence of {parseFloat(genre.split("@")[1]).toFixed(2)}</span>
      //             </div>
      //           )
      //         })
      //       }
      //     </>
      //   ),
      // })
      updateToFirebase();
    }
}, [userGenres]);


// 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'question-1': "",
    },
  })


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    getRecommnedationGenres(values["question-1"]);

    updateToFirebase();

    // clear text field
    form.setValue("question-1", "");
  }


  async function getRecommnedationGenres(question: string) {

    // disable the form while waiting for the response
    setFormDisabled(true);

    // wait/sleep
    // await new Promise(r => setTimeout(r, 100000));

    const stagingQuery = "https://ekaterina2.pythonanywhere.com/question/" + question;
    // const stagingQuery = "https://ekaterina2.pythonanywhere.com/"

    // toast({
    //   title: "Our AI is thinking ...",
    //   description: (
    //     <>
    //       {/* <div>{stagingQuery}</div> */}
    //       <div>Check back in a few minutes</div>
    //     </>
    //   ),
    // })

    setUserGenres([]);

    await fetch(stagingQuery, {
      method: "GET",
    }).then(async (response) => {
      const data = await response.json();

      // changed from data.length to 3
      for (let i = 0; i < 3; i++) {
        const genre = data[i][0] + "@" + data[i][1];
        await setUserGenres((userGenres) => [...userGenres, genre]);
      }

    }).catch(error => {
      console.error("Failed to fetch recommendation genres:", error)
    });

    // enable the form
    // setFormDisabled(false);
  }


  async function updateToFirebase() {
    const user = auth.currentUser;

    const tempGenres = userGenres.map((genre) => {
      return genre.split("@")[0];
    })

    if (user) {
      const userID : string = await user.uid;

      // find the genre ID based on genre name
      const genreRef = collection(db, "genre");
      const genreQuery = await getDocs(genreRef);
      let genreID : string[] = [];
      genreQuery.forEach((doc) => {
        if (tempGenres.includes(doc.data().name)) {
          genreID.push(doc.id);
        }
      });


      // find the document with the same userID
      const docRef = doc(db, "user", userID);
      const docSnap = await getDoc(docRef);

      // create preferredGenre if it doesn't exist
      if (docSnap.data()?.preferredGenre == undefined) {
        await updateDoc(docRef, {
          preferredGenre: genreID,
        });
      } else {
        await updateDoc(docRef, {
          preferredGenre: genreID,
        });
      }


    } else {
      toast({
        description: "You have to login to save your preferred genres",
      })
    }
  }


  return (
    <div className="mx-auto py-5 px-4 lg:max-w-6xl lg:px-0 flex flex-col justify-center items-center border-slate-100 border-2 shadow-lg rounded-2xl bg-slate-200">
      {formDisabled ? (
        <div className="w-full h-full flex justify-center items-center">
          {userGenres.length == 0 ? (
            <>
              <div className="md:text-lg lg:text-2xl">Our AI is thinking&nbsp;</div>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8"
                />
              </svg>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-6">
              <div className="md:text-lg lg:text-2xl font-bold">We think you may like ...</div>
              <div className="space-y-1">
                {
                  userGenres.map((genre, index) => {
                    return (
                      <div key={index}>
                        <span>{genre.split("@")[0]}</span>
                        <span> with a confidence of {parseFloat(genre.split("@")[1]).toFixed(2)}</span>
                      </div>
                    )
                  })
                }
                <div className="text-green-500">Your preferences have been saved</div> 
              </div>
              <div>
                <Button onClick={() => setFormDisabled(false)} className="w-40 h-auto">Retake</Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-11/12 space-y-6">
            <fieldset disabled={formDisabled} className="space-y-6">
                {
                  questionsSet.map((question, index) => {
                    return (
                      <FormField
                        key={index}
                        control={form.control}
                        name="question-1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="">{question.question}</FormLabel>
                            <FormControl>
                              <Input placeholder="Your answer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  })
                }
              <div className="flex justify-center">
                <Button type="submit" className="w-40 h-auto">Submit</Button>
              </div>
            </fieldset>
          </form>
        </Form>
      )}
    </div>
  )
}
