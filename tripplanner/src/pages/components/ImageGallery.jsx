import { useState } from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function ImageGallery({ images, title }) {
  const [index, setIndex] = useState(0); // Default to the first image

  const photos = images.map((url) => ({
    original: url,
    thumbnail: url,  // You can use a smaller image URL for the thumbnail if available
    description: title,
  }));

  return (
    <div className="w-full">
      <Gallery
        items={photos}
        onClick={(index) => setIndex(index)}
        showThumbnails={true}
        showFullscreenButton={true}
        showPlayButton={false}
        startIndex={index}  // Display the default image based on the initial index
      />
    </div>
  );
}
