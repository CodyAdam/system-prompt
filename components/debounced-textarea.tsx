import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

interface DebouncedTextareaProps extends Omit<React.ComponentProps<"textarea">, "onChange" | "value"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  debounceTime?: number;
}

function DebouncedTextarea({ value = "", onChange, debounceTime = 1000, onBlur, ...props }: DebouncedTextareaProps) {
  const [internalValue, setInternalValue] = useState(value);

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounced onChange handler
  useEffect(() => {
    const timer = setTimeout(() => {
      if (internalValue !== value && onChange) {
        const syntheticEvent = {
          target: { value: internalValue },
          currentTarget: { value: internalValue },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [internalValue, value, onChange, debounceTime]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    if (internalValue !== value && onChange) {
      const syntheticEvent = {
        target: { value: internalValue },
        currentTarget: { value: internalValue },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(syntheticEvent);
    }
    if (onBlur) {
      const syntheticEvent = {
        target: { value: internalValue },
        currentTarget: { value: internalValue },
      } as React.FocusEvent<HTMLTextAreaElement, Element>;
      onBlur(syntheticEvent);
    }
  }, [internalValue, value, onChange, onBlur]);

  return <Textarea value={internalValue} onChange={handleChange} onBlur={handleBlur} {...props} />;
}

export { DebouncedTextarea };
