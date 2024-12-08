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
	styleSetter: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}) => {
	//artice styles state
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);
	//artice styles state

	//sidebar
	const [isOpenState, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLElement | null>(null);
	const overlayRef = useRef<HTMLDivElement | null>(null);
	//sidebar

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setStyleState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	function toggleSidebar() {
		if (!isOpenState) {
			document.addEventListener('click', closeSidebar);
		} else {
			document.removeEventListener('click', closeSidebar);
		}
		setOpenState(!isOpenState);
	}

	function closeSidebar(e: MouseEvent) {
		if (e.target === overlayRef.current) {
			document.removeEventListener('click', closeSidebar);
			setOpenState(false);
		}
	}

	function handleSubmit() {
		styleSetter(styleState);
	}

	function handleReset() {
		setStyleState(defaultArticleState);
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
						selected={styleState.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<Select
						selected={styleState.fontColor}
						onChange={handleOnChange('fontColor')}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<RadioGroup
						selected={styleState.fontSizeOption}
						name='size'
						onChange={handleOnChange('fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Separator />
					<Select
						selected={styleState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={styleState.contentWidth}
						onChange={handleOnChange('contentWidth')}
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
			<div className={styles.overlay} ref={overlayRef}></div>
		</>
	);
};
