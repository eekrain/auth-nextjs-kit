import { BsCheckCircle } from "react-icons/bs";

import React from "react";

type Props = {
  message?: string;
};

export const FormSuccess = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BsCheckCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};
