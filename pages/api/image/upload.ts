import formidable from "formidable";
import cloudinary from "../../../utils/cloudinary";

export const config = {
    api: {
        bodyParser: false
    }
};

const saveFile = async (file, name, file_name) => {
    await cloudinary.v2.uploader
        .upload(file.filepath, {
            public_id: `input/${name}/${file_name}`,
            resource_type: "image"
        })
};

export default (req, res) => {
    // fields = { name: "test", file_name: "test.png" }
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log({ fields })
        await saveFile(files.file, fields.name, fields.file_name);
        return res.status(201).send("");
    });
};
