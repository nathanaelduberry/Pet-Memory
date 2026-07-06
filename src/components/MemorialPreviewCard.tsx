import { ChangeEvent, useEffect, useState } from 'react';
import { Camera, Heart, PawPrint, Upload } from 'lucide-react';
import { previewStats, respectActions, sampleMemorial } from '../content/memorialContent';

export default function MemorialPreviewCard() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState('No photo selected yet');

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);

    if (!file) {
      return;
    }

    const nextPreview = URL.createObjectURL(file);
    setPhotoPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
      return nextPreview;
    });
    setPhotoName(file.name);
    event.target.value = '';
  };

  return (
    <aside className="memorial-preview memory-card" aria-label="Memorial profile card preview" id={`memorial-${sampleMemorial.slug}`}>
      <div className="photo-frame">
        {photoPreview ? (
          <img src={photoPreview} alt={sampleMemorial.photoAlt} className="pet-photo-preview" />
        ) : (
          <span className="paw-orb"><PawPrint size={42} aria-hidden="true" /></span>
        )}
        <label className="upload-chip">
          <Upload size={15} aria-hidden="true" />
          Add their photo
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </label>
      </div>

      <div className="preview-body">
        <p className="label">A memorial in bloom</p>
        <h2>{sampleMemorial.name}</h2>
        <p className="dates">{sampleMemorial.dates}</p>
        <p className="identity-line">{sampleMemorial.identityLine}</p>
        <p>{sampleMemorial.story}</p>

        <div className="favorite-list" aria-label="Favorite things">
          {sampleMemorial.favoriteThings.map((thing) => <span key={thing}>{thing}</span>)}
        </div>

        <p className="upload-status"><Camera size={15} aria-hidden="true" /> {photoName}</p>

        <div className="respect-actions" aria-label="Quiet acts of love">
          {respectActions.map((action) => (
            <button type="button" key={action}><Heart size={14} aria-hidden="true" />{action}</button>
          ))}
        </div>

        <div className="stat-row">
          {previewStats.map(([value, label]) => (
            <span key={label}>
              <strong>{value}</strong>
              {label}
            </span>
          ))}
        </div>

        <p className="privacy-chip">{sampleMemorial.privacy}</p>
      </div>
    </aside>
  );
}
