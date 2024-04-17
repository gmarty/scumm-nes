import pkg from '../../package.json' with { type: 'json' };

const navigation = [
  {
    name: 'Open an issue',
    href: pkg.bugs.url,
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <path d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/gmarty/scumm-nes',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"></path>
        <path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"></path>
      </svg>
    ),
  },
  {
    name: 'Mastodon',
    href: 'https://mastodon.social/@edo999',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <path d="M7.99993 17C15.5 18 20.9999 17 20.9999 13L21 9C21.0003 3.5 17.0003 2.5 15 2.5H9C5.99989 2.5 2.93261 3.5 3.13687 9C3.21079 10.987 3.17311 13.3851 3.5 16C4.50007 24 14 21.5 15.5 21V19.5C15.5 19.5 7.5 21 7.99993 17Z"></path>
        <path d="M7 13.5C7 13.5 7 10.7574 7 9C7 5.99998 12 6 12 9C12 10.1716 12 12 12 12"></path>
        <path d="M17 13.5C17 13.5 17 10.7574 17 9C17 5.99998 12 6 12 9C12 10.1716 12 12 12 12"></path>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:flex sm:items-center sm:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 sm:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="fill-transparent stroke-slate-400 transition-all hover:stroke-slate-500"
              rel="me">
              <span className="sr-only">{item.name}</span>
              <item.icon
                className="size-6"
                strokeWidth="2"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <div className="mt-8 sm:order-1 sm:mt-0">
          <p className="text-center text-xs leading-5 text-slate-500">
            &copy; 2024 SCUMM NES resource explorer
          </p>
        </div>
      </div>
    </footer>
  );
}
