import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

export const providers: Record<
  string,
  {
    models: string[];
    keyUrl: string;
    createClient: (
      apiKey: string
    ) =>
      | ReturnType<typeof createGoogleGenerativeAI>
      | ReturnType<typeof createOpenAI>
      | ReturnType<typeof createAnthropic>;
  }
> = {
  "Google Generative AI": {
    keyUrl: "https://aistudio.google.com/apikey",
    models: [
      "gemini-1.5-flash",
      "gemini-1.5-flash-8b",
      "gemini-1.5-pro",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-2.0-pro-exp-02-05",
      "gemini-2.0-flash-exp",
      "gemini-2.5-pro",
      "gemini-2.5-flash",
      "gemini-exp-1206",
      "gemma-3-27b-it",
    ],
    createClient(apiKey: string) {
      const google = createGoogleGenerativeAI({
        apiKey,
      });
      return google;
    },
  },
  OpenAI: {
    keyUrl: "https://platform.openai.com/api-keys",
    models: [
      "o1",
      "o1-mini",
      "o3-mini",
      "o3",
      "o4-mini",
      "gpt-4.1",
      "gpt-4.1-mini",
      "gpt-4.1-nano",
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4-turbo",
      "gpt-4",
      "gpt-4.5-preview",
      "gpt-3.5-turbo",
      "chatgpt-4o-latest",
    ],
    createClient(apiKey) {
      const openai = createOpenAI({
        apiKey,
        compatibility: "strict",
      });
      return openai;
    },
  },
  Anthropic: {
    keyUrl: "https://console.anthropic.com/settings/keys",
    models: [
      "claude-4-opus-20250514",
      "claude-4-sonnet-20250514",
      "claude-3-7-sonnet-20250219",
      "claude-3-5-sonnet-latest",
      "claude-3-5-haiku-latest",
      "claude-3-opus-latest",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ],
    createClient(apiKey) {
      const anthropic = createAnthropic({
        apiKey,
      });
      return anthropic;
    },
  },
};
