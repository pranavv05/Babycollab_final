
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Copy, Check, Type, Send, LogIn } from "lucide-react";
import { toast } from "sonner";

function useClipboard(timeout = 1200) {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (_) {}
  };
  return { copied, copy };
}

function chunkTextForTweets(text: string, maxLen = 280): string[] {
  const norm = text.replace(/\r\n/g, "\n");
  if (!norm.trim()) return [];

  const hardBreaks = norm.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  if (hardBreaks.length > 1) {
    return hardBreaks.flatMap((block) => chunkByWords(block, maxLen));
  }
  return chunkByWords(norm, maxLen);
}

function chunkByWords(text: string, maxLen: number): string[] {
  const words = text.split(/(\s+)/); // keep spaces
  const out: string[] = [];
  let buf = "";
  for (const w of words) {
    if ((buf + w).length <= maxLen) {
      buf += w;
    } else {
      if (buf.trim()) out.push(buf.trim());
      if (w.trim().length > maxLen) {
        // extremely long word: force split
        for (let i = 0; i < w.length; i += maxLen) {
          out.push(w.slice(i, i + maxLen));
        }
        buf = "";
      } else {
        buf = w;
      }
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-[60px] p-4 md:p-6 shadow-lg border border-white/20 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 bg-white/20 rounded-2xl">{icon}</div>
      <div>
        <h3 className="text-white font-pixelify-sans font-bold text-lg md:text-xl drop-shadow-lg">{title}</h3>
        {subtitle ? (
          <p className="text-dashboard-text-light text-xs md:text-sm">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function SocialMediaConnector() {
  const [text, setText] = useState("");
  const [makeThreads, setMakeThreads] = useState(true);
  const [maxLen, setMaxLen] = useState(280);
  const tweets = useMemo(() => (makeThreads ? chunkTextForTweets(text, maxLen) : [text].filter(Boolean)), [text, makeThreads, maxLen]);
  const charCount = text.length;

  const notifyConnect = (where: string) =>
    toast("Posting unavailable", {
      description:
        `To post to ${where}, connect an integration (e.g., Zapier MCP) from the MCP popover, or copy and paste manually.`,
    });

  const postBoth = () => {
    if (!text.trim()) return;
    notifyConnect("LinkedIn and X");
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-4 md:p-6 lg:p-8 rounded-[60px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6 pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-dashboard-pink font-pixelify-sans font-bold text-2xl md:text-4xl drop-shadow-lg">Social Media Connector</h1>
            <p className="text-dashboard-text-light font-pixelify-sans text-sm md:text-base mt-1">Compose once, preview everywhere.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <Type className="w-5 h-5" />
            <span className="text-sm">{charCount.toLocaleString()} chars</span>
          </div>
        </div>

        <Card>
          <SectionHeader
            icon={<Type className="w-6 h-6 text-dashboard-yellow" />}
            title="Main Composer"
            subtitle="Type your post here. Previews update live below."
          />
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your content... Use blank lines to hint thread breaks."
              className="w-full h-[260px] md:h-[320px] resize-y bg-white/10 focus:bg-white/15 transition-colors text-white placeholder-white/60 rounded-3xl p-4 md:p-6 outline-none border border-white/20 text-base md:text-lg leading-relaxed shadow-inner"
            />
            <div className="absolute bottom-3 right-4 text-white/60 text-xs md:text-sm">{charCount} characters</div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LinkedInPreview text={text} onPost={() => notifyConnect("LinkedIn")} />
          <TwitterPreview text={text} makeThreads={makeThreads} setMakeThreads={setMakeThreads} maxLen={maxLen} setMaxLen={setMaxLen} tweets={tweets} onPost={() => notifyConnect("X (Twitter)")} />
        </div>

        <div className="fixed left-4 right-4 bottom-4 z-40">
          <div className="relative border border-white/20 rounded-3xl shadow-2xl backdrop-blur-lg p-2 overflow-hidden">
            <div className="absolute inset-0 flex pointer-events-none">
              <div className="w-1/2 bg-dashboard-yellow/90" />
              <div className="w-1/2 bg-dashboard-purple/90" />
            </div>
            <div className="relative flex items-center justify-center">
              <button
                onClick={postBoth}
                disabled={!text.trim()}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-pixelify-sans text-base md:text-lg transition-all ${
                  text.trim()
                    ? "bg-white text-dashboard-purple hover:bg-white/90"
                    : "bg-white/40 text-dashboard-purple/60 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
                Post to both
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkedInPreview({ text, onPost }: { text: string; onPost?: () => void }) {
  const { copied, copy } = useClipboard();
  const canPost = !!text.trim();
  return (
    <Card className="bg-gradient-to-br from-dashboard-blue/30 to-dashboard-blue/10 border-dashboard-blue/30">
      <SectionHeader
        icon={<Linkedin className="w-6 h-6 text-white" />}
        title="LinkedIn"
        subtitle="Live preview"
      />
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <div className="bg-white/10 rounded-3xl p-4 md:p-5 text-white min-h-[140px] leading-relaxed whitespace-pre-wrap">
          {text || "Start typing above to see your LinkedIn post preview."}
        </div>
        <div className="flex items-center justify-between text-white/80 text-xs md:text-sm">
          <span>{text.length.toLocaleString()} / 3,000</span>
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onPost}
              disabled={false}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-dashboard-blue/70 text-white transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Log in</span>
            </button>
            <button
              onClick={onPost}
              disabled={!canPost}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                canPost ? "bg-dashboard-yellow text-dashboard-purple hover:bg-dashboard-yellow/90" : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Post to LinkedIn</span>
            </button>
            <button onClick={() => copy(text)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}

function TwitterPreview({
  text,
  makeThreads,
  setMakeThreads,
  maxLen,
  setMaxLen,
  tweets,
  onPost,
}: {
  text: string;
  makeThreads: boolean;
  setMakeThreads: (v: boolean) => void;
  maxLen: number;
  setMaxLen: (v: number) => void;
  tweets: string[];
  onPost?: () => void;
}) {
  const { copied, copy } = useClipboard();
  const allText = tweets.join("\n\n");
  const canPost = !!text.trim();
  return (
    <Card className="bg-gradient-to-br from-dashboard-purple/30 to-dashboard-purple/10 border-dashboard-purple/30">
      <SectionHeader
        icon={<Twitter className="w-6 h-6 text-white" />}
        title="Twitter / X"
        subtitle={makeThreads ? "Thread preview" : "Single post preview"}
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-white/90 text-sm">
          <input
            type="checkbox"
            checked={makeThreads}
            onChange={(e) => setMakeThreads(e.target.checked)}
            className="accent-dashboard-yellow w-4 h-4"
          />
          Make threads
        </label>
        <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
          <span>Max chars</span>
          <input
            type="number"
            min={120}
            max={500}
            value={maxLen}
            onChange={(e) => setMaxLen(Math.max(120, Math.min(500, Number(e.target.value) || 280)))}
            className="w-20 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white outline-none"
          />
        </div>
        <div className="ml-auto text-white/80 text-xs md:text-sm">{makeThreads ? `${tweets.length} tweet${tweets.length === 1 ? "" : "s"}` : `${text.length}/280`}</div>
      </div>

      {!makeThreads ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="bg-white/10 rounded-3xl p-4 md:p-5 text-white min-h-[140px] leading-relaxed whitespace-pre-wrap">
            {text || "Start typing above to see your tweet preview."}
          </div>
          <div className="flex items-center justify-between text-white/80 text-xs md:text-sm">
            <span>{text.length} / 280</span>
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={onPost}
                disabled={false}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-dashboard-purple/70 text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </button>
              <button
                onClick={onPost}
                disabled={!canPost}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                  canPost ? "bg-dashboard-yellow text-dashboard-purple hover:bg-dashboard-yellow/90" : "bg-white/10 text-white/50 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Post to X</span>
              </button>
              <button onClick={() => copy(text)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tweets.map((t, i) => (
              <div key={i} className="bg-white/10 rounded-3xl p-4 md:p-5 text-white leading-relaxed whitespace-pre-wrap">
                <div className="flex items-center justify-between mb-2 text-white/70 text-xs">
                  <span>Tweet {i + 1}/{tweets.length}</span>
                  <span>{t.length}/#{maxLen}</span>
                </div>
                {t}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-white/80 text-xs md:text-sm">
            <span>Total characters {allText.length.toLocaleString()}</span>
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={onPost}
                disabled={false}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-dashboard-purple/70 text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </button>
              <button
                onClick={onPost}
                disabled={!canPost}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                  canPost ? "bg-dashboard-yellow text-dashboard-purple hover:bg-dashboard-yellow/90" : "bg-white/10 text-white/50 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Post to X</span>
              </button>
              <button onClick={() => copy(allText)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy all"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
