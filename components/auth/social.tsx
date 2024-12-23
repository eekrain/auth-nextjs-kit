import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

type Props = {};

export const Social = (props: Props) => {
  return (
    <div className="flex items-center w-full gap-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub />
      </Button>
    </div>
  );
};
