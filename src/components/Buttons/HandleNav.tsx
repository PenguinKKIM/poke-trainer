import { NavigateFunction } from "react-router-dom";

export const HandleNav =
  (navigate: NavigateFunction, path: string | number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (typeof path === "string") {
      navigate(path);
    } else if (typeof path === "number") {
      navigate(path);
    }
  };
