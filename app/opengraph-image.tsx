import { ImageResponse } from 'next/og';

export const alt = 'Sabarna Saha — AI/ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Branded social share card, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(1000px 600px at 75% 15%, rgba(106,95,193,0.35), transparent 60%), radial-gradient(900px 600px at 10% 90%, rgba(66,32,130,0.45), transparent 60%), #150f23',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              color: '#bdb8c0',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: '#c2ef4e',
                boxShadow: '0 0 24px #c2ef4e',
              }}
            />
            PORTFOLIO
          </div>
          <div style={{ fontSize: 24, color: '#79628c', letterSpacing: 2 }}>
            Kolkata · India
          </div>
        </div>

        {/* name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 30,
              color: '#79628c',
              letterSpacing: 8,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            AI / ML Engineer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
              SABARNA
            </span>
            <span
              style={{
                fontSize: 132,
                fontWeight: 800,
                letterSpacing: -4,
                lineHeight: 1,
                marginLeft: 24,
                padding: '0 24px',
                borderRadius: 12,
                background: '#c2ef4e',
                color: '#150f23',
              }}
            >
              SAHA
            </span>
          </div>
          <div style={{ fontSize: 34, color: '#bdb8c0', marginTop: 28, maxWidth: 900 }}>
            Building RAG systems, deep-learning models & production AI.
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {['RAG', 'TensorFlow', 'NLP', 'LLM'].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  color: '#c2ef4e',
                  border: '1px solid #362d59',
                  borderRadius: 8,
                  padding: '8px 18px',
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: '#79628c' }}>github.com/Sabarna07-tech</div>
        </div>

        {/* accent gradient bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 10,
            background: 'linear-gradient(90deg, #c2ef4e, #6a5fc1, #fa7faa)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
