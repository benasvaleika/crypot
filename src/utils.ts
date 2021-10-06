export const importModule = async (moduleName: string) => {
  const importedModule = await import(moduleName);
  return importedModule;
};
