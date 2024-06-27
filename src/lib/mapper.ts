export const optionMapper = (options: { id: string; name: string }[]) =>
  options.map((option) => ({ label: option.name, value: option.id }));
