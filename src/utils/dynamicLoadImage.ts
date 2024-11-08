export function loadDynamicImage(imageData?: ImageMetadata) {
  if (!imageData) return null;

  const entryImage = imageData as ImageMetadata & { fsPath: string };
  if (entryImage.fsPath) {
    const imagesBasePath = '/src/';
    const srcIndex = entryImage.fsPath.lastIndexOf(imagesBasePath);
    const imagePath = entryImage.fsPath.substring(srcIndex ?? 0);
    const images = import.meta.glob<{ default: ImageMetadata }>(
      '/src/content/**/*.{jpeg,jpg,png,gif,webp}',
    );
    return images[imagePath]();
  }

  return null;
}
