// src/app/head.tsx
export const metadata = {
    title: "digital-tales",
    description: "A blogging app",
  };
  
  export default function Head() {
    return (
      <>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </>
    );
  }
  