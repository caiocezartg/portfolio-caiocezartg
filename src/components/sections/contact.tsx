"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "@/components/ui/contact-form";
import OnlineStatus from "../ui/online-status";

const ContactSection = forwardRef<HTMLElement>((props, ref) => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/caiocezartg",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/caio-cezar-toledo-gon%C3%A7alves/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:caiocezartg@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading"
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg text-text-secondary mb-3 max-w-2xl mx-auto"
        >
          Have a project in mind or just want to chat about web development?
          <br />
          Just send me an email and I&apos;ll get back to you as soon as
          possible ;)
        </motion.p>

        <div className="mb-12">
          <OnlineStatus />
        </div>

        <div className="mb-16">
          <ContactForm />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 glass-card rounded-2xl text-text-secondary hover:text-accent transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-card-border"
        >
          <p className="text-text-secondary text-sm">
            {new Date().getFullYear()} - Designed with ❤️ by Caio Cezar
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
