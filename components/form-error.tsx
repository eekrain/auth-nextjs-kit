import { BsExclamationTriangle } from "react-icons/bs";

import React from "react";

type Props = {
  message?: string;
};

export const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <BsExclamationTriangle className="size-4" />
      <p>{message}</p>
    </div>
  );
};
