import getEppoClient from './get-eppo-client';

export default async function getStringAssignment(
  flagKey,
  subjectKey,
  subjectAttributes = {},
  defaultValue = ''
) {
  const eppoClient = await getEppoClient();
  return (
    eppoClient?.getStringAssignment(flagKey, subjectKey, subjectAttributes, defaultValue) ?? defaultValue
  );
}
