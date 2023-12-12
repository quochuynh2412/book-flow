"use client"

// get data
import book from '../lib/scraper/sachvuii/json/book.json';
import { Book, Genre, Author } from "@/types/interfaces";

// for react hooks
import { useEffect, useState } from "react";

// for shadcn
import { Label } from "@/components/ui/label"
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
  // type: z.enum(["all", "mentions", "none"], {
  //   required_error: "You need to select a notification type.",
  // }),
  type: z.string().min(1)
})

export default function Quiz(props: { description: string }) {

  // Two values, 1 question and 4 answers
  const [question, setQuestion] = useState<string>("Question loading...");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("Placeholder correct answer");
  const [fact, setFact] = useState<string>("Placeholder fact");
  const [score, setScore] = useState<number>(0);

  // If the description changes, get a new question
  useEffect(() => {
    setQuestion(getQuestion(props.description));
  }, [props.description]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

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
    // select random 1-5 words from the description
    const regexWords = (/\p{L}+|\d+[!@#$%^&*()_+{}|:"<>?\-=\[\]\\;',.\/]?/gu);
    const words = description.match(regexWords);

    if (words === null || words === undefined) {
      return "No answers available";
    }

    let count = 0;

    while (true) {
      const min = 0;
      const max = words.length - 1;
      const length = getRandomArbitrary(min, max);
      let falseAnswer = words[Math.floor(length)];
      
      // if falseAnswer is not yet in answers array
      if (!answers.includes(falseAnswer)) {
        setAnswers(oldArray => [...oldArray, falseAnswer]);
        shuffle(answers);
      }

      count++;

      if (answers.length == 4 || count >= 3) {
        break;
      }
    }
  }

  // Shadcn codes
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {

    // if correct answer is selected
    if (data.type == correctAnswer) {
      toast({
        title: "Correct!",
        description: (
          <div className="flex flex-col space-y-2">
            <p className="text-justify text-black/50 text-sm md:text-md lg:text-lg"><span className="text-green-600">The correct answer is</span> <span className="text-black font-bold">{correctAnswer}</span></p>
            <p className="text-justify text-black/50 text-sm md:text-md lg:text-lg">Did you know that <span className="text-black/50">{fact}</span></p>
          </div>
        ),
      })

      // reload the form
      form.reset();

      // increment the score (1/6)
      setScore(score + 1);

      // clear the answers array (1/6), THIS WILL CAUSE THE FORM TO RE-RENDER
      setAnswers([]);

      // clear the correct answer (2/6)
      setCorrectAnswer("");

      // clear the fact (3/6)
      setFact("");

      // clear the question (4/6)
      setQuestion("");

      // get a new question (5/6)
      setQuestion(getQuestion(props.description));
    } else {

      // get the radio button selected and make it red
      // document.querySelector("input[type=radio][value=" + data.type + "]")?.parentElement?.classList.add("bg-red-200", "rounded-lg", "animate-pulse");

      toast({
        title: "Wrong!",
        description: (
          <div className="flex flex-col space-y-2">
            <p className="text-justify text-white/50 text-sm md:text-md lg:text-lg">The correct answer is <span className="text-white font-bold">{correctAnswer}</span></p>
            <p className="text-justify text-white/50 text-sm md:text-md lg:text-lg">Did you know that <span className="text-white/50">{fact}</span></p>
          </div>
        ),
        variant: "destructive",
      })

      // since the user already read the fact, get a new fact
      getFact(props.description);
    }
  }

  return (
    <div className="mx-auto py-12 px-4 lg:max-w-4xl lg:px-0 flex flex-col justify-center items-center border-slate-100 border-2 shadow-lg rounded-2xl bg-slate-200">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-3/4 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <div className="flex flex-row items-center justify-center mb-10">
                  <p className="text-justify text-sm md:text-md lg:text-lg inline-block align-middle mr-1 md:mr-5 lg:mr-7">{question}</p>
                  <span className="transition ease-in-out delay-15 hover:-translate-y-7 hover:scale-110 duration-300 text-cyan-600 text-2xl md:text-4xl lg:text-7xl">🧠</span>
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
          <Button type="submit" className="w-40 h-auto">Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
