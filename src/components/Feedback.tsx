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

export default function Feedback({
  dataSource,
}: {
  dataSource: DataSourceType;
}) {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("Suggestion");
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

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
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className={`bg-${dataSource}-bg2 hover:bg-${dataSource}-bg3`}
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`w-96 p-8 text-${dataSource}-t1 bg-${dataSource}-bg2 rounded-xl border-none`}
      >
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription className={`text-secondary-text`}>
            Submit a suggestion or bug for this web extension.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[25%_75%] gap-y-4">
            <Label>Type</Label>
            <Dropdown
              dataSource={dataSource}
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
              className={`border-none max-h-96 bg-${dataSource}-bg3 hover:bg-${dataSource}-bg4 active:bg-${dataSource}-bg4 selection:bg-${dataSource}`}
              required
            />
            <Label>Email</Label>
            <Input
              defaultValue={userEmail}
              placeholder="example@domain.com"
              onChange={(e) => setUserEmail(e.target.value)}
              className={`border-none bg-${dataSource}-bg3 hover:bg-${dataSource}-bg4 active:bg-${dataSource}-bg4 selection:bg-${dataSource}`}
            />
          </div>
          <Button
            type="submit"
            className={`bg-${dataSource} hover:bg-${dataSource}/80 font-bold`}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
