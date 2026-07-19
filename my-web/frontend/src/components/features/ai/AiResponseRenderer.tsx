/**
 * AiResponseRenderer Component
 * Parses and renders structured AI text responses with rich visual formatting.
 * Supports: ### headings, **bold**, `inline code`, - bullet lists, and plain paragraphs.
 * Each section block is wrapped in a styled card for visual separation.
 *
 * Related: src/app/compare/page.tsx, src/components/features/ai/MiniSocChatbox.tsx
 * Pattern: Pure Presentation / Markdown-lite Renderer
 */

'use client';

import React from 'react';

interface AiResponseRendererProps {
  text: string;
  /** compact mode for chat bubbles (smaller font, tighter padding) */
  compact?: boolean;
}

/** Parse **bold** text within a string into <strong> spans */
function parseBold(line: string): React.ReactNode[] {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
    }
    // Parse `inline code`
    const codeParts = part.split(/(`[^`]+`)/g);
    if (codeParts.length > 1) {
      return (
        <React.Fragment key={i}>
          {codeParts.map((cp, j) => {
            if (cp.startsWith('`') && cp.endsWith('`')) {
              return (
                <code key={j} style={{
                  background: 'rgba(255, 59, 48, 0.1)',
                  color: 'var(--color-danger)',
                  borderRadius: '4px',
                  padding: '1px 5px',
                  fontSize: '0.88em',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}>
                  {cp.slice(1, -1)}
                </code>
              );
            }
            return <span key={j}>{cp}</span>;
          })}
        </React.Fragment>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function AiResponseRenderer({ text, compact = false }: AiResponseRendererProps) {
  if (!text) return null;

  const lines = text.split('\n');

  // Group lines into sections separated by ### headings
  type Section = { heading: string | null; bullets: string[]; paragraphs: string[] };
  const sections: Section[] = [];
  let current: Section = { heading: null, bullets: [], paragraphs: [] };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) continue;

    if (line.startsWith('### ') || line.startsWith('#### ')) {
      // Save previous section if it has content
      if (current.heading !== null || current.bullets.length > 0 || current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { heading: line.replace(/^#{3,}\s*/, ''), bullets: [], paragraphs: [] };
    } else if (line.startsWith('- ') || line.startsWith('+ ') || line.startsWith('* ') && !line.startsWith('**')) {
      current.bullets.push(line.slice(2));
    } else if (line.startsWith('👉') || line.startsWith('📸') || line.startsWith('🎮') || line.startsWith('💸') || line.startsWith('🛡') || line.startsWith('🎉') || line.startsWith('📌') || line.startsWith('ℹ️') || line.startsWith('*Lưu ý')) {
      // Treat emoji-leading lines and notes as highlighted callouts
      current.paragraphs.push(`__callout__${line}`);
    } else {
      current.paragraphs.push(line);
    }
  }
  // Push last section
  if (current.heading !== null || current.bullets.length > 0 || current.paragraphs.length > 0) {
    sections.push(current);
  }

  const fs = compact ? '12px' : '13px';
  const pad = compact ? '10px 12px' : '14px 16px';
  const gap = compact ? '8px' : '12px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {sections.map((section, idx) => (
        <div
          key={idx}
          style={{
            borderRadius: compact ? '10px' : '14px',
            border: '1px solid var(--border-color)',
            background: idx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
            overflow: 'hidden',
          }}
        >
          {/* Section Heading */}
          {section.heading && (
            <div style={{
              padding: compact ? '7px 12px' : '10px 16px',
              background: 'linear-gradient(90deg, rgba(255,59,48,0.08) 0%, transparent 100%)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}>
              <span style={{
                fontSize: compact ? '11px' : '13px',
                fontWeight: 800,
                color: 'var(--color-danger)',
                letterSpacing: '-0.01em',
              }}>
                {parseBold(section.heading)}
              </span>
            </div>
          )}

          {/* Bullets */}
          {section.bullets.length > 0 && (
            <ul style={{
              margin: 0,
              padding: compact ? '8px 12px 8px 28px' : '12px 16px 12px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: compact ? '4px' : '6px',
            }}>
              {section.bullets.map((b, bi) => (
                <li key={bi} style={{
                  fontSize: fs,
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  listStyleType: 'disc',
                }}>
                  {parseBold(b)}
                </li>
              ))}
            </ul>
          )}

          {/* Paragraphs & callouts */}
          {section.paragraphs.length > 0 && (
            <div style={{
              padding: section.bullets.length > 0 ? `0 ${compact ? '12px' : '16px'} ${compact ? '8px' : '12px'}` : pad,
              display: 'flex',
              flexDirection: 'column',
              gap: compact ? '6px' : '8px',
            }}>
              {section.paragraphs.map((p, pi) => {
                const isCallout = p.startsWith('__callout__');
                const content = isCallout ? p.slice(11) : p;

                if (isCallout) {
                  return (
                    <div key={pi} style={{
                      background: 'linear-gradient(90deg, rgba(255,159,10,0.1) 0%, rgba(255,159,10,0.04) 100%)',
                      border: '1px solid rgba(255,159,10,0.3)',
                      borderRadius: '8px',
                      padding: compact ? '6px 10px' : '8px 12px',
                      fontSize: fs,
                      lineHeight: 1.6,
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                    }}>
                      {parseBold(content)}
                    </div>
                  );
                }

                return (
                  <p key={pi} style={{
                    margin: 0,
                    fontSize: fs,
                    lineHeight: 1.65,
                    color: 'var(--text-primary)',
                  }}>
                    {parseBold(p)}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
