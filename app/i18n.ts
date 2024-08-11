import { useTranslation as useI18NextTranslation } from "react-i18next";

export const resources = {
	en: {
		common: {
			welcome: "Welcome",
			greeting: "Hello",
		},
		contact: {
			firstName: "First Name",
		},
	},
	ja: {
		common: {
			welcome: "ようこそ",
			greeting: "こんにちは",
		},
		contact: {
			firstName: "名",
		},
	},
};

export default {
	supportedLngs: ["en", "ja"],
	fallbackLng: "en",
	defaultNS: "common",
	resources,
};

type Resources = (typeof resources)["en"];
type NsLocalizationKey<N extends keyof Resources> = keyof Resources[N];

export function useTranslation<N extends keyof Resources>(namespace: N) {
	const { t, ...rest } = useI18NextTranslation(namespace);
	type NamespaceKeys = NsLocalizationKey<N>;
	const typedT = (key: NamespaceKeys) => t(key as string);
	return {
		t: typedT,
		...rest,
	};
}
