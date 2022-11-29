import { forwardRef } from "react";
import { Link as RouterLink, LinkProps, useLocation } from "react-router-dom";

export const Link = forwardRef<any, LinkProps>((props, ref) => {
  const { pathname } = useLocation();
  return (
    <RouterLink
      {...props}
      ref={ref}
      state={{ previousPath: pathname, ...props.state }}
    >
      {props.children}
    </RouterLink>
  );
});
