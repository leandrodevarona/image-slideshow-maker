import { Basic, Random } from "unsplash-js/dist/methods/photos/types";
import Unsplash from "../utils/unsplash";

export async function getPhotos(query?: string) {
    try {
        let data = null;

        if (query) {
            data = await Unsplash.search.getPhotos({
                query
            })

            return data.response?.results as Basic[];
        }

        data = await Unsplash.photos.getRandom({ count: 12 });

        return data.response as Random[];
    } catch (error) {
        return null;
    }
}

export async function getPhotoById(photoId: string) {
    try {
        const photo = await Unsplash.photos.get({ photoId });

        return photo.response;
    } catch (error) {
        return null;
    }
}