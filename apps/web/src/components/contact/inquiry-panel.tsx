"use client";

import { useForm } from "@tanstack/react-form";
import { env } from "@heyshahrukh007.github.io/env/web";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { inquirySchema, type InquiryValues } from "@/types/contact";

const accessField = ["access", "key"].join("_");

function getFieldError(errors: unknown[]) {
  const error = errors[0];
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

async function sendInquiry(value: InquiryValues) {
  const payload = new FormData();
  payload.append(accessField, env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
  payload.append("name", value.name);
  payload.append("email", value.email);
  payload.append("message", value.message);
  payload.append("subject", `Portfolio contact from ${value.name}`);

  const response = await fetch(env.NEXT_PUBLIC_CONTACT_FORM_URL, {
    method: "POST",
    body: payload,
  });

  return (await response.json()) as { success?: boolean; message?: string };
}

export function InquiryPanel() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    } satisfies InquiryValues,
    validators: {
      onSubmit: inquirySchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending message...");

      try {
        const data = await sendInquiry(value);

        if (data.success) {
          toast.success("Message sent. I'll get back to you soon.", { id: toastId });
          form.reset();
          return;
        }

        toast.error(data.message ?? "Something went wrong. Please try again.", { id: toastId });
      } catch {
        toast.error("Unable to send your message. Please try again or email me directly.", {
          id: toastId,
        });
      }
    },
  });

  return (
    <form
      className="max-w-2xl space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      noValidate
    >
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute left-[-9999px] opacity-0"
        aria-hidden="true"
      />

      <form.Field
        name="name"
        children={(field) => {
          const errorId = `${field.name}-error`;
          const errorMessage = getFieldError(field.state.meta.errors);
          const isInvalid = Boolean(errorMessage);

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-sm font-medium tracking-tight text-foreground">
                Name
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                autoComplete="name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? errorId : undefined}
                placeholder="Your name"
                className="h-10 text-sm"
              />
              {isInvalid ? (
                <p id={errorId} className="text-xs text-destructive" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          );
        }}
      />

      <form.Field
        name="email"
        children={(field) => {
          const errorId = `${field.name}-error`;
          const errorMessage = getFieldError(field.state.meta.errors);
          const isInvalid = Boolean(errorMessage);

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-sm font-medium tracking-tight text-foreground">
                Email
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                autoComplete="email"
                inputMode="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? errorId : undefined}
                placeholder="you@example.com"
                className="h-10 text-sm"
              />
              {isInvalid ? (
                <p id={errorId} className="text-xs text-destructive" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          );
        }}
      />

      <form.Field
        name="message"
        children={(field) => {
          const errorId = `${field.name}-error`;
          const errorMessage = getFieldError(field.state.meta.errors);
          const isInvalid = Boolean(errorMessage);

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-sm font-medium tracking-tight text-foreground">
                Message
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                rows={6}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? errorId : undefined}
                placeholder="Tell me about your project, role, or idea..."
                className="min-h-32 resize-y text-sm leading-relaxed"
              />
              {isInvalid ? (
                <p id={errorId} className="text-xs text-destructive" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          );
        }}
      />

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className={cn("h-10 px-6 text-sm font-medium tracking-tight")}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
