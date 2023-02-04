import formidable from "formidable";
import cloudinary from "../../utils/cloudinary";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log({ fields })
        await saveFile(files.file, fields.name, fields.file_name);
        return res.status(201).send("");
    });
};

const saveFile = async (file, name, file_name) => {
    await cloudinary.v2.uploader
        .upload(file.filepath, {
            public_id: `input/${name}/${file_name}`,
            resource_type: "image"
        })

};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? console.log("GET")
                    : res.status(404).send("");
};
