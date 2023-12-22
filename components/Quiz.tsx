"use client"

// firebase
import { collection, doc, addDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  type: z.string().min(1)
})

export default function Quiz(props: { description: string }) {

  // Two values, 1 question and 4 answers
  const [question, setQuestion] = useState<string>("Question loading...");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("Placeholder correct answer");
  const [fact, setFact] = useState<string>("Placeholder fact");
  const [attempt, setAttempt] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [isDisabled, setDisabled] = useState(false);

  // If the description changes, get a new question
  useEffect(() => {
    setQuestion(getQuestion(props.description));
  }, [props.description]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  async function submit() {
    const user = auth.currentUser;

    if (user) {
      const userID : string = await user.uid;

      // find the document with the same userID
      const docRef = doc(db, "user", userID);
      const docSnap = await getDoc(docRef);

      // create score field if it does not exist
      if (docSnap.data()?.score == undefined) {
        await updateDoc(docRef, {
          score: 1,
        });
      } else {
        // for each correct submit, adds 1 to the score
        await updateDoc(docRef, {
          score: docSnap.data()?.score + 1,
        });
      }

    } else {
      toast({
        description: "You have to login to play the quiz!",
      })
    }
  }

  function getFact(description: string) {
    const regexSentence = (/\s*[\p{L}\d\w,;'"–—\-()%:\\n\\n\\nSách liên quan\s]+[.?!]*/gu);
    const sentences = description.match(regexSentence);

    // if the description is empty or the sentences array is null or undefined
    if (description.length == 0 || sentences === null || sentences === undefined) {
      return "No description available";
    }

    // fact
    const fact = sentences[Math.floor(Math.random() * sentences.length)];
    setFact(fact);
  }

  // Input the description, return a random sentence
  function getQuestion(description: string) {
    // const description = books[0].description;
    // const sentences = description.split(".");
    // const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    // (/\p{L}+[.?!]/gu); // this only matches one word
    // (/\p{L}+[\p{L}\s]+[.?!]/gu);
    // (/([\p{Lu}]|[A-Z]|[.!?]?[1-9])[^.!?]*[.!?]/gu);

    // match all (Latin underscore OR A-Z OR . ! ?
    // MUST ESCAPE THE - (U+002D : HYPHEN-MINUS)
    const regexSentence = (/\s*[\p{L}\d\w,;'"–—\-()%:\\n\\n\\nSách liên quan\s]+[.?!]*/gu);
    const sentences = description.match(regexSentence);

    // if the description is empty or the sentences array is null or undefined
    if (description.length == 0 || sentences === null || sentences === undefined) {
      setDisabled(true);
      return "No description available";
    }

    // question
    const question = sentences[Math.floor(Math.random() * sentences.length)];

    // fact
    const fact = sentences[Math.floor(Math.random() * sentences.length)];
    getFact(description);

    // select random 1-5 words from the question
    const regexWords = (/\p{L}+|\d+[!@#$%^&*()_+{}|:"<>?\-=\[\]\\;',.\/]?/gu);
    const words = question.match(regexWords);

    if (words === null || words === undefined) {
      return "No corect answer available";
    }
    const min = 0;
    const max = words.length - 1;
    const length = getRandomArbitrary(min, max);
    
    let correctAnswer = words[Math.floor(length)];

    // set useState
    setCorrectAnswer(correctAnswer);
    setAnswers(oldArray => [...oldArray, correctAnswer]);

    // replace the correct answer with a blank
    const regexCorrectAnswer = new RegExp(correctAnswer, "gu");
    const blank = "__________";
    const questionWithBlank = question.replace(regexCorrectAnswer, blank);
    
    // call function
    getAnswers(description);
    
    return questionWithBlank;
  }

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Fisher-Yates (aka Knuth) Shuffle
  function shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function getAnswers(description: string) {

    // used to be regex, now it splits by space
    const words = description.split(" ");

    for (let i = 0; i < 3; i++) {
      // random word size
      const location = Math.floor(Math.random() * words.length);
      let randomWord = words[location];

      for (let i = 1; i <= getRandomArbitrary(1, 3); i++) {
        randomWord = randomWord.concat(" " + words[location + i]);
      }

      setAnswers(oldArray => shuffle([...oldArray, randomWord]));
    }
  }

  // Shadcn codes
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {

    // increment the attempt (1/8)
    setAttempt(attempt + 1);

    // if correct answer is selected
    if (data.type == correctAnswer) {
      toast({
        title: "Correct!",
        description: (
          <div className="flex flex-col space-y-2">
            <p className="text-justify text-black/50 text-sm md:text-md lg:text-lg">Did you know that <span className="text-black/50">{fact}</span></p>
          </div>
        ),
      })

      // reload the form
      form.reset();

      // clear the answers array (2/8), THIS WILL CAUSE THE FORM TO RE-RENDER
      setAnswers([]);

      // clear the correct answer (3/8)
      setCorrectAnswer("");

      // clear the fact (4/8)
      setFact("");

      // clear the question (5/8)
      setQuestion("");

      // get a new question (6/8)
      setQuestion(getQuestion(props.description));

      // increment the score (7/8)
      setScore(score + 1);

      submit();

    } else {

      // get the radio button selected and make it red
      // document.querySelector("input[type=radio][value=" + data.type + "]")?.parentElement?.classList.add("bg-red-200", "rounded-lg", "animate-pulse");

      toast({
        title: "Wrong!",
        description: (
          <div className="flex flex-col space-y-2">
            <p className="text-justify text-white/50 text-sm md:text-md lg:text-lg">Did you know that <span className="text-white/50">{fact}</span></p>
          </div>
        ),
        variant: "destructive",
      })

      // since the user already read the fact, get a new fact
      getFact(props.description);
    }

    // if attempt is 3, disable the submit button (8/8)
    if (attempt >= 3) {
      setDisabled(true);
      setQuestion("Your score is");
      setAnswers([]);
      setFact("");
      setCorrectAnswer("");
      return;
    }
  }

  return (
    <div className="mx-auto py-5 px-4 lg:max-w-6xl lg:px-0 flex flex-col justify-center items-center border-slate-100 border-2 shadow-lg rounded-2xl bg-slate-200">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-11/12 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <div className="flex flex-row items-center justify-center mb-10">
                  <p className="text-justify text-sm md:text-md lg:text-lg inline-block align-middle mr-1 md:mr-5 lg:mr-7">{question}</p>
                  {
                    isDisabled ? (
                      score == 0 ? (
                        <p className="text-justify text-sm md:text-md lg:text-lg inline-block align-middle mr-1 md:mr-5 lg:mr-7">{score}/3</p>
                      ) : (
                        <p className="text-justify text-sm md:text-md lg:text-lg inline-block align-middle mr-1 md:mr-5 lg:mr-7">{score}/3</p>
                      )
                    ) : (
                      <p className="text-justify text-sm md:text-md lg:text-lg inline-block align-middle mr-1 md:mr-5 lg:mr-7">{attempt}/3</p>
                    )
                  }
                </div>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
                >

                  {
                    answers.map((answer, index) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={answer} />
                          </FormControl>
                          <FormLabel className="font-normal text-xs md:text-md lg:text-lg">{answer}</FormLabel>
                        </FormItem>
                      )
                    })
                  }
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="w-40 h-auto" disabled={isDisabled}>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
