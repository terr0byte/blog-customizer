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

export const ArticleWidthSelector = ({
	contentWidthArr,
	styleRef,
}: {
	contentWidthArr: OptionType[];
	styleRef: React.MutableRefObject<styleType>;
}) => {
	const [selectedWidth, setSelectedWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	useEffect(() => {
		styleRef.current.width = selectedWidth.value;
	}, [selectedWidth]);

	return (
		<Select
			selected={selectedWidth}
			onChange={setSelectedWidth}
			options={contentWidthArr}
			title='Ширина контента'
		/>
	);
};
