export const AddressSummary = (fullAddress: string) => {
  const parts = fullAddress.split(" ");
  return parts.length >= 4 ? `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}` : fullAddress;
};
