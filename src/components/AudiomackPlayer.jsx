import { useMemo, useState } from 'react';

const getEmbedUrl = (url) => {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const cleaned = parsed.pathname.replace(/^\/+|\/+$/g, '');

    if (!cleaned) {
      return '';
    }

    if (cleaned.startsWith('embed/')) {
      return parsed.href;
    }

    return `https://audiomack.com/embed/${cleaned}`;
  } catch (error) {
    return '';
  }
};

export default function AudiomackPlayer({ title, artist, audiomackUrl }) {
  const [embedFailed, setEmbedFailed] = useState(false);
  const embedUrl = useMemo(() => getEmbedUrl(audiomackUrl), [audiomackUrl]);

  const openAudiomack = () => {
    if (!audiomackUrl) return;
    window.open(audiomackUrl, '_blank', 'noopener,noreferrer');
  };

  if (!audiomackUrl || !embedUrl || embedFailed) {
    return (
      <div className="audiomack-fallback" aria-live="polite">
        <p>Unable to load the Audiomack player.</p>
        <button type="button" className="secondary-btn audiomack-link" onClick={openAudiomack} aria-label={`Listen to ${title} on Audiomack`}>
          Listen on Audiomack
        </button>
      </div>
    );
  }

  return (
    <div className="audiomack-player" aria-label={`${title} by ${artist} Audiomack player`}>
      <iframe
        className="audiomack-iframe"
        src={embedUrl}
        title={`${title} by ${artist} on Audiomack`}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
        onError={() => setEmbedFailed(true)}
      />
    </div>
  );
}
