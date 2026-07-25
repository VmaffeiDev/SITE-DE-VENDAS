"use client";

import { useEffect, useRef, useState } from "react";

export function ConsignarSubmitButton() {
  const [pending, setPending] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = buttonRef.current?.closest("form");
    if (!form) return;

    function onSubmit() {
      setPending(true);
    }

    // Reset if any field fails HTML5 validation (form won't actually submit)
    function onInvalid() {
      setPending(false);
    }

    form.addEventListener("submit", onSubmit);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="submit"
      disabled={pending}
      className="mt-8 w-full rounded bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Enviando…" : "Enviar para avaliação"}
    </button>
  );
}
