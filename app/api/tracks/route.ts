import { readdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic"; // luôn đọc lại thư mục mỗi lần gọi

const MUSIC_DIR = path.join(process.cwd(), "music");
const AUDIO_EXTENSIONS = new Set([
  ".mp3",
  ".m4a",
  ".wav",
  ".ogg",
  ".flac",
  ".aac",
  ".webm",
]);

export async function GET() {
  try {
    const entries = await readdir(MUSIC_DIR, { withFileTypes: true });
    const tracks = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          AUDIO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "vi"));
    return Response.json({ tracks });
  } catch {
    return Response.json({ tracks: [] }, { status: 500 });
  }
}
