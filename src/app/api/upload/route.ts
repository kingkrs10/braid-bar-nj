import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function getSafeExtension(mimeType: string, filename?: string): string {
  if (mimeType.includes('png')) return '.png';
  if (mimeType.includes('webp')) return '.webp';
  if (mimeType.includes('gif')) return '.gif';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return '.jpg';
  if (filename && path.extname(filename)) return path.extname(filename);
  return '.jpg';
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let buffer: Buffer;
    let extension = '.jpg';
    let originalName = 'upload';
    let dataUrlFallback: string | null = null;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { dataUrl, filename, category } = body;

      if (!dataUrl || typeof dataUrl !== 'string') {
        return NextResponse.json({ error: 'dataUrl is required' }, { status: 400 });
      }

      dataUrlFallback = dataUrl;
      originalName = (filename || category || 'image').replace(/[^a-zA-Z0-9_-]/g, '_');

      // Parse data URI: "data:image/jpeg;base64,..."
      const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        extension = getSafeExtension(mimeType, filename);
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 });
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }

      originalName = (file.name || 'image').replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      extension = getSafeExtension(file.type, file.name);
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
    }

    const uniqueName = `${originalName}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${extension}`;

    // Attempt to write to public/uploads directory
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }

      const filePath = path.join(UPLOADS_DIR, uniqueName);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueName,
        size: buffer.length,
        storageType: 'filesystem',
      });
    } catch (writeErr) {
      console.warn('[Upload API] Filesystem write failed, falling back to data URL:', writeErr);

      // Self-healing fallback: if server filesystem is read-only (e.g. Vercel serverless), return the inline data URL
      const finalUrl = dataUrlFallback || `data:image/${extension.replace('.', '')};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        url: finalUrl,
        filename: uniqueName,
        size: buffer.length,
        storageType: 'inline',
      });
    }
  } catch (error: any) {
    console.error('[Upload API] Error processing upload:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
