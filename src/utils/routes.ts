function hasPermission(permissions: any, route: any) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(
      (role: string) =>
        route.meta.permissions.includes(role.toLowerCase()) ||
        role === "administrator"
    );
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes: any, permissions: any) {
  const finallyRoutes = [] as any;

  routes.forEach((route: any) => {
    const item = { ...route };
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions);
      }
      finallyRoutes.push(item);
    }
  });

  return finallyRoutes;
}
