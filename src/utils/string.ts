export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function firstNameOnly(fullName: string): string {
  if (fullName === null || fullName === undefined) {
    return "";
  } else if (fullName.includes(" ")) {
    return fullName.split(" ")[0];
  } else {
    return fullName;
  }
}
