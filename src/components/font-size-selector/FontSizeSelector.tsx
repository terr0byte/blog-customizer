import { RadioGroup } from 'src/ui/radio-group';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/constants/articleProps';

type styleType = {
	font: string;
	fontSize: string;
	fontColor: string;
	bgColor: string;
	width: string;
};

export const FontSizeSelector = ({
	fontSizeOptions,
	styleRef,
}: {
	fontSizeOptions: OptionType[];
	styleRef: React.MutableRefObject<styleType>;
}) => {
	const [selectedSize, setSelectedSize] = useState<OptionType>(
		fontSizeOptions[0]
	);

	useEffect(() => {
		styleRef.current.fontSize = selectedSize.value;
	}, [selectedSize]);

	return (
		<RadioGroup
			selected={selectedSize}
			name='size'
			onChange={setSelectedSize}
			options={fontSizeOptions}
			title='Размер шрифта'
		/>
	);
};
