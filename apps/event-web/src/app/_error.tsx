export default function ErrorPage({ statusCode }: { statusCode?: number }) {
    return (
      <div>
        <h1>Error {statusCode || 500}</h1>
        <p>Something went wrong.</p>
      </div>
    );
  }
  