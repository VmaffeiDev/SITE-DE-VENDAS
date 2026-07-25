"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";

import { UPLOAD_FIELDS } from "@/lib/upload-fields";

type Preview = { name: string; url: string };
type Previews = Record<string, Preview[]>;

export function ConsignarPhotoUpload() {
  const [previews, setPreviews] = useState<Previews>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleChange(fieldName: string, files: FileList | null) {
    if (!files) return;
    const urls: Preview[] = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setPreviews((prev) => ({ ...prev, [fieldName]: urls }));
  }

  function clearField(fieldName: string) {
    const input = inputRefs.current[fieldName];
    if (input) input.value = "";
    previews[fieldName]?.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews((prev) => {
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {UPLOAD_FIELDS.map((field) => {
        const fieldPreviews = previews[field.name] ?? [];
        return (
          <div key={field.name} className="grid gap-2">
            <label className="grid gap-2 rounded border border-dashed border-gray-300 bg-mist p-4 text-sm font-bold text-ink">
              <span className="flex items-center justify-between">
                {field.label}
                {fieldPreviews.length > 0 && (
                  <button
                    type="button"
                    onClick={() => clearField(field.name)}
                    className="flex items-center gap-1 text-xs font-bold text-graphite hover:text-ink"
                  >
                    <X size={14} />
                    Limpar
                  </button>
                )}
              </span>
              <input
                ref={(el) => { inputRefs.current[field.name] = el; }}
                name={field.name}
                type="file"
                accept="image/*"
                multiple
                className="border-0 bg-transparent p-0 text-sm"
                onChange={(e) => handleChange(field.name, e.target.files)}
              />
            </label>

            {fieldPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {fieldPreviews.map((preview) => (
                  <div
                    key={preview.url}
                    className="relative h-16 w-16 overflow-hidden rounded border border-line bg-mist"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-16 w-16 items-center justify-center rounded border border-dashed border-gray-300 bg-mist text-graphite">
                  <ImagePlus size={20} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
