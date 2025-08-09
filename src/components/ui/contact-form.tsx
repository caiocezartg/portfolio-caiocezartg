"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto"
    >
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Message sent successfully!</span>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
        >
          <AlertCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Your name"
          className={`w-full px-4 py-3 bg-card-bg border rounded-xl text-foreground placeholder-text-secondary focus:border-accent focus:outline-none transition-colors ${
            errors.name ? "border-red-500" : "border-card-border"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-left text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="text"
          placeholder="Your email"
          className={`w-full px-4 py-3 bg-card-bg border rounded-xl text-foreground placeholder-text-secondary focus:border-accent focus:outline-none transition-colors ${
            errors.email ? "border-red-500" : "border-card-border"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-left text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your message"
          rows={5}
          className={`w-full px-4 py-3 bg-card-bg border rounded-xl text-foreground placeholder-text-secondary focus:border-accent focus:outline-none transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-card-border"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-left text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-transparent border border-accent text-accent rounded-xl font-medium hover:bg-accent hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </motion.form>
  );
}
