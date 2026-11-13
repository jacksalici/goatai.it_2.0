"use client";

import { ArrowUp, Plus } from "lucide-react";
import { useState } from "react";

import { DotField } from "@/components/dot-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestions } from "@/lib/content";

export function AskSection() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setSent(trimmed);
    setQuestion("");
  }

  return (
    <section id="ask" className="shell pt-7 pb-17.5 sm:pt-12 sm:pb-24">
      <DotField
        gradient={false}
        dotColor="brand"
        fade
        className="grid min-h-155 place-items-center rounded-[25px] bg-foreground px-4.5 py-16 sm:min-h-140 sm:rounded-[32px] sm:px-10 sm:py-20"
      >
        <div className="relative flex w-full flex-col items-center text-center">
          <h2 className="font-serif text-[44px] leading-[1.1] tracking-[-0.96px] text-background sm:text-[clamp(46px,5vw,64px)]">
            Ask the goat <em>anything.</em>
          </h2>
          <p className="mt-5 mb-7.5 text-[15px] text-background/70 sm:text-[17px]">
            Tell us what you’re working on. A human will read it, the goat will
            help.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-190 rounded-[28px] bg-card pt-5 pr-3.5 pb-3.5 pl-4 text-left shadow-2xl sm:pl-5.5"
          >
            <label htmlFor="goat-question" className="sr-only">
              Ask GoatAI a question
            </label>
            <Input
              id="goat-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="How could GoatAI help my team this quarter?"
              className="mb-4 h-auto border-0 p-0 text-[15px] shadow-none placeholder:text-subtle-foreground focus-visible:ring-0 sm:text-lg md:text-lg"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  className="rounded-full bg-card text-muted-foreground"
                  aria-label="Add attachment"
                >
                  <Plus className="size-5" strokeWidth={1.33} />
                </Button>
                <Badge
                  variant="outline"
                  className="gap-1.5 px-2.5 py-2 text-xs font-normal text-muted-foreground sm:px-3.5 sm:text-sm"
                >
                  <span className="size-2 rounded-full bg-brand" />
                  Human review on
                </Badge>
              </div>
              <Button
                type="submit"
                size="icon-lg"
                className="rounded-full hover:scale-107"
                aria-label="Send question"
              >
                <ArrowUp className="size-5" strokeWidth={1.33} />
              </Button>
            </div>
          </form>

          <div className="mt-4.5 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuestion(suggestion)}
                className="rounded-full border-background/60 bg-foreground/80 px-3 text-xs font-normal text-background shadow-none hover:bg-background hover:text-foreground sm:px-4 sm:text-sm"
              >
                {suggestion}
              </Button>
            ))}
          </div>

          {sent && (
            <div
              role="status"
              className="mt-4.5 w-full max-w-190 rounded-2xl border border-background/30 bg-foreground/70 px-4.5 py-3 text-left text-sm text-background"
            >
              <span className="font-medium text-brand">Received</span>
              <p className="mt-0.5">“{sent}” — the herd will be in touch.</p>
            </div>
          )}
        </div>
      </DotField>
    </section>
  );
}
