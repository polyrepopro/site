import clsx from "clsx";
import { Button } from "~/components/docs/button";
import { remToPx } from "~/lib/rem-to-px";

interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="md:hidden">
      <a
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}

function NavLink({
  href,
  children,
  active = false,
  isAnchorLink = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  isAnchorLink?: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        isAnchorLink ? "pl-7" : "pl-4",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
    >
      <span className="truncate">{children}</span>
    </a>
  );
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  let activePageIndex = group.links.findIndex((link) => link.href === pathname);
  let top = offset + activePageIndex * itemHeight;

  return (
    <div className="absolute left-2 h-6 w-px bg-emerald-500" style={{ top }} />
  );
}

function NavigationGroup({
  group,
  className,
  currentPath,
}: {
  group: NavGroup;
  className?: string;
  currentPath: string;
}) {
  const isActiveGroup = group.links.some((link) => link.href === currentPath);

  return (
    <li className={clsx("relative mt-6", className)}>
      <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
        {group.title}
      </h2>
      <div className="relative mt-3 pl-2">
        <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5" />
        {isActiveGroup && (
          <ActivePageMarker group={group} pathname={currentPath} />
        )}
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <li key={link.href} className="relative">
              <NavLink href={link.href} active={link.href === currentPath}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export const navigation: Array<NavGroup> = [
  {
    title: "Guides",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart" },
    ],
  },
];

export function Navigation({
  currentPath,
  ...props
}: React.ComponentPropsWithoutRef<"nav"> & { currentPath: string }) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="#">API</TopLevelNavItem>
        <TopLevelNavItem href="#">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="#">Support</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? "md:mt-0" : ""}
            currentPath={currentPath}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  );
}
