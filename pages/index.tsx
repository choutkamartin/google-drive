import { useState, useEffect } from "react";

interface Error {
  message: string;
}

export default function index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFiles(result.files);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {files.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}
