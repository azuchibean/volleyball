import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const images = import.meta.glob('../assets/pics/*.PNG');

function Players() {
  const [imageSrcs, setImageSrcs] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageKeys = Object.keys(images);

      const imagePromises = imageKeys.map(async (key) => {
        const imageModule = await images[key]();
        return imageModule.default;
      });

      const srcs = await Promise.all(imagePromises);
      setImageSrcs(srcs);
    };

    fetchImages();
  }, []);

  return (
    <div>
      {imageSrcs.map((src, index) => (
        <DraggableImage key={index} src={src} index={index} />
      ))}
    </div>
  );
}

function DraggableImage({ src, index }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${index}`, // Ensure unique ID for each draggable
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <img
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      src={src}
      alt={`Image ${index}`}
      style={style}
    />
  );
}

export default Players;
