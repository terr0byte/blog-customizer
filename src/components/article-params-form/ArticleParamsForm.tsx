import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { FontSelector } from '../font-selector/FontSelector';
import { FontSizeSelector } from '../font-size-selector/FontSizeSelector';
import { FontColorSelector } from '../font-color-selector/FontColorSelector';
import { Separator } from 'src/ui/separator';
import { BGColorSelector } from '../bg-color-selector/BGColorSelector';
import { ArticleWidthSelector } from '../article-width-selector/ArticleWidthSelector';

type styleType = {
	font: string;
	fontSize: string;
	fontColor: string;
	bgColor: string;
	width: string;
};

export const ArticleParamsForm = ({
	styleSetter,
	defaultStyles,
}: {
	styleSetter: React.Dispatch<React.SetStateAction<styleType | null>>;
	defaultStyles: ArticleStateType;
}) => {
	const styleRef = useRef<styleType>({
		font: '',
		fontSize: '',
		fontColor: '',
		bgColor: '',
		width: '',
	});

	//sidebar
	const [openState, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLElement | null>(null);
	//sidebar

	function toggleSidebar() {
		setOpenState(!openState);
		if (sideBarRef) sideBarRef.current?.classList.toggle(styles.container_open);
	}

	function handleSubmit() {
		console.log(styleRef.current);
		styleSetter({
			font: styleRef.current.font,
			fontSize: styleRef.current.fontSize,
			fontColor: styleRef.current.fontColor,
			bgColor: styleRef.current.bgColor,
			width: styleRef.current.width,
		});
	}

	function handleReset() {
		styleSetter({
			font: defaultStyles.fontFamilyOption.value,
			fontSize: defaultStyles.fontSizeOption.value,
			fontColor: defaultStyles.fontColor.value,
			bgColor: defaultStyles.backgroundColor.value,
			width: defaultStyles.contentWidth.value,
		});
	}
	return (
		<>
			<ArrowButton
				isOpen={openState}
				onClick={() => {
					toggleSidebar();
				}}
			/>
			<aside ref={sideBarRef} className={styles.container}>
				<form className={styles.form}>
					<h1 className={styles.header}>Задайте параметры</h1>
					<FontSelector
						fontFamilyOptions={fontFamilyOptions}
						styleRef={styleRef}
					/>
					<FontSizeSelector
						fontSizeOptions={fontSizeOptions}
						styleRef={styleRef}
					/>
					<FontColorSelector fontColors={fontColors} styleRef={styleRef} />
					<Separator />
					<BGColorSelector
						backgroundColors={backgroundColors}
						styleRef={styleRef}
					/>
					<ArticleWidthSelector
						contentWidthArr={contentWidthArr}
						styleRef={styleRef}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
