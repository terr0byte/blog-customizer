import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type refType = {
	font: string;
	fontSize: string;
	fontColor: string;
	bgColor: string;
	width: string;
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleOptions, setStyleOptions] = useState<refType | null>(null);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleOptions
						? styleOptions.font
						: defaultArticleState.fontFamilyOption.value,
					'--font-size': styleOptions
						? styleOptions.fontSize
						: defaultArticleState.fontSizeOption.value,
					'--font-color': styleOptions
						? styleOptions.fontColor
						: defaultArticleState.fontColor.value,
					'--container-width': styleOptions
						? styleOptions.width
						: defaultArticleState.contentWidth.value,
					'--bg-color': styleOptions
						? styleOptions.bgColor
						: defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				styleSetter={setStyleOptions}
				defaultStyles={defaultArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
