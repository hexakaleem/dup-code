'use strict';
import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'
import File from 'App/Models/File'

class FileUploadController {
 async upload({ request, response, session, }) {
   try {
     const uploads = request.files('files', {
       types: ['image', 'video', 'pdf'], // Adjust the file types as needed
       size: '10mb', // Adjust the maximum file size allowed
       multiple: true, // Allow multiple files
     });

     // Check if any files were uploaded
     if (!uploads || !uploads.length) {
       session.flash({ error: 'No files uploaded.' });
       return response.redirect('back');
     }

     // Move uploaded files to a specific directory
     const uploadDir = Application.tmpPath('uploads');

     for (let file of uploads) {
       await file.move(uploadDir, {
         name: `${file.clientName}.${new Date().getTime()}.${file.extname}`,
         overwrite: true, // Overwrite existing files with the same name
       })

       // Create a new File instance and save it to the database
       const newFile = new File()
       newFile.name = file.clientName
       newFile.path = `${uploadDir}/${file.clientName}.${new Date().getTime()}.${file.extname}`
       await newFile.save()
     }

     session.flash({ success: uploadDir });
     return response.redirect('back');
   } catch (error) {
     session.flash({ error: error.message });
     return response.redirect('back');
   }
 }
}

module.exports = FileUploadController;
