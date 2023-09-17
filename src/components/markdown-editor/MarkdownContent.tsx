import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "../../lib/utils/cn";

const MarkdownContent = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <ReactMarkdown className={cn("markdown-content", className)}>
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
