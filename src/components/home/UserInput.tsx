"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { BioContext } from "@/context/BioContext";
import { generateBio } from "../../app/actions";
import { Switch } from "../ui/switch";
import MetaIcon from "../icons/Meta";
import MistralIcon from "../icons/Mistral";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  temperature: z
    .number()
    .min(0, "Temperature must be at least 0")
    .max(2, "Temperature must be at most 2"),
  content: z
    .string()
    .min(50, "Content should atleast have 50 characters.")
    .max(500, "Content should not exceed 500 character limit."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  tone: z.enum(
    [
      "professional",
      "casual",
      "sarcastic",
      "funny",
      "passionate",
      "thoughtful",
    ],
    { errorMap: () => ({ message: "Tone is required" }) }
  ),
  emojis: z.boolean(),
});

const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
    },
  });

  const { setOutput, setLoading, loading } = useContext(BioContext);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const UpdatedValues = `User Input:
    About User: ${values.content},
    Bio Tone: ${values.tone},
    Bio Type: ${values.type},
    Add Emojis: ${values.emojis}
    `;
    // ${values.emojis ? 'Add emojis' : ''}
    const { data } = await generateBio(
      UpdatedValues,
      values.temperature,
      values.model
    );
    setOutput(data);
    setLoading(false);
  }

  return (
    <div
      className="relative flex flex-col items-start gap-8 "
      x-chunk="dashboard-03-chunk-0"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="llama3-8b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MetaIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                <span className="font-medium text-foreground mr-2">
                                  Llama 3
                                </span>
                                8B
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            {/* <Bird className="size-5" /> */}
                            <MistralIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                <span className="font-medium text-foreground mr-2">
                                  Mixtral
                                </span>
                                8x7b 
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="llama3-70b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                        
                            <MetaIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                <span className="font-medium text-foreground mr-2">
                                  Llama 3
                                </span>
                                70b &#40;Recommended&#41;
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3 mb-2">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip delayDuration={400}>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm"
                          >
                            A higher setting produces more creative and
                            surprising bios, while a lower setting sticks to
                            more predictable and conventional styles.
                          </TooltipContent>
                        </Tooltip>
                      </span>{" "}
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        defaultValue={[1]}
                        className={"w-full"}
                        onValueChange={(val) => {
                          console.log(val);
                          onChange(val[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">
              User Input
            </legend>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Yourself</FormLabel>
                    <FormControl>
                      <Textarea
                        id="content"
                        placeholder="Add your old bio or write few sentances about yourself"
                        {...field}
                        className="min-h-[9.5rem]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-sm mr-4">Add Emojis</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        className="!my-0"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button className="rounded" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
