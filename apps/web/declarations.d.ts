/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.yaml' {
  const content: Record<string, any>;
  export default content;
}
