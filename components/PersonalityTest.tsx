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
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  'question-0': z.string().min(1),
  'question-1': z.string().min(1),
  'question-2': z.string().min(1),
  'question-3': z.string().min(1)
})

// question set
const questionsSet = [
  {
    question: "Do you prefer to focus on the outer world or your inner world?",
    answers: [
      {
        answer: "Outer world",
        type: "E",
      },
      {
        answer: "Inner world",
        type: "I",
      },
    ],
  },
  {
    question: "Do you prefer to focus on the basic information you take in or do you prefer to interpret and add meaning?",
    answers: [
      {
        answer: "Basic information",
        type: "S",
      },
      {
        answer: "Interpret and add meaning",
        type: "N",
      },
    ],
  },
  {
    question: "When making decisions, do you prefer to first look at logic and consistency or first look at the people and special circumstances?",
    answers: [
      {
        answer: "Logic and consistency",
        type: "T",
      },
      {
        answer: "People and special circumstances",
        type: "F",
      },
    ],
  },
  {
    question: "In dealing with the outside world, do you prefer to get things decided or do you prefer to stay open to new information and options?",
    answers: [
      {
        answer: "Get things decided",
        type: "J",
      },
      {
        answer: "Stay open to new information and options",
        type: "P",
      },
    ],
  },
]

export default function PersonalityTest() {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    <div className="mx-auto py-5 px-4 lg:max-w-6xl lg:px-0 flex flex-col justify-center items-center border-slate-100 border-2 shadow-lg rounded-2xl bg-slate-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-11/12 space-y-6">
          {
            questionsSet.map((question, index) => {
              return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`question-${index}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm md:text-md lg:text-lg">{question.question}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {
                              question.answers.map((answer, index) => {
                                return (
                                  <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                    <FormControl>
                                      <RadioGroupItem value={answer.answer} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-xs md:text-md lg:text-lg">
                                    {answer.answer}
                                    </FormLabel>
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
              )
            })
          }
        <div className="flex justify-center">
          <Button type="submit" className="w-40 h-auto">Submit</Button>
        </div>
        </form>
      </Form>
    </div>
  )
}
