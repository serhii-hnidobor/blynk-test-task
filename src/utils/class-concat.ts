type ClassState = Record<string, boolean>;

function classConcat(arg: ClassState) {
  const activeClasses: string[] = [];

  for (const [className, isActive] of Object.entries(arg)) {
    if (isActive) {
      activeClasses.push(className);
    }
  }

  return activeClasses.join(" ");
}

export default classConcat;
