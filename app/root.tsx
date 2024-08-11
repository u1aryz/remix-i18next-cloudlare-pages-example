import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import i18next from "~/.server/i18next";

export async function loader({ request }: LoaderFunctionArgs) {
	const locale = await i18next.getLocale(request);
	return json({ locale });
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { locale } = useLoaderData<typeof loader>();
	const { i18n } = useTranslation();

	useChangeLanguage(locale);

	return (
		<html lang={locale} dir={i18n.dir()}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
