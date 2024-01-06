const fs = require('fs').promises;
const path = require('path');

// Define a route to delete a file
async function deleteImage (req, res, fileName) {
  const filePath = path.resolve(__dirname,'..','uploads',fileName)

  try {
    // Check if the file exists before attempting to delete
    await fs.access(filePath);

    // Use fs.unlink to delete the file
    await fs.unlink(filePath);
    
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File not found
      res.status(404).send('File not found');
    } else {
      // Other error (e.g., permission issues)
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}


module.exports = deleteImage