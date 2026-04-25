"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contacto() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const MAX_MESSAGE = 1000;

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
    if (status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 30000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const body = {
      subject: data.get("subject"),
      email: data.get("email"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "Ocurrió un error inesperado.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessageLength(0);
      formRef.current?.reset();
    } catch {
      setErrorMsg("No se pudo conectar con el servidor.");
      setStatus("error");
    }
  }

  return (
    <div className="w-full font-sans pt-3 pb-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[15px] overflow-hidden shadow-xl shadow-slate-200/20 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">

            {/* Panel izquierdo — brand */}
            <div className="group relative px-8 py-10 flex flex-col justify-center overflow-hidden min-h-[280px]">
              {/* Foto de fondo */}
              <Image
                src="/images/TorreBsAs.jpg"
                alt="Torre de Buenos Aires"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(255,255,255,0.40)" }}
              />

              <div className="relative z-10 bg-white/92 backdrop-blur-sm border border-white/50 rounded-2xl px-6 py-7 shadow-md">
                <h3 className="text-3xl font-extrabold text-[#1a3a52] tracking-tight leading-none mb-4">
                  Contacto
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-5" />
                <p className="text-slate-600 text-[13px] leading-relaxed mb-4">
                  <strong className="text-[#1a3a52]">Tu opinión nos importa.</strong> Si detectaste un problema, tenés una sugerencia o simplemente querés contactarnos, escribinos.
                </p>
                <p className="text-slate-600 text-[13px] leading-relaxed mb-5">
                  Cada mensaje que recibimos nos ayuda a crecer, <strong className="text-slate-700">sin importar si es algo pequeño o algo grande.</strong>
                </p>
                <p className="text-[12px] text-[#2d5a7b] font-semibold">
                  Te respondemos a la brevedad.
                </p>
              </div>

            </div>

            {/* Panel derecho — formulario */}
            <div className="bg-white px-8 py-10">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full py-10 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-lg">¡Mensaje enviado!</p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="contact-subject" label="Asunto">
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          placeholder="Ej: Sugerencia, error, consulta..."
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#1a3a52] focus:ring-2 focus:ring-[#1a3a52]/10 hover:border-slate-300 transition-all duration-200"
                        />
                      </Field>
                      <Field id="contact-email" label="Email">
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          placeholder="Tu email de contacto"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#1a3a52] focus:ring-2 focus:ring-[#1a3a52]/10 hover:border-slate-300 transition-all duration-200"
                        />
                      </Field>
                    </div>

                    <Field id="contact-message" label="Mensaje">
                      <div className="flex flex-col gap-1">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden hover:border-slate-300 focus-within:bg-white focus-within:border-[#1a3a52] focus-within:ring-2 focus-within:ring-[#1a3a52]/10 transition-all duration-200">
                          <textarea
                            id="contact-message"
                            name="message"
                            rows={5}
                            placeholder="Escribí acá, cuanto más detalle, mejor"
                            required
                            maxLength={MAX_MESSAGE}
                            onChange={(e) => setMessageLength(e.target.value.length)}
                            className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none"
                          />
                        </div>
                        <span className="text-xs text-right text-slate-300">
                          {messageLength}/{MAX_MESSAGE}
                        </span>
                      </div>
                    </Field>

                    {status === "error" && (
                      <div className="flex items-center gap-2.5 text-red-800 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="flex-1">{errorMsg}</span>
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          className="shrink-0 text-red-800 cursor-pointer"
                          aria-label="Cerrar error"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-[0_6px_24px_rgba(26,58,82,0.35)] hover:shadow-[0_10px_32px_rgba(26,58,82,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "loading" ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar mensaje
                          <ArrowRight className="w-4 h-4 translate-y-px" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
