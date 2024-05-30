import React, { useState } from "react";
import { Button } from "../ui/button";

const CopyLabel = ({ text }: { text: string }) => {
  const [label, setLabel] = useState("copy");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy the text: ", err);
    }
  };

  const handleClick = () => {
    copyToClipboard(text);
    setLabel("copied!");
  };

  return (
    <Button
      onClick={handleClick}
      variant={"outline"}
      className="text-sm text-muted-foreground bg-background my-0 h-auto rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:bg-primary hover:text-primary-foreground pt-0 pb-0.5"
    >
      {label}
    </Button>
  );
};

export default CopyLabel;
