module.exports = {
  '**/*.+(ts|tsx|js|jsx)': ['eslint --fix'],
  '**/*.+(ts|tsx|js|jsx|css|json)': [files => `prettier --write "${files.join('" "')}"`],
};
