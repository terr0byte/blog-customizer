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

export const BGColorSelector = ({
	backgroundColors,
	styleRef,
}: {
	backgroundColors: OptionType[];
	styleRef: React.MutableRefObject<styleType>;
}) => {
	const [selectedBGColor, setSelectedBGColor] = useState<OptionType>(
		backgroundColors[0]
	);

	useEffect(() => {
		styleRef.current.bgColor = selectedBGColor.value;
	}, [selectedBGColor]);

	return (
		<Select
			selected={selectedBGColor}
			onChange={setSelectedBGColor}
			options={backgroundColors}
			title='Цвет фона'
		/>
	);
};
