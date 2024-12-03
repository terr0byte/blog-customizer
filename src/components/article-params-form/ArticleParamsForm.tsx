import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useState, useRef } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type refType = {
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
	styleSetter: React.Dispatch<React.SetStateAction<refType | null>>;
	defaultStyles: ArticleStateType;
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
	const [openState, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLElement | null>(null);
	//sidebar

	function toggleSidebar() {
		setOpenState(!openState);
		if (sideBarRef) sideBarRef.current?.classList.toggle(styles.container_open);
	}

	function handleSubmit() {
		styleSetter({
			font: selectedFont.value,
			fontSize: selectedSize.value,
			fontColor: selectedColor.value,
			bgColor: selectedBGColor.value,
			width: selectedWidth.value,
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
		</>
	);
};
