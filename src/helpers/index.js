export function importAllTextures() {
  const webpackContext = require.context('../tex', true, /\.(png|jpe?g|svg)$/);
  const parts = webpackContext.keys().map(part => part.split('/'));
  const textures = webpackContext.keys().map(webpackContext);

  return parts.reduce((acc, tex, index) => {
    const [, folder, fileNameExt] = tex;
    const [fileName] = fileNameExt.split('.');

    return {
      ...acc,
      [folder]: {
        ...acc[folder],
        [fileName]: textures[index]
      }
    }
  }, {});
}

