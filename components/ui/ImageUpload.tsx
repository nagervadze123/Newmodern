'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import { uploadImage, StorageBucket } from '@/lib/storage'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  bucket: StorageBucket
  label?: string
  accept?: string
}

export default function ImageUpload({
  value,
  onChange,
  bucket,
  label = 'Upload Image',
  accept = 'image/jpeg,image/png,image/webp,image/gif',
}: ImageUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file.')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File must be under 10MB.')
        return
      }

      setError(null)
      setUploading(true)
      try {
        const url = await uploadImage(file, bucket)
        onChange(url)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Upload failed'
        setError(msg)
      } finally {
        setUploading(false)
      }
    },
    [bucket, onChange]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted">
          {label}
        </p>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed transition-all duration-200 cursor-pointer
          ${dragging ? 'border-accent bg-accent/5' : 'border-border hover:border-foreground/40'}
          ${uploading ? 'pointer-events-none opacity-60' : ''}
        `}
        style={{ minHeight: 160 }}
        role="button"
        tabIndex={0}
        aria-label={`${label} — click or drag and drop`}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        {/* Preview */}
        {value && !uploading && (
          <div className="relative w-full" style={{ minHeight: 160 }}>
            <Image
              src={value}
              alt="Uploaded image preview"
              fill
              sizes="600px"
              className="object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-foreground/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <UploadCloud size={20} className="text-surface" />
              <span className="font-sans text-[12px] font-medium tracking-widest uppercase text-surface">
                Replace
              </span>
            </div>
            {/* Clear button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange('') }}
              aria-label="Remove image"
              className="absolute top-2 right-2 w-7 h-7 bg-foreground text-surface flex items-center justify-center hover:bg-accent transition-colors z-10"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Empty / uploading state */}
        {(!value || uploading) && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
            {uploading ? (
              <>
                <Loader2 size={28} className="text-accent animate-spin" />
                <p className="font-sans text-[13px] text-muted">Uploading…</p>
              </>
            ) : (
              <>
                <UploadCloud size={32} strokeWidth={1.5} className="text-muted" />
                <div>
                  <p className="font-sans text-[13px] font-medium text-foreground">
                    Drag & drop or{' '}
                    <span className="text-accent underline">browse</span>
                  </p>
                  <p className="font-sans text-[12px] text-muted mt-1">
                    JPEG, PNG, WebP — max 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="font-sans text-[12px] text-red-600">{error}</p>
      )}

      {/* URL fallback input */}
      <div>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL…"
          className="w-full border border-border bg-background text-foreground font-sans text-[13px] px-3 py-2.5 focus:outline-none focus:border-accent transition-colors placeholder:text-muted"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
