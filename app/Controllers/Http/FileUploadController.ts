'use strict';
import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'
import File from 'App/Models/File'
import Drive from '@ioc:Adonis/Core/Drive'
const fs = require('fs');

class FileUploadController {
 async upload({ request, response, session, }) {
   try {
     const uploads = request.files('files', {
       types: ['image', 'video', 'pdf'], // Adjust the file types as needed
       size: '10mb', // Adjust the maximum file size allowed
       multiple: true, // Allow multiple files
     });
     const time= new Date().getTime();
     // Check if any files were uploaded
     if (!uploads || !uploads.length) {
       session.flash({ error: 'No files uploaded.' });
       return response.redirect('back');
     }

     // Move uploaded files to a specific directory
     const uploadDir = Application.tmpPath('uploads');

     for (let file of uploads) {
       await file.move(uploadDir, {
         name: `${file.clientName}.${time}.${file.extname}`,
         overwrite: true, // Overwrite existing files with the same name
       })

       // Create a new File instance and save it to the database
       const newFile = new File()
       newFile.name = file.clientName
       newFile.path = `${uploadDir}\\${file.clientName}.${time}.${file.extname}`
       await newFile.save()
     }

     session.flash({ success: uploadDir });
     return response.redirect('back');
   } catch (error) {
     session.flash({ error: error.message });
     return response.redirect('back');
   }
 }

 async delete({ params, response  ,session,}) {
  try {
    const fileId = params.id

    // Fetch the file by ID
    const file = await File.find(fileId)
    if (!file) {
      return response.status(404).send('File not found')
    }
    console.log(file.path)

    await Drive.delete(file.path)
    // Logic to delete the file from the file system (optional)
    // e.g., using Node's fs module or any other file management library

    // Delete the file record from the database
    await file.delete()
    session.flash({ success: 'File deleted successfully' });
    return response.status(200).json({ message: 'File deleted successfully' });

  } catch (error) {
    session.flash({ success: 'Error deleting file' });
    return response.status(500).json({ error: 'Error deleting file' });

  }
}

}

module.exports = FileUploadController;
