"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactModal = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send notification to you
      await emailjs.sendForm(
        "service_4ylwe1k",             // Your EmailJS service ID
        "template_6u3c85z",            // Template for your notification email
        formRef.current,
        "CU2lCEC91a9u6NQdR"            // Your EmailJS public key
      );

      // Grab values from form
      const senderEmail = formRef.current.email.value;
      const senderName = formRef.current.name.value;
      const senderMessage = formRef.current.message.value;

      // Send confirmation to sender
      await emailjs.send(
        "service_4ylwe1k",
        "template_zth09wa",            // Template for confirmation email
        { 
          email: senderEmail, 
          name: senderName, 
          message: senderMessage       // ✅ now passes {{message}} correctly
        },
        "CU2lCEC91a9u6NQdR"
      );

      setSubmitted(true);
      formRef.current.reset();
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Oops! Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-primary border-primary/30 hover:border-primary/60"
        >
          <Mail className="w-5 h-5 mr-2" />
          Contact Me
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-gradient-card border-primary/20 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            📬 Contact Me
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <p className="text-center text-green-500 mt-4">
            Thanks for reaching out! A confirmation email has been sent to you.
          </p>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-muted/20 text-foreground"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-muted/20 text-foreground"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-muted/20 text-foreground"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
