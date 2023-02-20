import { ChangeEventHandler, useState } from "react";
import { CloudinaryImageProps } from "../../utils/types";
import imageCompression from 'browser-image-compression';
import Image from 'next/image'
import ShowLoading from "./status/ShowLoading";
import ReactLoading from "react-loading";

interface Props {
    name: string;
}

export default (props: Props) => {
    const [images, setImages] = useState<FileList>();
    const [ isShowLoading, setIsShowLoading ] = useState(false);
    const [ bottunDisabele, setBottunDisabele ] = useState(false);
    const uploadToClient: ChangeEventHandler<HTMLInputElement> = (event) => {
        //TODO: サイズチェック
        setImages(event.target.files);
    };

    const uploadToServer = async () => {
        if (images && images.length < 10) {
            Swal.fire("10枚以上の画像を選択してください。")
            return;
        }
        if (images && images.length > 20) {
            Swal.fire("20枚以下の画像を選択してください。")
            return;
        }
        if (!images) {
            Swal.fire("画像を選択してください。")
            return;
        }
        
        
        setIsShowLoading(true)
        setBottunDisabele(true)
        let i = 0;
        const promises = []
        for (const image of Array.from(images)) {

            //TODO: もうちょっと圧縮できないかな？？
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(image, options);
            const body = new FormData();
            body.append("file", compressedFile);
            body.append("name", props.name)
            body.append("file_name", String(i))
            const res = fetch("/api/cloudinary_upload", {
                method: "POST",
                body
            });
            promises.push(res)
            i++;
        }

        //TODO: ロード中みたいにしたい。あとダブルクリックできないようにしたい。
        await Promise.all(promises)
        Swal.fire("アップロードが完了しました。");
        setIsShowLoading(false)
        setBottunDisabele(false)
        //リロード
        window.location.reload();

    };
    const Loading = ({}) => {
        if (isShowLoading) {
          return (
            <section className="flex justify-center items-center">
              <div>
                <ReactLoading
                  type="spin"
                  color="#ebc634"
                  height="70px"
                  width="70px"
                  className="mx-auto"
                />
                <p className="text-center mt-3">アップロード中。。。</p>
              </div>
            </section>
          );
        }
      };
    return <div>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
        <div>
            <div>
                <label className="block text-sm font-medium text-gray-700"></label>

                <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <div>
                                <Image className="flex justify-center mx-auto my-4" src="/avatar/input_example.png" alt="画像の例" width={200} height={200} unoptimized />
                            </div>
                            <svg
                                className="text-5xl mx-auto h-12 w-12 text-gray-400"
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


                            <span className="text-4xl font-large">クリックして写真を選ぶ</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only"
                                multiple
                                accept="image/png, image/jpeg"
                                onChange={uploadToClient}
                            />
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                            <div className="opacity-70 text-base text-gray-600">
                                <p className="mt-1 flex justify-center">写真は10枚から20枚程お選びください</p>
                                <p className="mt-1 flex justify-center">必ず一匹で写っている写真でお願いします！</p>
                                <p className="mt-1 flex justify-center">顔がよく写っている写真や服を着ていない写真をお選びいただくと、精度が上がります</p>
                            </div>
                        </div>
                    </div>
                </label>
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
        <Loading />
        <div className="mt-1 flex justify-center bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
                disabled={bottunDisabele}
                type="submit"
                onClick={uploadToServer}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                アップロード
            </button>
        </div>
    </div >
}
