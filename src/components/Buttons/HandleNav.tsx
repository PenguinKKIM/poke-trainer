import { NavigateFunction } from "react-router-dom";

export const HandleNav = (navigate: NavigateFunction, path: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  navigate(path);
};
