import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #121520 0%, #07080d 100%)',
          borderRadius: 40,
          border: '4px solid rgba(244, 114, 182, 0.4)',
          position: 'relative',
        }}
      >
        {/* Status dot */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#22c55e',
          }}
        />

        {/* Monogram NQ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 76,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: -4,
          }}
        >
          <span style={{ color: '#f472b6' }}>N</span>
          <span style={{ color: '#ffffff' }}>Q</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
