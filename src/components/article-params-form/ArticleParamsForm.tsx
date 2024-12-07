import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	styleSetter,
}: {
	styleSetter: React.Dispatch<React.SetStateAction<ArticleStateType | null>>;
}) => {
	//font selection
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	//font selection

	//font size radio selection
	const [selectedSize, setSelectedSize] = useState(fontSizeOptions[0]);
	//font size radio selection

	//font color selection
	const [selectedColor, setSelectedColor] = useState<OptionType>(fontColors[0]);
	//font color selection

	//bg color selection
	const [selectedBGColor, setSelectedBGColor] = useState<OptionType>(
		backgroundColors[0]
	);
	//bg color selection

	//content width selection
	const [selectedWidth, setSelectedWidth] = useState<OptionType>(
		contentWidthArr[0]
	);
	//content width selection

	//sidebar
	const [isOpenState, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLElement | null>(null);
	//sidebar

	function toggleSidebar() {
		setOpenState(!isOpenState);
	}

	function closeSidebar() {
		setOpenState(false);
	}

	function handleSubmit() {
		styleSetter({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedSize,
			fontColor: selectedColor,
			backgroundColor: selectedBGColor,
			contentWidth: selectedWidth,
		});
	}

	//Вынесено в отдельную функцию, чтобы разгрузить handleReset
	function resetForm() {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedSize(defaultArticleState.fontSizeOption);
		setSelectedColor(defaultArticleState.fontColor);
		setSelectedBGColor(defaultArticleState.backgroundColor);
		setSelectedWidth(defaultArticleState.contentWidth);
	}

	function handleReset() {
		resetForm();
		styleSetter({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpenState}
				onClick={() => {
					toggleSidebar();
				}}
			/>
			<aside
				ref={sideBarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpenState,
				})}>
				<form className={styles.form}>
					<h1 className={styles.header}>Задайте параметры</h1>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<Select
						selected={selectedColor}
						onChange={setSelectedColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<RadioGroup
						selected={selectedSize}
						name='size'
						onChange={setSelectedSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBGColor}
						onChange={setSelectedBGColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedWidth}
						onChange={setSelectedWidth}
						options={contentWidthArr}
						title='Ширина контента'
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
			<div className={styles.overlay} onClick={closeSidebar}></div>
		</>
	);
};
