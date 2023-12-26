'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const File_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/File"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
class FileUploadController {
    async upload({ request, response, session, }) {
        try {
            const uploads = request.files('files', {
                types: ['image', 'video', 'pdf'],
                size: '10mb',
                multiple: true,
            });
            const time = new Date().getTime();
            if (!uploads || !uploads.length) {
                session.flash({ error: 'No files uploaded.' });
                return response.redirect('back');
            }
            const uploadDir = Application_1.default.tmpPath('uploads');
            for (let file of uploads) {
                await file.move(uploadDir, {
                    name: `${file.clientName}.${time}.${file.extname}`,
                    overwrite: true,
                });
                const newFile = new File_1.default();
                newFile.name = file.clientName;
                newFile.path = `${uploadDir}\\${file.clientName}.${time}.${file.extname}`;
                await newFile.save();
            }
            session.flash({ success: uploadDir });
            return response.redirect('back');
        }
        catch (error) {
            session.flash({ error: error.message });
            return response.redirect('back');
        }
    }
    async delete({ params, response, session, }) {
        try {
            const fileId = params.id;
            const file = await File_1.default.find(fileId);
            if (!file) {
                return response.status(404).send('File not found');
            }
            console.log(file.path);
            await Drive_1.default.delete(file.path);
            await file.delete();
            session.flash({ success: 'File deleted successfully' });
            return response.status(200).json({ message: 'File deleted successfully' });
        }
        catch (error) {
            session.flash({ success: 'Error deleting file' });
            return response.status(500).json({ error: 'Error deleting file' });
        }
    }
}
module.exports = FileUploadController;
//# sourceMappingURL=FileUploadController.js.map