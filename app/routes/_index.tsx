import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, json, useLoaderData } from "@remix-run/react";
import i18next from "~/.server/i18next";
import { useTranslation } from "~/i18n";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{
			name: "description",
			content: "Welcome to Remix on Cloudflare!",
		},
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const t = await i18next.getFixedT(request, "common");
	const greeting = t("greeting");
	return json({ greeting });
}

export default function Index() {
	const { t } = useTranslation("common");
	const { greeting } = useLoaderData<typeof loader>();

	return (
		<Form className="flex flex-col gap-2 p-4 font-sans">
			<h1 className="text-3xl">{t("welcome")}</h1>
			<div className="flex gap-2">
				<button
					className="bg-black px-4 py-1 text-white hover:opacity-80"
					name="lng"
					value="en"
					type="submit"
				>
					English
				</button>
				<button
					className="bg-black px-4 py-1 text-white hover:opacity-80"
					name="lng"
					value="ja"
					type="submit"
				>
					日本語
				</button>
			</div>
			<p>{greeting}</p>
		</Form>
	);
}
