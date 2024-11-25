import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [openState, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLElement | null>(null);
	function toggleSidebar() {
		setOpenState(!openState);
		if (sideBarRef) sideBarRef.current?.classList.toggle(styles.container_open);
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
