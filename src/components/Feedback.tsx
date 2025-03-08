import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Dropdown from "@/components/Dropdown";
import sendEmail from "@/api/email/sendEmail";

export default function Feedback() {

  const [ open, setOpen ] = useState(false);
  const [ feedbackType, setFeedbackType ] = useState<feedbackType>("Suggestion");
  const [ feedbackContent, setFeedbackContent ] = useState<string>("");
  const [ userEmail, setUserEmail ] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEmail({ feedbackType, feedbackContent, userEmail });
    resetInputFields();
  };

  const resetInputFields = () => {
    setOpen(false);
    setFeedbackType("Suggestion");
    setFeedbackContent("");
    setUserEmail("");
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-secondary-background hover:bg-tertiary-background"
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96 p-8 text-primary-text bg-secondary-background rounded-xl border-none">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription className="text-secondary-text">
            Submit a suggestion or bug for this web extension.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[25%_75%] gap-y-4">
            <Label>Type</Label>
            <Dropdown
              options={["Suggestion", "Bug"]}
              input={feedbackType}
              setInput={setFeedbackType}
              width={"w-56"}
            />
            <Label>Feedback</Label>
            <Textarea
              defaultValue={feedbackContent}
              placeholder="Type feedback here"
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="border-none max-h-96 bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background selection:bg-leetcode-orange"
              required
            />
            <Label>Email</Label>
            <Input
              defaultValue={userEmail}
              placeholder="example@domain.com"
              onChange={(e) => setUserEmail(e.target.value)}
              className="border-none bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background selection:bg-leetcode-orange"
            />
          </div>
          <Button type="submit" className="bg-leetcode-orange hover:bg-leetcode-orange/80 font-bold">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
