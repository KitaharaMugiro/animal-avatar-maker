import formidable from "formidable";
import cloudinary from "../../../utils/cloudinary";

export const config = {
    api: {
        bodyParser: false
    }
};

const deleteFiles = async (folder: string) => {
    await cloudinary.v2.api.delete_folder(folder)
};

export default async (req, res) => {
    // input/{user_id}のフォルダを削除する
    const { user_id } = req.query;
    await deleteFiles(`input/${user_id}`);
    return res.status(201).send("");
};
