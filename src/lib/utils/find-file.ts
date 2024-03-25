import fs from 'fs';
import path from 'path';

/**
 * Recursively search for a file within a directory and its subdirectories.
 * @param {string} rootDir - The root directory to start the search from.
 * @param {string} filename - The name of the file to search for.
 * @param {string} extension - The extension of the file to search for (including the dot, e.g., ".txt").
 * @returns {string[]} - Array containing the absolute file path and the relative path from rootDir.
 */
export function findFile(rootDir: string, filename: string, extension = '.md', trimOnSRC = false): string[] {
  const foundPath: string[] = [];

  // Function to recursively search for the file
  function searchFiles(directory: string, relativePath: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Recursively search in subdirectories
        searchFiles(filePath, path.join(relativePath, file));
      } else if (stats.isFile() && file === filename + extension) {
        // Found the file
        const formattedPath = trimOnSRC ? `/src${filePath.split('src')[1]}` : filePath;
        foundPath.push(formattedPath, path.join(relativePath, file));
        return;
      }
    }
  }

  // Start the search from the root directory with an empty relative path
  searchFiles(rootDir, '');
  return foundPath;
}
