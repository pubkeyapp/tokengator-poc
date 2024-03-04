export function getMetadataMap(metadata: [string, string][]): Record<string, string> {
  return metadata.reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})
}
