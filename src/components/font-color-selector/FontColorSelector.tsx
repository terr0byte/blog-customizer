import { Select } from 'src/ui/select';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/constants/articleProps';

type styleType = {
	font: string;
	fontSize: string;
	fontColor: string;
	bgColor: string;
	width: string;
};

export const FontColorSelector = ({
	fontColors,
	styleRef,
}: {
	fontColors: OptionType[];
	styleRef: React.MutableRefObject<styleType>;
}) => {
	const [selectedColor, setSelectedColor] = useState<OptionType>(fontColors[0]);

	useEffect(() => {
		styleRef.current.fontColor = selectedColor.value;
	}, [selectedColor]);

	return (
		<Select
			selected={selectedColor}
			onChange={setSelectedColor}
			options={fontColors}
			title='Цвет шрифта'
		/>
	);
};
