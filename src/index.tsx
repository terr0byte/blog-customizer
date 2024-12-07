import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleOptions, setStyleOptions] = useState<ArticleStateType | null>(
		null
	);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleOptions
						? styleOptions.fontFamilyOption.value
						: defaultArticleState.fontFamilyOption.value,
					'--font-size': styleOptions
						? styleOptions.fontSizeOption.value
						: defaultArticleState.fontSizeOption.value,
					'--font-color': styleOptions
						? styleOptions.fontColor.value
						: defaultArticleState.fontColor.value,
					'--container-width': styleOptions
						? styleOptions.contentWidth.value
						: defaultArticleState.contentWidth.value,
					'--bg-color': styleOptions
						? styleOptions.backgroundColor.value
						: defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm styleSetter={setStyleOptions} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
