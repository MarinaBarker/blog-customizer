import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { OnClick } from '../arrow-button/ArrowButton';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useCloseOutside } from './hooks/useCloseOutside';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState(props: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(formState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(formState.fontColor);
	const [bgColor, setBgColor] = useState(formState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(formState.contentWidth);
	const [fontSize, setFontSize] = useState(formState.fontSizeOption);

	const toggleForm: OnClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const formRef = useRef<HTMLDivElement>(null);
	useCloseOutside({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		formRef,
	});

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setFormState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	};

	return (
		<>
			<div ref={formRef} />
			<ArrowButton toggleOpen={toggleForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='Размер шрифта'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
						name='FontSize'></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={bgColor}
						options={backgroundColors}
						onChange={setBgColor}
					/>
					<Select
						title='Ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
