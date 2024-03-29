import fs from 'fs';
import path from 'path';

/**
 * Recursively retrieve all files with a specific extension within a directory and its subdirectories.
 * @param {string} rootDir - The root directory to start the search from.
 * @param {string} extension - The extension of the files to search for (including the dot, e.g., ".ts").
 * @returns {string[]} - Array of filenames without extensions.
 */
export function getAllFiles(rootDir: string, extension: string): string[] {
  const filesFound: string[] = [];

  // Function to recursively search for files
  function searchFiles(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Recursively search in subdirectories
        searchFiles(filePath);
      } else if (stats.isFile() && path.extname(file) === extension) {
        // Add filename without extension to the list
        const fileName = path.parse(file).name;
        filesFound.push(fileName + extension);
      }
    }
  }

  // Start the search from the root directory
  searchFiles(rootDir);
  return filesFound;
}
