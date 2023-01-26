import { useState } from "react";

export default () => {

    const [images, setImages] = useState(null);

    const uploadToClient = (event) => {
        setImages(event.target.files);
    };

    const uploadToServer = async (event) => {
        const body = new FormData();
        for (const image of images) {
            body.append("images", image);
        }
        body.append("name", "test_name")
        const response = await fetch("/api/cloudinary_upload", {
            method: "POST",
            body
        });
    };
    return <div>
        <div>
            <h4>Select Image</h4>
            <input type="file"
                id="avatar" name="avatar"
                multiple
                accept="image/png, image/jpeg"
                onChange={uploadToClient}
            ></input>
            <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadToServer}
            >
                Send to server
            </button>
        </div>
    </div>
}