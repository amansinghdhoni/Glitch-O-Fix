import placeholderData from "./placeholder-images.json";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

type PlaceholderJson = {
  placeholderImages: ImagePlaceholder[];
};

const typedData = placeholderData as PlaceholderJson;

export const placeholderImages: ImagePlaceholder[] =
  typedData.placeholderImages;