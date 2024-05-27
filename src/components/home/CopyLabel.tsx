import { Copy } from "lucide-react";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const CopyLabel = ({ text }: { text: string }) => {
  const [label, setLabel] = useState<string>("copy");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(text);
    setLabel("copied!");
  };

  return (
    <Button variant={"outline"} size={"sm"} className="text-sm text-muted-foreground bg-background my-0 h-auto rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:bg-primary hover:text-primary-foreground pb-0.5" onClick={handleCopyClick}>
      {label}
      
    </Button>
  );
};

export default CopyLabel;
