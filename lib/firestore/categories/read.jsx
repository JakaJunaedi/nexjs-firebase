import { db, storage } from "@/lib/firebase"
import { Timestamp, collection, doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createCategory = async ({data, image}) => {

    if(!image) {
        throw new Error("image required!")
    }

    if(!data?.name) {
        throw new Error("name required!")
    }

    if(!data?.slug) {
        throw new Error("slug required!")
    }

    const newId = doc(collection(db, `ids`)).id;
    const imageRef = ref(storage, `categories/${newId}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await setDoc(doc(db, `categories/${newId}`), {
        ...data,
        id: newId,
        imageUrl: imageUrl,
        timestampCreate: Timestamp.now(),
    })
}