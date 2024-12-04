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

export const FontSelector = ({
	fontFamilyOptions,
	styleRef,
}: {
	fontFamilyOptions: OptionType[];
	styleRef: React.MutableRefObject<styleType>;
}) => {
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		fontFamilyOptions[0]
	);

	useEffect(() => {
		styleRef.current.font = selectedFont.value;
	}, [selectedFont]);

	return (
		<Select
			selected={selectedFont}
			onChange={setSelectedFont}
			options={fontFamilyOptions}
			title='Шрифт'
		/>
	);
};
