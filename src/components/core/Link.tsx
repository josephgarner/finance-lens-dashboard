import { Link as RouterLink, LinkProps, useLocation } from "react-router-dom";

export const Link = (props: LinkProps) => {
  const { pathname } = useLocation();
  return (
    <RouterLink {...props} state={{ previousPath: pathname, ...props.state }}>
      {props.children}
    </RouterLink>
  );
};
