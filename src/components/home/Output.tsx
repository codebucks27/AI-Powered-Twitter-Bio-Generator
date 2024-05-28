"use client";
import React, { useContext } from "react";
import { Badge } from "../ui/badge";
import { BioContext } from "@/context/BioContext";
import CopyLabel from "./CopyLabel";
import { Skeleton } from "../ui/skeleton";
import { BorderBeam } from "../magicui/BorderBeam";

const RenderOutput = () => {
  const { output, loading } = useContext(BioContext);

  return (
    <div className="relative flex h-full mt-2 min-h-[50vh] flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5">
      {loading ? <BorderBeam size={1200} borderWidth={1.5} duration={4} className="z-10" /> : null}
      <Badge
        variant="outline"
        className="absolute right-3 top-3 z-50"
      >
        Output
      </Badge>
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 pt-12 xs:p-12 lg:p-16">
          {output?.data.map((data, index) => {
            return (
              <li
                key={index}
                className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
              >
                {data.bio}
                <span className="absolute top-[99%] right-0">
                  <CopyLabel text={data.bio} />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RenderOutput;
