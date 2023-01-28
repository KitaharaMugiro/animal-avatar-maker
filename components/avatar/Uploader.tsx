import { ChangeEventHandler, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";

interface Props {
    name: string;
}

export default (props: Props) => {

    const [images, setImages] = useState<FileList>();

    const uploadToClient: ChangeEventHandler<HTMLInputElement> = (event) => {
        //TODO: サイズチェック
        setImages(event.target.files);
    };

    const uploadToServer = async () => {
        let i = 0;
        const promises = []
        for (const image of Array.from(images)) {
            const body = new FormData();
            body.append("file", image);
            body.append("name", props.name)
            body.append("file_name", String(i) + ".png")
            const res = fetch("/api/cloudinary_upload", {
                method: "POST",
                body
            });
            promises.push(res)
            i++;
        }
        await Promise.all(promises)
        alert("アップロードが完了しました。")
        //リロード
        window.location.reload();

    };
    return <div>
        <div>
            <div>
                <label className="block text-sm font-medium text-gray-700">10枚程度のあなたのペットの写真をアップロードしてください</label>

                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only"
                                    multiple
                                    accept="image/png, image/jpeg"
                                    onChange={uploadToClient} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>
        </div>

        {images && <div className="mt-2 grid grid-cols-3 gap-y-2 gap-x-4 sm:grid-cols-5">
            {Array.from(images).map((file) => (
                <div key={file.name} className="relative group">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                        <img src={URL.createObjectURL(file)} alt="" className="object-cover" />
                    </div>
                </div>
            ))}
        </div>}



        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
                type="submit"
                onClick={uploadToServer}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                アップロード
            </button>
        </div>
    </div >
}